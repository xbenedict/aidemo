
import React, { useState, useCallback, useEffect } from 'react';
import { 
  SmartInventoryResponse, 
  SmartOrder, 
  GeminiResponse,
  InventoryData,
  SalesEntry
} from '../types';
import { generateContentWithPrompt } from '../services/geminiService';
import { 
  SMART_INVENTORY_PROMPT_TEMPLATE, 
  MOCK_SALES_DATA_CSV, // Retained for initial load
  MOCK_WEATHER_FORECAST_JSON, 
  MOCK_LOCAL_EVENTS_TEXT, 
  MOCK_INVENTORY_LEVELS_JSON 
} from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Card from './common/Card';
import Button from './common/Button';
import ImageWithFallback from './common/ImageWithFallback';

// Helper to parse CSV string
function parseCsv(csvString: string): SalesEntry[] {
  const lines = csvString.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry: Partial<SalesEntry> = {};
    headers.forEach((header, index) => {
      const key = header as keyof SalesEntry;
      if (['date', 'item_sku', 'item_name', 'quantity_sold', 'price'].includes(key)) {
        entry[key] = values[index] ? values[index].trim() : '';
      }
    });
    return entry as SalesEntry;
  }).filter(entry => entry.item_name && entry.date); // Ensure essential fields are present
}

// Helper to convert SalesEntry[] back to CSV string
function salesEntriesToCsv(salesEntries: SalesEntry[]): string {
  if (!salesEntries || salesEntries.length === 0) {
    return "date,item_sku,item_name,quantity_sold,price\n"; // Return headers if empty
  }
  const headers = "date,item_sku,item_name,quantity_sold,price";
  const rows = salesEntries.map(entry => 
    `${entry.date},${entry.item_sku},${entry.item_name},${entry.quantity_sold},${entry.price}`
  );
  return `${headers}\n${rows.join('\n')}`;
}


// Helper to get image URL from Unsplash - MODIFIED to always return Cold Brew image
function getItemImage(itemName: string): string {
  // Always return the Cold Brew image
  const coldBrewKeyword = "coldbrew";
  const baseUnsplashUrl = 'https://source.unsplash.com/300x200/?';
  return `${baseUnsplashUrl}${encodeURIComponent(coldBrewKeyword)}`;
}

