import { useState } from 'preact/hooks';
import { CalculatorResult, CalculatorConfig, UserAnswer, DemographicData } from '../types';
import { ResultExport } from './ResultExport';
import { DemographicSurvey } from './DemographicSurvey';
import { v4 as uuidv4 } from 'uuid';
import { dataService } from '../utils/DataService';
import domtoimage from 'dom-to-image-more';
import { useRef } from 'preact/hooks';

interface ResultsPageProps {
  results: CalculatorResult[];
  onReset: () => void;
  config: CalculatorConfig;
  userAnswers?: UserAnswer[];
}

export function ResultsPage({ results, onReset, config, userAnswers = [] }: ResultsPageProps) {
  const [showDemographicSurvey, setShowDemographicSurvey] = useState(false);
  const [resultId] = useState(() => uuidv4());
  const exportRef = useRef<HTMLDivElement>(null);
  
  const handleStartDemographicSurvey = async () => {
    // Uložení anonymních výsledků před přechodem na průzkum
    if (userAnswers.length > 0) {
      try {
        await dataService.saveAnonymousResult({
          id: resultId,
          answers: userAnswers,
          results,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Chyba při ukládání anonymních výsledků:', error);
      }
    }
    
    setShowDemographicSurvey(true);
  };
  
  const handleDemographicDataSubmit = async (data: DemographicData) => {
    try {
      await dataService.saveDemographicData(data);
      // Po úspěšném odeslání se vrátíme zpět na výsledky
      setShowDemographicSurvey(false);
      
      // Zobrazit poděkování
      alert('Děkujeme za vyplnění průzkumu!');
    } catch (error) {
      console.error('Chyba při ukládání demografických dat:', error);
      alert('Při ukládání dat došlo k chybě. Zkuste to prosím znovu.');
    }
  };
  
  const handleExportImage = async () => {
    try {
      // Vytvoříme zcela nový kontejner přesně napodobující UI stránky
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '1080px';
      container.style.height = '1350px';
      container.style.backgroundColor = '#ffffff';
      container.style.padding = '40px';
      container.style.boxSizing = 'border-box';
      container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
      
      // Vytvoříme strukturu HTML s přesným stylováním odpovídajícím UI
      let exportHTML = `
        <div style="width: 100%; height: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #f3f4f6;">
            <h1 style="font-size: 38px; font-weight: 700; margin-bottom: 15px; color: #000; text-align: center;">Výsledky</h1>
            <p style="color: #4b5563; font-size: 18px; line-height: 1.4; text-align: center; margin: 0 auto;">
              Na základě vašich odpovědí jsme určili míru shody s jednotlivými politickými stranami.
            </p>
          </div>
          
          <div style="flex-grow: 1;">
      `;
      
      // Přidáme výsledky, každý s přesným stylováním odpovídajícím UI
      const topResults = results.slice(0, 5);
      topResults.forEach((result, index) => {
        const logoSrc = `images/party-logos/${result.partyId}.svg`;
        const defaultLogo = 'images/party-logos/default.svg';
        const progressBarColor = result.color || '#3B82F6';
        
        exportHTML += `
          <div style="margin-bottom: 15px; position: relative; background-color: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="padding: 15px 20px;">
              <div style="display: flex; align-items: flex-start;">
                <div style="width: 75px; min-width: 75px; margin-right: 15px; display: flex; align-items: center; justify-content: center; background-color: #f9fafb; border-radius: 4px;">
                  <img 
                    src="${logoSrc}" 
                    onerror="this.onerror=null; this.src='${defaultLogo}';" 
                    style="max-width: 70px; max-height: 70px; object-fit: contain;"
                  />
                </div>
                <div style="flex-grow: 1; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <div style="flex-grow: 1;">
                    <div style="font-weight: 600; font-size: 24px; color: #111; margin-bottom: 5px;">${index + 1}. ${result.partyName}</div>
                    <div style="font-size: 16px; color: #4b5563; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                      ${result.description || `${result.partyName} je politická strana`}
                    </div>
                  </div>
                  <div style="text-align: right; padding-left: 15px; min-width: 100px;">
                    <div style="font-size: 36px; font-weight: bold; color: #111;">${result.matchPercentage}%</div>
                    <div style="font-size: 16px; color: #6b7280;">shoda</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="height: 10px; width: 100%; background-color: #e5e7eb;">
              <div style="height: 100%; width: ${result.matchPercentage}%; background-color: ${progressBarColor};"></div>
            </div>
          </div>
        `;
      });
      
      // Přidáme copyright footer
      exportHTML += `
          </div>
          <div style="text-align: center; padding-top: 15px; margin-top: 10px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Výsledky volební kalkulačky 2025 | © BORGIS, a.s.</p>
          </div>
        </div>
      `;
      
      container.innerHTML = exportHTML;
      document.body.appendChild(container);
      
      // Zkontrolujeme, že obrázky jsou načtené před exportem
      const images = container.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Použijeme výchozí obrázek při chybě
        });
      });
      
      await Promise.all(imagePromises);
      
      // Vytvoříme obrázek s vysokou kvalitou
      const dataUrl = await domtoimage.toPng(container, {
        quality: 1.0,
        bgcolor: '#ffffff',
        width: 1080,
        height: 1350,
        style: {
          transform: 'scale(1.0)',
          'transform-origin': 'top left'
        }
      });
      
      // Odstraníme dočasný kontejner
      document.body.removeChild(container);
      
      // Stáhneme obrázek
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
  
  // Pokud jsme v demografickém průzkumu, zobrazíme příslušnou komponentu
  if (showDemographicSurvey) {
    return (
      <DemographicSurvey
        parties={config.parties}
        resultsId={resultId}
        onSubmit={handleDemographicDataSubmit}
        onBack={() => setShowDemographicSurvey(false)}
      />
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-[600px] flex flex-col">
      <div ref={exportRef} className="w-full">
        <div className="h-[100px] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center">Výsledky</h1>
          
          <p className="text-gray-600 text-center h-[40px] flex items-center justify-center">
            Na základě vašich odpovědí jsme určili míru shody s jednotlivými politickými stranami.
          </p>
        </div>
        
        {/* Seznam výsledků - používá se pro zobrazení i export */}
        <div className="space-y-4 flex-grow overflow-auto">
          {results.map((result, index) => (
            <div 
              key={result.partyId} 
              className="result-item border rounded-lg p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center justify-between result-content">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
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
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5 progress-bar-bg">
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
      
        <div className="mt-8 flex justify-center space-x-4 result-buttons">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Začít znovu
          </button>
          
          <button
            onClick={handleExportImage}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Exportovat jako obrázek
          </button>
          
          <button
            onClick={handleStartDemographicSurvey}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Demografický průzkum
          </button>
        </div>
      </div>
    </div>
  );
} 