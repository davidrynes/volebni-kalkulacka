import { useRef } from 'preact/hooks';
import html2canvas from 'html2canvas';
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
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,  // Zvýšení kvality exportu
        useCORS: true,  // Povolení cross-origin obrázků
        backgroundColor: '#ffffff',
        logging: false
      });
      
      // Konverze canvas na obrázek
      const image = canvas.toDataURL('image/png');
      
      // Vytvoření odkazu pro stažení
      const downloadLink = document.createElement('a');
      downloadLink.href = image;
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
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">Výsledky volební kalkulačky</p>
        </div>
        
        {results.slice(0, 5).map((result, index) => (
          <div key={result.partyId} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <span className="text-lg font-medium">{index + 1}. {result.partyName}</span>
              </div>
              <div className="font-bold text-lg">{result.matchPercentage}%</div>
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
        
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>vytvořeno pomocí volebnikalkula.cz</p>
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