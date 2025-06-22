
import React, { useState, useCallback } from 'react';
import { 
  StorePerformanceDiagnoserResponse, 
  PerformanceIssueExample,
  RootCause,
  TurnaroundRecommendation,
  GeminiResponse,
  ModuleType 
} from '../types';
import { generateContentWithPrompt } from '../services/geminiService';
import { 
  STORE_PERFORMANCE_DIAGNOSER_PROMPT_TEMPLATE,
  MOCK_STORE_DATA,
  MOCK_PERFORMANCE_ISSUE_EXAMPLES
} from '../constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import Card from './common/Card';
import Button from './common/Button';

const StorePerformanceDiagnoserModule: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<StorePerformanceDiagnoserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string>(MOCK_PERFORMANCE_ISSUE_EXAMPLES[0]?.id || '');

  const fetchDiagnosis = useCallback(async (issueId: string) => {
    const selectedIssue = MOCK_PERFORMANCE_ISSUE_EXAMPLES.find(ex => ex.id === issueId);
    if (!selectedIssue) {
      setError("Please select a valid performance issue.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    // @ts-ignore TODO: Fix MOCK_STORE_DATA typing if necessary
    const storeMockData = MOCK_STORE_DATA[selectedIssue.storeInternalId]?.[selectedIssue.concernInternalId];

    if (!storeMockData) {
        setError(`Mock data not found for ${selectedIssue.storeDisplayName} - ${selectedIssue.concernDisplayName}.`);
        setIsLoading(false);
        return;
    }

    let prompt = STORE_PERFORMANCE_DIAGNOSER_PROMPT_TEMPLATE;
    prompt = prompt.replace('{{store_name}}', selectedIssue.storeDisplayName);
    prompt = prompt.replace('{{area_of_concern}}', selectedIssue.concernDisplayName);
    prompt = prompt.replace('{{sales_data_extract_csv}}', storeMockData.sales_data_extract_csv);
    prompt = prompt.replace('{{customer_feedback_summary_text}}', storeMockData.customer_feedback_summary_text);
    prompt = prompt.replace('{{competitor_activity_text}}', storeMockData.competitor_activity_text);
    
    const result: GeminiResponse<StorePerformanceDiagnoserResponse> = await generateContentWithPrompt<StorePerformanceDiagnoserResponse>(prompt);

    if (result.data) {
      setDiagnosis(result.data);
    } else {
      setError(result.error || 'Failed to get performance diagnosis.');
    }
    setIsLoading(false);
  }, []);
  
  const handleDiagnoseClick = () => {
    if (selectedIssueId) {
        fetchDiagnosis(selectedIssueId);
    } else {
        setError("Please select an issue to diagnose.");
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Store Performance Diagnoser">
        <p className="text-slate-600 mb-4">
          Identify underperforming areas, understand root causes, and receive AI-driven recommendations.
        </p>
        <div className="space-y-3 mb-4">
            <label htmlFor="issueSelect" className="block text-sm font-medium text-slate-700">Select Issue to Diagnose:</label>
            <select
                id="issueSelect"
                value={selectedIssueId}
                onChange={(e) => setSelectedIssueId(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-shadow bg-white"
            >
                {MOCK_PERFORMANCE_ISSUE_EXAMPLES.map((issue) => (
                    <option key={issue.id} value={issue.id}>
                        {issue.storeDisplayName} - {issue.concernDisplayName}
                    </option>
                ))}
            </select>
        </div>
        <Button onClick={handleDiagnoseClick} isLoading={isLoading} disabled={isLoading || !selectedIssueId}>
          {isLoading ? 'Diagnosing...' : 'Diagnose Performance Issue'}
        </Button>
      </Card>

      {isLoading && <LoadingSpinner text="Analyzing store data and formulating strategy..." />}
      {error && <ErrorDisplay message={error} onRetry={handleDiagnoseClick} />}

      {diagnosis && (
        <div className="space-y-6">
            <Card title={`Diagnosis for: ${diagnosis.store} - ${diagnosis.concern}`}>
                <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">Identified Root Causes:</h4>
                    {diagnosis.rootCauses.length > 0 ? (
                        <ul className="list-disc space-y-2 pl-5">
                        {diagnosis.rootCauses.map((rc: RootCause, index: number) => (
                            <li key={index} className="text-slate-700">
                                <span className="font-medium">{rc.cause}:</span>
                                {rc.supportingData && <span className="text-sm text-slate-500 italic"> (Evidence: {rc.supportingData})</span>}
                            </li>
                        ))}
                        </ul>
                    ) : <p className="text-slate-500">No specific root causes identified by AI.</p>}
                </div>
            </Card>

            <Card title="AI Recommended Actions" className="bg-sky-50 border-sky-200">
                {diagnosis.recommendations.length > 0 ? (
                    <div className="space-y-4">
                    {diagnosis.recommendations.map((rec: TurnaroundRecommendation, index: number) => (
                        <div key={index} className="p-3 bg-white rounded-md shadow border border-slate-200">
                            <h5 className="font-semibold text-sky-700">{index + 1}. {rec.action}</h5>
                            <p className="text-sm text-slate-600 mt-1"><span className="font-medium">Rationale:</span> {rec.rationale}</p>
                            {rec.expectedImpact && <p className="text-sm text-sky-600 mt-1"><span className="font-medium">Expected Impact:</span> {rec.expectedImpact}</p>}
                        </div>
                    ))}
                    </div>
                ): <p className="text-slate-500">No specific recommendations provided by AI.</p>}
            </Card>
        </div>
      )}
    </div>
  );
};

export default StorePerformanceDiagnoserModule;
