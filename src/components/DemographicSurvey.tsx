import { useState } from 'preact/hooks';
import { DemographicData, Party, Gender, Education, AgeGroup, Region, District } from '../types';

interface DemographicSurveyProps {
  parties: Party[];
  resultsId: string;
  onSubmit: (data: DemographicData) => void;
  onBack: () => void;
}

export function DemographicSurvey({ parties, resultsId, onSubmit, onBack }: DemographicSurveyProps) {
  const [formData, setFormData] = useState<Partial<DemographicData>>({
    id: resultsId,
    agreedToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showElectionPreference, setShowElectionPreference] = useState(false);
  
  // Seznam regionů (krajů) v ČR
  const regions: Region[] = [
    'Hlavní město Praha',
    'Středočeský kraj',
    'Jihočeský kraj',
    'Plzeňský kraj',
    'Karlovarský kraj',
    'Ústecký kraj',
    'Liberecký kraj',
    'Královéhradecký kraj',
    'Pardubický kraj',
    'Kraj Vysočina',
    'Jihomoravský kraj',
    'Olomoucký kraj',
    'Moravskoslezský kraj',
    'Zlínský kraj'
  ];
  
  // Validace formuláře
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.age) newErrors.age = 'Vyberte prosím věkovou skupinu';
    if (!formData.gender) newErrors.gender = 'Vyberte prosím pohlaví';
    if (!formData.education) newErrors.education = 'Vyberte prosím dosažené vzdělání';
    if (!formData.region) newErrors.region = 'Vyberte prosím kraj';
    
    if (showElectionPreference) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'Pro účast v soutěži musíte souhlasit se zpracováním údajů';
      }
      
      if (!formData.email) {
        newErrors.email = 'Pro účast v soutěži musíte zadat email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Zadejte prosím platný email';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handler pro změnu hodnot formuláře
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Vyčistit chybu při změně hodnoty
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Pokračování na druhý krok
  const handleContinue = () => {
    if (validateForm()) {
      setShowElectionPreference(true);
    }
  };
  
  const handleBack = () => {
    if (showElectionPreference) {
      setShowElectionPreference(false);
    } else {
      onBack();
    }
  };
  
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!showElectionPreference) {
      handleContinue();
      return;
    }
    
    // Kompletní data pro odeslání
    const completeData: DemographicData = {
      ...formData as DemographicData,
      timestamp: Date.now()
    };
    
    onSubmit(completeData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        {showElectionPreference 
          ? 'Účast v soutěži'
          : 'Demografický průzkum'}
      </h1>
      
      <p className="text-center text-gray-600 mb-8">
        {showElectionPreference
          ? 'Pro účast v soutěži vyplňte svůj e-mail a vyberte svou volební preferenci'
          : 'Pomozte nám lépe pochopit, jak se liší politické preference různých skupin obyvatel'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!showElectionPreference ? (
          <>
            {/* Demografické údaje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Věková skupina</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Vyberte věkovou skupinu</option>
                  <option value="18-24">18-24 let</option>
                  <option value="25-34">25-34 let</option>
                  <option value="35-44">35-44 let</option>
                  <option value="45-54">45-54 let</option>
                  <option value="55-64">55-64 let</option>
                  <option value="65+">65 let a více</option>
                </select>
                {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pohlaví</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Vyberte pohlaví</option>
                  <option value="male">Muž</option>
                  <option value="female">Žena</option>
                  <option value="other">Jiné</option>
                  <option value="prefer_not_to_say">Nechci uvádět</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosažené vzdělání</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Vyberte dosažené vzdělání</option>
                  <option value="elementary">Základní</option>
                  <option value="vocational">Střední odborné bez maturity</option>
                  <option value="high_school">Střední s maturitou</option>
                  <option value="college">Vyšší odborné</option>
                  <option value="university_bachelor">Vysokoškolské - bakalářské</option>
                  <option value="university_master">Vysokoškolské - magisterské</option>
                  <option value="university_doctoral">Vysokoškolské - doktorské</option>
                </select>
                {errors.education && <p className="mt-1 text-sm text-red-500">{errors.education}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kraj</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.region ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Vyberte kraj</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && <p className="mt-1 text-sm text-red-500">{errors.region}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Okres</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Nepovinné"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profese/obor</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Nepovinné"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Údaje pro soutěž */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail pro soutěž</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="vas@email.cz"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volební preference</label>
                <select
                  name="electionPreference"
                  value={formData.electionPreference || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Vyberte stranu (nepovinné)</option>
                  {parties.map(party => (
                    <option key={party.id} value={party.id}>{party.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className={`mt-1 mr-2 ${errors.agreedToTerms ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-gray-700">
                    Souhlasím se zpracováním osobních údajů pro účely soutěže a s tím, že mě může organizátor kontaktovat v případě výhry
                  </span>
                </label>
                {errors.agreedToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreedToTerms}</p>}
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Zpět
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showElectionPreference ? 'Odeslat' : 'Pokračovat'}
          </button>
        </div>
      </form>
    </div>
  );
} 