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