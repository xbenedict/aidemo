
import React, { useState, useCallback } from 'react';
import { 
  EmployeeCoPilotResponse, 
  StaffQueryExample,
  GeminiResponse,
  ModuleType
} from '../types';
import { generateContentWithPrompt } from '../services/geminiService';
import { 
  EMPLOYEE_CO_PILOT_PROMPT_TEMPLATE,
  MOCK_STAFF_SOP_EXCERPT_TEXT,
  MOCK_PRODUCT_GUIDE_EXCERPT_TEXT,
  MOCK_STAFF_QUERY_EXAMPLES
} from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Card from './common/Card';
import Button from './common/Button';

const EmployeeCoPilotModule: React.FC = () => {
  const [aiResponse, setAiResponse] = useState<EmployeeCoPilotResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState<string>('');

  const fetchAiAssistance = useCallback(async (currentQuery: string) => {
    if (!currentQuery.trim()) {
      setError("Please enter a question.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    let prompt = EMPLOYEE_CO_PILOT_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{sop_excerpt}}', MOCK_STAFF_SOP_EXCERPT_TEXT);
    prompt = prompt.replace('{{product_guide_excerpt}}', MOCK_PRODUCT_GUIDE_EXCERPT_TEXT);
    prompt = prompt.replace('{{user_question}}', currentQuery);
    
    const result: GeminiResponse<EmployeeCoPilotResponse> = await generateContentWithPrompt<EmployeeCoPilotResponse>(prompt);

    if (result.data) {
      setAiResponse(result.data);
    } else {
      setError(result.error || 'Failed to get assistance from AI Co-Pilot.');
    }
    setIsLoading(false);
  }, []);

  const handleExampleQueryClick = (query: string) => {
    setUserQuery(query);
    fetchAiAssistance(query);
  };
  
  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAiAssistance(userQuery);
  };

  return (
    <div className="space-y-6">
      <Card title="Employee Co-Pilot">
        <p className="text-slate-600 mb-4">
          Instantly access operational procedures and product knowledge. Ask a question below or try an example.
        </p>
        <form onSubmit={handleSubmitQuery} className="space-y-3">
          <textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="e.g., How do I handle a customer complaint?"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-shadow"
            rows={3}
          />
          <Button type="submit" isLoading={isLoading} disabled={isLoading || !userQuery.trim()}>
            {isLoading ? 'Thinking...' : 'Ask AI Co-Pilot'}
          </Button>
        </form>

        <div className="mt-6">
            <h4 className="text-md font-semibold text-slate-700 mb-2">Or try an example:</h4>
            <div className="flex flex-wrap gap-2">
                {MOCK_STAFF_QUERY_EXAMPLES.map((eg: StaffQueryExample) => (
                    <Button 
                        key={eg.id} 
                        variant="secondary" 
                        onClick={() => handleExampleQueryClick(eg.query)}
                        className="text-xs !font-normal"
                        disabled={isLoading}
                    >
                        {eg.query}
                    </Button>
                ))}
            </div>
        </div>
      </Card>

      {isLoading && <LoadingSpinner text="Consulting the knowledge base..." />}
      {error && <ErrorDisplay message={error} onRetry={() => fetchAiAssistance(userQuery)} />}

      {aiResponse && (
        <Card title={`Response to: "${aiResponse.query}"`}>
          <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
            <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{aiResponse.answer}</p>
            {aiResponse.references && aiResponse.references.length > 0 && (
              <div className="mt-3 pt-3 border-t border-sky-200">
                <p className="text-xs font-semibold text-slate-600">References:</p>
                <ul className="list-disc list-inside ml-1">
                  {aiResponse.references.map((ref, index) => (
                    <li key={index} className="text-xs text-slate-500">{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default EmployeeCoPilotModule;
