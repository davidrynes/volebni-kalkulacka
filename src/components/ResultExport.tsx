import { useRef } from 'preact/hooks';
import domtoimage from 'dom-to-image-more';
import { CalculatorResult } from '../types';

interface ResultExportProps {
  results: CalculatorResult[];
  title?: string;
}

export function ResultExport({ results, title = 'Moje výsledky volební kalkulačky' }: ResultExportProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  
  const handleExport = async () => {
    if (!exportRef.current) return;
    
    try {
      const dataUrl = await domtoimage.toPng(exportRef.current, {
        quality: 0.95,
        bgcolor: '#ffffff',
        width: exportRef.current.offsetWidth,
        height: exportRef.current.offsetHeight,
        style: {
          margin: 0,
          padding: 0
        }
      });
      
      // Vytvoření odkazu pro stažení
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'volebni-kalkulacka-vysledky.png';
      
      // Simulace kliknutí pro stažení
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Chyba při exportu výsledků:', error);
      alert('Nepodařilo se exportovat výsledky. Zkuste to prosím znovu.');
    }
  };
  
  return (
    <div className="mt-8">
      <div ref={exportRef} className="p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Výsledky</h2>
          <p className="text-sm text-gray-600 mb-4">
            Na základě vašich odpovědí jsme určili míru shody s jednotlivými politickými stranami.
          </p>
        </div>
        
        {results.slice(0, 5).map((result, index) => (
          <div key={result.partyId} className="mb-6 last:mb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 relative">
                    <img 
                      src={`images/party-logos/${result.partyId}.svg`}
                      alt={`Logo ${result.partyName}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback na výchozí logo, pokud konkrétní logo neexistuje
                        e.currentTarget.src = 'images/party-logos/default.svg';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-lg font-medium">{index + 1}. {result.partyName}</span>
                  {result.description && (
                    <p className="text-sm text-gray-600">{result.description.substring(0, 50)}...</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{result.matchPercentage}%</span>
                <div className="text-sm text-gray-500">shoda</div>
              </div>
            </div>
            
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${result.matchPercentage}%`,
                  backgroundColor: result.color || '#3B82F6'
                }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Výsledky volební kalkulačky 2025 | © BORGIS, a.s.</p>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Stáhnout jako obrázek
        </button>
      </div>
    </div>
  );
} 