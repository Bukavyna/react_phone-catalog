import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSliderProps {
  itemsCount: number;
  itemsPerView?: number;
  autoDelay?: number;
  restartDelay?: number;
  loop?: boolean;
}

type TimerId = ReturnType<typeof window.setTimeout>;

export const useSlider = ({
  itemsCount,
  itemsPerView = 1,
  autoDelay = 0,
  restartDelay = 10000,
  loop = true,
}: UseSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<TimerId | null>(null);
  const timeoutRef = useRef<TimerId | null>(null);

  const safeItemsCount = Math.max(0, itemsCount);
  const visibleItems = Math.floor(itemsPerView ?? 1);
  const maxIndex = Math.max(0, safeItemsCount - visibleItems);

  const stopAuto = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();

    if (autoDelay > 0 && safeItemsCount > 0) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, autoDelay);
    }
  }, [autoDelay, maxIndex, safeItemsCount, stopAuto]);

  const handleUserAction = useCallback(
    (nextIndex: number) => {
      stopAuto();

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      let validatedIndex = nextIndex;

      if (loop) {
        if (nextIndex < 0) {
          validatedIndex = itemsCount - 1;
        }

        if (nextIndex >= itemsCount) {
          validatedIndex = 0;
        }
      } else {
        validatedIndex = Math.max(0, Math.min(nextIndex, maxIndex));
      }

      setCurrentIndex(validatedIndex);

      if (autoDelay > 0) {
        timeoutRef.current = window.setTimeout(startAuto, restartDelay);
      }
    },
    [autoDelay, itemsCount, loop, maxIndex, restartDelay, startAuto, stopAuto],
  );

  const next = () => handleUserAction(currentIndex + 1);
  const prev = () => handleUserAction(currentIndex - 1);
  const goTo = (index: number) => handleUserAction(index);

  useEffect(() => {
    startAuto();

    return () => {
      stopAuto();
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [startAuto, stopAuto]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    canNext: loop || currentIndex < maxIndex,
    canPrev: loop || currentIndex > 0,
  };
};
