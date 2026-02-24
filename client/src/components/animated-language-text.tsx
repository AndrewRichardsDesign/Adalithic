import { useState, useEffect } from 'react';

interface AnimatedLanguageTextProps {
  beforeText?: string;
  afterText?: string;
  languages?: Array<{ name: string; translation: string }>;
  className?: string;
}

export default function AnimatedLanguageText({
  beforeText = "Text and learn a",
  afterText = ".",
  languages = [
    { name: "English", translation: "language" },
    { name: "Spanish", translation: "idioma" },
    { name: "German", translation: "Sprache" },
    { name: "Mandarin", translation: "语" },
    { name: "Hindi", translation: "भाषा" }
  ],
  className = ""
}: AnimatedLanguageTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the animation
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      // Start typing the first word after a brief delay
      const initTimer = setTimeout(() => {
        setDisplayText("");
        setIsDeleting(false);
        setIsPaused(false);
      }, 500);
      return () => clearTimeout(initTimer);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    const currentWord = languages[currentIndex].translation;
    
    const handleTypewriter = () => {
      if (isPaused) {
        // Pause for 2 seconds at full word
        const pauseTimer = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(pauseTimer);
      }

      if (isDeleting) {
        // Delete entire word at once
        setDisplayText("");
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % languages.length);
      } else {
        // Type characters
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Word complete, pause
          setIsPaused(true);
        }
      }
    };

    const speed = isDeleting ? 80 : 120; // Faster deletion, slower typing
    const timer = setTimeout(handleTypewriter, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, displayText, isDeleting, isPaused, languages, isInitialized]);

  return (
    <div className={`text-center ${className}`}>
      <span className="text-[24px] font-bold text-gray-800">
        {beforeText}{" "}
        <span 
          className="inline-block px-2 py-1 text-[#0040DD] rounded-xl relative"
          style={{ 
            minHeight: '1.2em',
            border: '3px solid #0040DD',
            minWidth: 'fit-content'
          }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </span>
        {afterText}
      </span>
    </div>
  );
}