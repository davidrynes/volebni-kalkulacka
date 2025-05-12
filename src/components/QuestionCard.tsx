import { Question } from '../types';
import { RangeSlider } from './RangeSlider';
import { useState } from 'preact/hooks';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number, answerId: string) => void;
  currentAnswer?: string;
}

export function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  // Zjistit rozsah hodnot odpovědí (např. 0-5, 0-10)
  const minValue = Math.min(...question.answers.map(a => a.value));
  const maxValue = Math.max(...question.answers.map(a => a.value));
  
  // Výchozí hodnota uprostřed rozsahu, pokud není vybrána odpověď
  const initialValue = currentAnswer 
    ? question.answers.find(a => a.id === currentAnswer)?.value ?? Math.floor((minValue + maxValue) / 2)
    : Math.floor((minValue + maxValue) / 2);
  
  const [selectedValue, setSelectedValue] = useState<number>(initialValue);
  const [hasInteracted, setHasInteracted] = useState(!!currentAnswer);
  
  const handleSliderChange = (value: number) => {
    setSelectedValue(value);
    setHasInteracted(true);
  };
  
  const handleContinue = () => {
    // Najít nejbližší odpověď k vybrané hodnotě
    const closestAnswer = question.answers.reduce((prev, curr) => {
      return Math.abs(curr.value - selectedValue) < Math.abs(prev.value - selectedValue)
        ? curr
        : prev;
    });
    
    onAnswer(selectedValue, closestAnswer.id);
  };
  
  return (
    <div className="question-card">
      <h2 className="question-title">{question.text}</h2>
      
      <RangeSlider
        min={minValue}
        max={maxValue}
        value={selectedValue}
        onChange={handleSliderChange}
        leftColor="#f44336"
        rightColor="#2196f3"
      />
      
      <div className="range-slider-labels">
        <span>Nesouhlasím</span>
        <span>Souhlasím</span>
      </div>
      
      <div className="continue-button-container">
        <button
          onClick={handleContinue}
          className={`continue-button ${hasInteracted ? 'active' : 'disabled'}`}
          disabled={!hasInteracted}
        >
          Pokračovat
        </button>
      </div>
    </div>
  );
} 