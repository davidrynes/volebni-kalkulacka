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
      // Přímé stažení bez zobrazení náhledu
      const dataUrl = await domtoimage.toPng(exportRef.current, {
        quality: 1.0, // Zvýšená kvalita
        bgcolor: '#ffffff',
        width: exportRef.current.offsetWidth,
        height: exportRef.current.offsetHeight,
        style: {
          margin: 0,
          padding: 0
        }
      });
      
      // Automaticky stáhne obrázek bez mezikroků
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'volebni-kalkulacka-vysledky.png';
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
      <div ref={exportRef} className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Výsledky</h2>
          <p className="text-sm text-gray-600">
            Na základě vašich odpovědí jsme určili míru shody s jednotlivými politickými stranami.
          </p>
        </div>
        
        {results.slice(0, 5).map((result, index) => (
          <div key={result.partyId} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3 w-10 h-10 flex items-center justify-center">
                  <img 
                    src={`images/party-logos/${result.partyId}.svg`}
                    alt={`Logo ${result.partyName}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'images/party-logos/default.svg';
                    }}
                    style={{ minWidth: '36px', minHeight: '36px' }}
                  />
                </div>
                <div>
                  <div className="font-medium">{index + 1}. {result.partyName}</div>
                  <div className="text-xs text-gray-600 line-clamp-1">
                    {result.description || `${result.partyName} je politická strana`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{result.matchPercentage}%</span>
                <div className="text-xs text-gray-500">shoda</div>
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full" 
                style={{ 
                  width: `${result.matchPercentage}%`,
                  backgroundColor: result.color || '#3B82F6'
                }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <p>Výsledky volební kalkulačky 2025 | © BORGIS, a.s.</p>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Exportovat jako obrázek
        </button>
      </div>
    </div>
  );
} 