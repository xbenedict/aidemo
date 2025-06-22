
import React, { useState, useCallback } from 'react';
import { CustomerAIResponse, CustomerOpportunity, GeminiResponse } from '../types';
import { generateContentWithPrompt } from '../services/geminiService';
import { CUSTOMER_AI_PROMPT_TEMPLATE, MOCK_CUSTOMER_PROFILES_JSON } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Card from './common/Card';
import Button from './common/Button';

const ChannelIcon: React.FC<{ channel: CustomerOpportunity['channel'] }> = ({ channel }) => {
  let iconPath, color;
  switch (channel) {
    case 'Push Notification':
      iconPath = <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />;
      color = "text-purple-500";
      break;
    case 'Email':
      iconPath = <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />;
      color = "text-blue-500";
      break;
    case 'Staff Alert':
      iconPath = <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />;
      color = "text-amber-500";
      break;
    default:
      iconPath = null;
      color = "text-slate-500";
  }
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 mr-2 ${color}`}>{iconPath}</svg>;
};


const CustomerAIModule: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerAIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomerInsights = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCustomerData(null);

    let prompt = CUSTOMER_AI_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{customer_profiles_json}}', MOCK_CUSTOMER_PROFILES_JSON);
    
    const result: GeminiResponse<CustomerAIResponse> = await generateContentWithPrompt<CustomerAIResponse>(prompt);

    if (result.data) {
      setCustomerData(result.data);
    } else {
      setError(result.error || 'Failed to fetch customer insights.');
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <Card title="Customer AI Engagement">
        <p className="text-slate-600 mb-6">
          Hyper-personalize marketing at scale. This module analyzes customer data to generate tailored messages for different segments.
        </p>
        <Button onClick={fetchCustomerInsights} isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Generating Insights...' : 'Generate Customer Messages'}
        </Button>
      </Card>

      {isLoading && <LoadingSpinner text="Crafting personalized customer engagements..." />}
      {error && <ErrorDisplay message={error} onRetry={fetchCustomerInsights} />}

      {customerData && (
        <Card title="Personalized Marketing Opportunities">
          {customerData.opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerData.opportunities.map((opp: CustomerOpportunity, index: number) => (
                <Card key={index} className="flex flex-col bg-slate-50 hover:shadow-xl transition-shadow">
                  <h4 className="text-xl font-semibold text-sky-700 mb-2">{opp.customerName}</h4>
                  <p className="text-sm text-slate-500 mb-1 italic">{opp.insight}</p>
                  <div className="flex items-center text-sm text-slate-600 font-medium mb-3">
                    <ChannelIcon channel={opp.channel} />
                    {opp.channel}
                  </div>
                  <p className="text-slate-700 bg-white p-3 rounded-md border border-slate-200 flex-grow">"{opp.generatedMessage}"</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No specific customer opportunities identified.</p>
          )}
        </Card>
      )}
    </div>
  );
};

export default CustomerAIModule;
