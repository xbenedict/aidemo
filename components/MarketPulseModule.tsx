
import React, { useState, useCallback } from 'react';
import { MarketPulseResponse, Trend, GeminiResponse } from '../types';
import { generateContentWithPrompt } from '../services/geminiService';
import { 
  MARKET_PULSE_PROMPT_TEMPLATE, 
  MOCK_COMPETITOR_REVIEWS_TEXT,
  MOCK_SOCIAL_MEDIA_TEXT,
  MOCK_FOOD_BLOG_TEXT
} from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Card from './common/Card';
import Button from './common/Button';

const HeatIndicator: React.FC<{ heat: Trend['heat'] }> = ({ heat }) => {
  const heatColors = {
    1: 'bg-yellow-400', // Emerging
    2: 'bg-orange-500', // Trending
    3: 'bg-red-600',    // Trending Hot
  };
  const heatText = {
    1: 'Emerging',
    2: 'Trending',
    3: 'Hot',
  }
  return (
    <div className="flex items-center">
      <span className={`w-3 h-3 rounded-full mr-2 ${heatColors[heat]}`}></span>
      <span className="text-xs font-medium text-slate-600">{heatText[heat]}</span>
    </div>
  );
};

const MarketPulseModule: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketPulseResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMarketData(null);

    let prompt = MARKET_PULSE_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{competitor_reviews_text}}', MOCK_COMPETITOR_REVIEWS_TEXT);
    prompt = prompt.replace('{{social_media_text}}', MOCK_SOCIAL_MEDIA_TEXT);
    prompt = prompt.replace('{{food_blog_text}}', MOCK_FOOD_BLOG_TEXT);
    
    const result: GeminiResponse<MarketPulseResponse> = await generateContentWithPrompt<MarketPulseResponse>(prompt);

    if (result.data) {
      setMarketData(result.data);
    } else {
      setError(result.error || 'Failed to fetch market analysis.');
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <Card title="Market Pulse Analyzer">
        <p className="text-slate-600 mb-6">
          Identify trends and monitor competition. This module synthesizes public data (reviews, social media, blogs) into actionable strategic insights.
        </p>
        <Button onClick={fetchMarketAnalysis} isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Analyzing Market...' : 'Generate Market Insights'}
        </Button>
      </Card>

      {isLoading && <LoadingSpinner text="Scanning the market for strategic opportunities..." />}
      {error && <ErrorDisplay message={error} onRetry={fetchMarketAnalysis} />}

      {marketData && (
        <div className="space-y-6">
          <Card title="Competitor Watch">
            <p className="text-slate-700 italic">"{marketData.competitorWatch}"</p>
          </Card>

          <Card title="Trend Radar">
            {marketData.trendRadar.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketData.trendRadar.map((trend: Trend, index: number) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg shadow">
                    <h4 className="font-semibold text-sky-700">{trend.trend}</h4>
                    <HeatIndicator heat={trend.heat} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No significant market trends identified at this time.</p>
            )}
          </Card>
          
          <Card title="Gemini Strategy Brief" className="bg-sky-50 border border-sky-200">
             <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3 text-sky-600 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <div>
                    <h3 className="text-xl font-semibold text-sky-800 mb-2">Actionable Recommendation</h3>
                    <p className="text-slate-700 leading-relaxed">{marketData.strategyBrief}</p>
                </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarketPulseModule;
