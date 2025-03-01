import { useState } from 'preact/hooks';
import { CalculatorConfig, UserAnswer, CalculatorResult } from '../types';
import { QuestionCard } from './QuestionCard';
import { ResultsPage } from './ResultsPage';

interface VotingCalculatorProps {
  config: CalculatorConfig;
}

export function VotingCalculator({ config }: VotingCalculatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [results, setResults] = useState<CalculatorResult[] | null>(null);

  const currentQuestion = config.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === config.questions.length - 1;

  const handleAnswer = (value: number, answerId: string) => {
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      value,
      selectedAnswerId: answerId
    };

    const newAnswers = [...userAnswers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = answer;
    } else {
      newAnswers.push(answer);
    }

    setUserAnswers(newAnswers);

    if (isLastQuestion) {
      calculateResults(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateResults = (answers: UserAnswer[]) => {
    // Inicializace počítadel pro každou stranu
    const partyScores: Record<string, { score: number; maxScore: number }> = {};
    
    // Inicializace skóre pro všechny strany
    config.parties.forEach(party => {
      partyScores[party.id] = { score: 0, maxScore: 0 };
    });

    // Procházíme všechny odpovědi uživatele
    answers.forEach(userAnswer => {
      const question = config.questions.find(q => q.id === userAnswer.questionId);
      if (!question) return;

      const selectedAnswer = question.answers.find(a => a.id === userAnswer.selectedAnswerId);
      if (!selectedAnswer) return;

      const weight = question.weight || 1; // Pokud není váha definována, použijeme 1

      // Procházíme všechny strany
      config.parties.forEach(party => {
        const partyScore = partyScores[party.id];
        
        // Zjistíme, zda strana podporuje tuto odpověď
        const isPartySupporting = selectedAnswer.parties?.includes(party.id) || false;
        
        // Pokud strana podporuje tuto odpověď, přidáme plné skóre
        if (isPartySupporting) {
          partyScore.score += weight * 4; // Maximální shoda (4 body)
        } else {
          // Jinak hledáme nejbližší odpověď, kterou strana podporuje
          let closestMatch = 4; // Maximální rozdíl (4 body)
          
          question.answers.forEach(answer => {
            if (answer.parties?.includes(party.id)) {
              const difference = Math.abs(answer.value - selectedAnswer.value);
              closestMatch = Math.min(closestMatch, difference);
            }
          });
          
          // Přidáme skóre na základě nejbližší shody (4 - rozdíl)
          partyScore.score += weight * (4 - closestMatch);
        }
        
        // Maximální možné skóre pro tuto otázku
        partyScore.maxScore += weight * 4;
      });
    });

    // Výpočet procentuální shody pro každou stranu
    const results: CalculatorResult[] = config.parties.map(party => {
      const { score, maxScore } = partyScores[party.id];
      const matchPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

      return {
        partyId: party.id,
        partyName: party.name,
        matchPercentage,
        color: party.color,
        description: party.description
      };
    });

    // Seřazení stran podle shody od nejvyšší po nejnižší
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    setResults(results);
  };

  const resetCalculator = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResults(null);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Zobrazení výsledků
  if (results) {
    return <ResultsPage results={results} onReset={resetCalculator} config={config} />;
  }

  // Zobrazení aktuální otázky
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md min-h-[600px] flex flex-col">
      <div className="h-[100px] flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center">{config.title || 'Volební kalkulačka'}</h1>
        
        {config.description && (
          <p className="text-gray-600 text-center h-[40px] flex items-center justify-center">{config.description}</p>
        )}
      </div>
      
      <div className="mb-4 text-sm text-gray-500 text-center">
        Otázka {currentQuestionIndex + 1} z {config.questions.length}
      </div>
      
      <div className="flex-grow">
        <QuestionCard 
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswer={userAnswers.find(a => a.questionId === currentQuestion.id)?.selectedAnswerId}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded ${
            currentQuestionIndex === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Zpět
        </button>
        
        <div className="w-full mx-4 bg-gray-200 rounded-full h-2.5 self-center">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / config.questions.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Prázdný element pro zachování layoutu */}
        <div className="w-16"></div>
      </div>
    </div>
  );
} 