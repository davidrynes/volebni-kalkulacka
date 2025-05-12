export type Answer = {
  id: string;
  text: string;
  value: number; // hodnota odpovědi, např. od -2 do 2
  parties?: string[]; // ID stran, které tuto odpověď podporují
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
  weight?: number; // volitelná váha otázky pro výpočet shody
};

export type Party = {
  id: string;
  name: string;
  color?: string;
  description?: string; // popis strany, který se může zobrazit ve výsledcích
};

export type UserAnswer = {
  questionId: string;
  value: number;
  selectedAnswerId: string;
};

export type CalculatorConfig = {
  questions: Question[];
  parties: Party[];
  title?: string;
  description?: string;
};

export type CalculatorResult = {
  partyId: string;
  partyName: string;
  matchPercentage: number;
  color?: string;
  description?: string;
};

// Nové typy pro demografický průzkum a ukládání dat
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type Education =
  | 'elementary'
  | 'vocational'
  | 'high_school'
  | 'college'
  | 'university_bachelor'
  | 'university_master'
  | 'university_doctoral';

export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

export type Region = string;

export type District = string;

export type DemographicData = {
  id: string;
  age?: AgeGroup;
  gender?: Gender;
  education?: Education;
  region?: Region;
  district?: string;
  profession?: string;
  electionPreference?: string;
  email?: string;
  agreedToTerms: boolean;
  timestamp: number;
};

export type AnonymousResult = {
  id: string;
  answers: UserAnswer[];
  results: CalculatorResult[];
  timestamp: number;
}; 