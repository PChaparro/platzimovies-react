import { useState } from 'react';

export const useObserver = (callback) => {
  const [observed, setObserved] = useState(null);

  const intersectionCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      const { isIntersecting } = entry;

      if (isIntersecting) {
        await callback();
      }
    });
  };

  const observer = new IntersectionObserver(intersectionCallback, { threshold: 1 });

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
