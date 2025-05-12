import { useState, useRef, useEffect } from 'preact/hooks';
import '../QuestionCard.css';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  leftColor?: string;
  rightColor?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export function RangeSlider({
  min = 0,
  max = 10,
  value,
  onChange,
  leftColor = '#f44336',
  rightColor = '#2196f3',
  showValue = true,
  disabled = false
}: RangeSliderProps) {
  const [currentValue, setCurrentValue] = useState(value || Math.floor((min + max) / 2));
  const [hasInteracted, setHasInteracted] = useState(value !== undefined);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Synchronizace hodnoty z props
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
      setHasInteracted(true);
    }
  }, [value]);

  // Výpočet pozice palce
  const getThumbPosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  // Handler pro kliknutí na slider
  const handleSliderClick = (e: MouseEvent) => {
    if (disabled) return;
    
    const slider = sliderRef.current;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newValue = Math.round(min + percentage * (max - min));
    
    setCurrentValue(newValue);
    setHasInteracted(true);
    onChange(newValue);
  };

  // Handlery pro tažení palce
  const handleMouseDown = (e: MouseEvent) => {
    if (disabled) return;
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    
    const slider = sliderRef.current;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    const newValue = Math.round(min + percentage * (max - min));
    
    setCurrentValue(newValue);
    setHasInteracted(true);
    onChange(newValue);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Výpočet barvy pozadí pro gradient
  const backgroundStyle = {
    background: `linear-gradient(to right, 
      ${leftColor} 0%, 
      ${leftColor} ${getThumbPosition(currentValue)}%, 
      ${rightColor} ${getThumbPosition(currentValue)}%, 
      ${rightColor} 100%)`
  };

  const thumbClassName = `range-slider-thumb ${hasInteracted ? 'selected' : ''}`;

  return (
    <div className="range-slider-container">
      <div className="range-slider-ticks">
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <div 
            key={i}
            className="range-slider-tick"
            style={{ left: `${(i / (max - min)) * 100}%` }}
          >
            {i + min}
          </div>
        ))}
      </div>
      
      <div 
        ref={sliderRef}
        className="range-slider-track"
        style={backgroundStyle}
        onClick={handleSliderClick}
      >
        {/* Značky na stupnici */}
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-px h-4 bg-gray-400 -mt-1"
            style={{ left: `${(i / (max - min)) * 100}%` }}
          />
        ))}
        
        {/* Palec slideru */}
        <div
          ref={thumbRef}
          className={thumbClassName}
          style={{ left: `${getThumbPosition(currentValue)}%` }}
          onMouseDown={handleMouseDown}
        >
          {showValue && (
            <span className="range-slider-thumb-value">
              {currentValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 