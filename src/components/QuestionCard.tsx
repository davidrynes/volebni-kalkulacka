import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number, answerId: string) => void;
  currentAnswer?: string;
}

export function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-6 h-[60px] flex items-center">{question.text}</h2>
      
      <div className="space-y-3 flex-grow">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswer(answer.value, answer.id)}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              currentAnswer === answer.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
} 