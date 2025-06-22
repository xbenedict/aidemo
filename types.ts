
export enum ModuleType {
  SMART_INVENTORY = 'Smart Inventory',
  CUSTOMER_AI = 'Customer AI',
  MARKET_PULSE = 'Market Pulse',
  EMPLOYEE_CO_PILOT = 'Employee Co-Pilot',
  STORE_PERFORMANCE_DIAGNOSER = 'Store Performance Diagnoser',
}

// Smart Inventory Types
export interface InventoryItem {
  quantity_on_hand: number;
  unit: string;
  imageUrl?: string; // Added for displaying images
}

export interface InventoryData {
  [itemName: string]: InventoryItem;
}

export interface SalesEntry {
  date: string;
  item_sku: string;
  item_name: string;
  quantity_sold: string; // Keep as string from CSV parsing, convert to num if needed
  price: string;       // Keep as string from CSV parsing, convert to num if needed
}

export interface SmartOrder {
  product: string;
  change: string; // e.g., "+30%" or "-15%"
  reason: string;
}

export interface SmartInventoryResponse {
  projectedMonthlySavings: number;
  smartOrders: SmartOrder[];
}

// Customer AI Types
export interface CustomerOpportunity {
  customerName: string;
  insight: string;
  channel: 'Push Notification' | 'Email' | 'Staff Alert';
  generatedMessage: string;
}

export interface CustomerAIResponse {
  opportunities: CustomerOpportunity[];
}

// Market Pulse Types
export interface Trend {
  trend: string;
  heat: 1 | 2 | 3; // 1 (emerging) to 3 (trending hot)
}

export interface MarketPulseResponse {
  competitorWatch: string;
  trendRadar: Trend[];
  strategyBrief: string;
}

// Employee Co-Pilot Types
export interface StaffQueryExample {
  id: string;
  query: string;
}
export interface EmployeeCoPilotResponse {
  query: string;
  answer: string;
  references?: string[];
}

// Store Performance Diagnoser Types
export interface RootCause {
  cause: string;
  supportingData?: string;
}
export interface TurnaroundRecommendation {
  action: string;
  rationale: string;
  expectedImpact?: string;
}
export interface StorePerformanceDiagnoserResponse {
  store: string;
  concern: string;
  rootCauses: RootCause[];
  recommendations: TurnaroundRecommendation[];
}

export interface PerformanceIssueExample {
  id: string;
  storeDisplayName: string; // e.g. "Flagship Store - 5th Avenue"
  storeInternalId: string; // e.g. "flagship_5th_ave"
  concernDisplayName: string; // e.g. "Declining Pastry Sales"
  concernInternalId: string; // e.g. "pastry_sales_decline"
}


// For API service
export interface GeminiResponse<T> {
  data?: T;
  error?: string;
}
