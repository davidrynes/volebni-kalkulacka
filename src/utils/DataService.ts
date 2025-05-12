import { v4 as uuidv4 } from 'uuid';
import { AnonymousResult, DemographicData } from '../types';

class DataService {
  // Prefix pro lokální úložiště
  private readonly STORAGE_PREFIX = 'volkal_';
  
  // Jedinečné ID pro identifikaci uživatele
  private readonly USER_ID_KEY = `${this.STORAGE_PREFIX}user_id`;
  
  // Endpoint pro odesílání dat na server (pokud se používá)
  private readonly API_ENDPOINT = process.env.NODE_ENV === 'production' 
    ? 'https://api.volebnikalkula.cz/api/results'
    : 'http://localhost:3000/api/results';
  
  // Indikace, zda se data mají odesílat na server
  private readonly USE_API = false;
  
  // Získání nebo vytvoření unikátního ID uživatele
  public getUniqueId(): string {
    let userId = localStorage.getItem(this.USER_ID_KEY);
    
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem(this.USER_ID_KEY, userId);
    }
    
    return userId;
  }
  
  // Uložení anonymních výsledků
  public async saveAnonymousResult(result: AnonymousResult): Promise<void> {
    // Lokální ukládání
    const storageKey = `${this.STORAGE_PREFIX}result_${result.id}`;
    localStorage.setItem(storageKey, JSON.stringify(result));
    
    // Odesílání na server, pokud je povoleno
    if (this.USE_API) {
      try {
        const response = await fetch(`${this.API_ENDPOINT}/anonymous`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending anonymous result to server:', error);
        throw error;
      }
    }
  }
  
  // Uložení demografických dat
  public async saveDemographicData(data: DemographicData): Promise<void> {
    // Lokální ukládání
    const storageKey = `${this.STORAGE_PREFIX}demographic_${data.id}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
    
    // Odesílání na server, pokud je povoleno
    if (this.USE_API) {
      try {
        const response = await fetch(`${this.API_ENDPOINT}/demographic`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending demographic data to server:', error);
        throw error;
      }
    }
  }
  
  // Získání anonymních výsledků podle ID
  public getAnonymousResult(id: string): AnonymousResult | null {
    const storageKey = `${this.STORAGE_PREFIX}result_${id}`;
    const data = localStorage.getItem(storageKey);
    
    if (data) {
      try {
        return JSON.parse(data) as AnonymousResult;
      } catch (error) {
        console.error('Error parsing stored result:', error);
        return null;
      }
    }
    
    return null;
  }
  
  // Získání demografických dat podle ID
  public getDemographicData(id: string): DemographicData | null {
    const storageKey = `${this.STORAGE_PREFIX}demographic_${id}`;
    const data = localStorage.getItem(storageKey);
    
    if (data) {
      try {
        return JSON.parse(data) as DemographicData;
      } catch (error) {
        console.error('Error parsing stored demographic data:', error);
        return null;
      }
    }
    
    return null;
  }
}

// Export jedné instance služby jako singleton
export const dataService = new DataService(); 