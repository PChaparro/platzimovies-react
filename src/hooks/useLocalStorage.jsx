import { v4 } from 'uuid';
import { useState, useEffect } from 'react';

export const useLocalStorage = (key) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem(key)) || []);

  useEffect(() => {
    // Also update items on local storage
    localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, { ...item, uuid: v4() }]);
  };

  const removeItem = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
  };

  return { items, addItem, removeItem };
};
