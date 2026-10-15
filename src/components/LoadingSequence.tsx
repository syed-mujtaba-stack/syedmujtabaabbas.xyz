import React, { useEffect } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 450);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return null;
};
