import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const TextsContext = createContext({
  texts: {},
  loaded: false,
  setLocalText: () => {},
});

export function TextsProvider({ children }) {
  const [texts, setTexts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/text', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((data) => {
        if (cancelled) return;
        setTexts(data || {});
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocalText = useCallback((key, value) => {
    setTexts((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <TextsContext.Provider value={{ texts, loaded, setLocalText }}>
      {children}
    </TextsContext.Provider>
  );
}

export function useTexts() {
  return useContext(TextsContext);
}
