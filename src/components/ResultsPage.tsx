import { CalculatorResult, CalculatorConfig } from '../types';

interface ResultsPageProps {
  results: CalculatorResult[];
  onReset: () => void;
  config: CalculatorConfig;
}

export function ResultsPage({ results, onReset, config }: ResultsPageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-[600px] flex flex-col">
      <div className="h-[100px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center">Výsledky</h1>
        
        <p className="text-gray-600 text-center h-[40px] flex items-center justify-center">
          Na základě vašich odpovědí jsme určili míru shody s jednotlivými politickými stranami.
        </p>
      </div>
      
      <div className="space-y-4 flex-grow overflow-auto">
        {results.map((result, index) => (
          <div 
            key={result.partyId} 
            className="border rounded-lg p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 relative">
                    <img 
                      src={`images/party-logos/${result.partyId}.svg`}
                      alt={`Logo ${result.partyName}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{index + 1}. {result.partyName}</h3>
                  {result.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-2xl font-bold">
                  {result.matchPercentage}%
                </span>
                <div className="text-sm text-gray-500">shoda</div>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${result.matchPercentage}%`,
                  backgroundColor: result.color || '#3B82F6'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Začít znovu
        </button>
      </div>
    </div>
  );
} 