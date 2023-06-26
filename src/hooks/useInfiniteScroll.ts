import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback: () => void): React.RefObject<HTMLDivElement> => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (
      scrollRef.current &&
      scrollRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollRef;
};

export default useInfiniteScroll;