// Function to generate mock sales data
const generateMockSalesData = (inventoryItems: InventoryData, numEntries: number = 50): SalesEntry[] => {
  const sales: SalesEntry[] = [];
  const itemNames = Object.keys(inventoryItems);
  if (itemNames.length === 0) return sales;

  // Simple price map (can be expanded)
  const priceMap: { [key: string]: string } = {
    "Cold Brew Concentrate": "4.50",
    "Espresso Beans": "3.00",
    "Milk (Dairy)": "0.50", // Per use, not per gallon
    "Oat Milk": "0.75",   // Per use
    "Croissants": "3.50",
    "Lavender Syrup": "0.50", // Per use
    "Avocado Toast": "7.00", // Assuming this could be an item
    "Generic Coffee": "2.50"
  };

  for (let i = 0; i < numEntries; i++) {
    const randomItemName = itemNames[Math.floor(Math.random() * itemNames.length)];
    const quantitySold = Math.floor(Math.random() * 5) + 1; // 1 to 5 units
    
    // Generate a random date in the last 90 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const dateString = randomDate.toISOString().split('T')[0];

    sales.push({
      date: dateString,
      item_sku: `${randomItemName.substring(0,3).toUpperCase()}${String(i).padStart(3,'0')}`,
      item_name: randomItemName,
      quantity_sold: quantitySold.toString(),
      price: priceMap[randomItemName] || priceMap["Generic Coffee"] || "3.00"
    });
  }
  // Sort by date descending for recent sales view
  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


const SmartInventoryModule: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<SmartInventoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentInventoryLevels, setCurrentInventoryLevels] = useState<InventoryData>({});
  const [salesHistory, setSalesHistory] = useState<SalesEntry[]>([]);

  useEffect(() => {
    // Initialize inventory levels from mock data
    const parsedInventory: InventoryData = JSON.parse(MOCK_INVENTORY_LEVELS_JSON);
    const inventoryWithImages: InventoryData = {};
    for (const key in parsedInventory) {
      inventoryWithImages[key] = {
        ...parsedInventory[key],
        imageUrl: getItemImage(key) // This will now always return the Cold Brew image URL
      };
    }
    setCurrentInventoryLevels(inventoryWithImages);

    // Initialize sales history from mock data
    setSalesHistory(parseCsv(MOCK_SALES_DATA_CSV));
  }, []);

  const handleInventoryChange = (itemName: string, newQuantityStr: string) => {
    const newQuantity = parseInt(newQuantityStr, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setCurrentInventoryLevels(prev => ({
        ...prev,
        [itemName]: {
          ...prev[itemName],
          quantity_on_hand: newQuantity
        }
      }));
    } else if (newQuantityStr === "") { 
        setCurrentInventoryLevels(prev => ({
            ...prev,
            [itemName]: {
              ...prev[itemName],
              quantity_on_hand: 0 
            }
          }));
    }
  };

  const handleGenerateSales = () => {
    const newSales = generateMockSalesData(currentInventoryLevels, 75); // Generate 75 new entries
    setSalesHistory(newSales);
  };

  const fetchInventoryRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setInventoryData(null); 

    const currentInventoryJsonString = JSON.stringify(
      Object.entries(currentInventoryLevels).reduce((acc, [key, value]) => {
        acc[key] = { quantity_on_hand: value.quantity_on_hand, unit: value.unit };
        return acc;
      }, {} as Record<string, {quantity_on_hand: number, unit: string }>)
    );

    // Convert current salesHistory (SalesEntry[]) to CSV string for the prompt
    const salesDataCsvString = salesEntriesToCsv(salesHistory);

    let prompt = SMART_INVENTORY_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{sales_data_csv}}', salesDataCsvString); // Use dynamic sales data
    prompt = prompt.replace('{{weather_forecast_json}}', MOCK_WEATHER_FORECAST_JSON);
    prompt = prompt.replace('{{local_events_text}}', MOCK_LOCAL_EVENTS_TEXT);
    prompt = prompt.replace('{{inventory_levels_json}}', currentInventoryJsonString);
    
    const result: GeminiResponse<SmartInventoryResponse> = await generateContentWithPrompt<SmartInventoryResponse>(prompt);

    if (result.data) {
      setInventoryData(result.data);
    } else {
      setError(result.error || 'Failed to fetch inventory recommendations.');
    }
    setIsLoading(false);
  }, [currentInventoryLevels, salesHistory]); // Added salesHistory to dependencies

  return (
    <div className="space-y-8">
      <Card title="Current Data Overview & Controls">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Manage Inventory Levels</h3>
            {Object.keys(currentInventoryLevels).length === 0 && <p className="text-slate-500">Loading inventory...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(currentInventoryLevels).map(([itemName, itemDetails]) => (
                <Card key={itemName} className="p-0 overflow-hidden flex flex-col !shadow-md hover:!shadow-lg transition-shadow">
                  <ImageWithFallback
                    src={itemDetails.imageUrl || ''}
                    alt={itemName}
                    className="w-full h-36 object-cover" 
                    placeholderClassName="bg-slate-200 flex items-center justify-center text-slate-400 w-full h-36"
                  />
                  <div className="p-3 flex flex-col flex-grow">
                    <p className="font-semibold text-slate-700 text-md mb-2 truncate" title={itemName}>{itemName}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-auto">
                      <Button
                        variant="secondary"
                        onClick={() => handleInventoryChange(itemName, (itemDetails.quantity_on_hand - 1).toString())}
                        disabled={itemDetails.quantity_on_hand <= 0}
                        className="!px-2 !py-1 text-sm leading-tight aspect-square"
                        aria-label={`Decrease quantity of ${itemName}`}
                      >
                        -
                      </Button>
                      <input 
                        type="number"
                        value={itemDetails.quantity_on_hand}
                        onChange={(e) => handleInventoryChange(itemName, e.target.value)}
                        className="w-12 sm:w-16 p-1 border border-slate-300 rounded-md text-sm text-center focus:ring-sky-500 focus:border-sky-500"
                        min="0"
                        aria-label={`Quantity for ${itemName}`}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => handleInventoryChange(itemName, (itemDetails.quantity_on_hand + 1).toString())}
                        className="!px-2 !py-1 text-sm leading-tight aspect-square"
                        aria-label={`Increase quantity of ${itemName}`}
                      >
                        +
                      </Button>
                      <span className="text-xs sm:text-sm text-slate-500 flex-shrink-0 ml-1 truncate">{itemDetails.unit}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Recent Sales Activity</h3>
                <Button onClick={handleGenerateSales} variant="secondary" className="text-xs sm:text-sm">
                    Generate Mock Sales
                </Button>
            </div>
            {salesHistory.length === 0 && <p className="text-slate-500">Loading sales data...</p>}
            <div className="max-h-[450px] sm:max-h-[550px] overflow-y-auto bg-white p-1 rounded-md shadow-sm border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-100 sticky top-0 z-[1]">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-slate-600 tracking-wider">Date</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-600 tracking-wider">Item</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-600 tracking-wider">Qty</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {salesHistory.slice(0, 50).map((sale, index) => ( // Show up to 50 sales entries
                    <tr key={`${sale.date}-${sale.item_sku}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="px-3 py-2 whitespace-nowrap text-slate-800">{sale.date}</td>
                      <td className="px-3 py-2 whitespace-nowrap truncate max-w-xs text-slate-800" title={sale.item_name}>{sale.item_name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-center text-slate-800">{sale.quantity_sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {salesHistory.length > 50 && <p className="text-xs text-slate-500 mt-2 text-center">Showing first 50 of {salesHistory.length} sales entries.</p>}
          </div>
        </div>
      </Card>

      <Card title="Smart Inventory Optimizer">
        <p className="text-slate-600 mb-6">
          After reviewing and adjusting inventory levels and sales data, click the button below. Catalyst AI will analyze this data along with sales history, weather forecasts, and local events to generate prioritized order recommendations.
        </p>
        <Button onClick={fetchInventoryRecommendations} isLoading={isLoading} disabled={isLoading || Object.keys(currentInventoryLevels).length === 0} className="w-full sm:w-auto">
          {isLoading ? 'Analyzing Data...' : 'Generate Inventory Recommendations'}
        </Button>
      </Card>

      {isLoading && <LoadingSpinner text="Fetching AI-powered inventory insights..." />}
      {error && <ErrorDisplay message={error} onRetry={fetchInventoryRecommendations} />}

      {inventoryData && (
        <div className="space-y-6 mt-8">
          <Card className="bg-green-50 border border-green-200">
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Projected Monthly Savings: ${inventoryData.projectedMonthlySavings.toLocaleString()}
            </h3>
            <p className="text-green-600">Based on optimized ordering and waste reduction using the current data settings.</p>
          </Card>

          <Card title="Prioritized Order List (Based on Current Data)">
            {inventoryData.smartOrders.length > 0 ? (
              <ul className="space-y-4">
                {inventoryData.smartOrders.map((order: SmartOrder, index: number) => (
                  <li key={index} className="p-4 bg-slate-50 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h4 className="text-lg font-semibold text-sky-700">{order.product}</h4>
                      <span 
                        className={`mt-1 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full
                          ${order.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        Order: {order.change}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 text-sm">{order.reason}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">No specific critical actions identified for the upcoming week based on the current data.</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SmartInventoryModule;
