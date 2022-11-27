import { useState } from 'react';

export const useObserver = (callback) => {
  const [observed, setObserved] = useState(null);
  const observer = new IntersectionObserver(callback, { threshold: 1 });

  const observe = (element) => {
    if (observed) {
      // Unobserve the last element
      observer.unobserve(observed);
    }

    // Observe the new element
    observer.observe(element);
    setObserved(element);
  };

  return {
    observe,
  };
};
