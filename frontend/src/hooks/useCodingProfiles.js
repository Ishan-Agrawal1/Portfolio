import { useState, useEffect, useRef } from 'react';

const CACHE_KEY = 'coding_profiles_cache';
const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getSessionCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < CLIENT_CACHE_TTL_MS) {
      return parsed.data;
    }
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore parse errors
  }
  return null;
}

function setSessionCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // quota exceeded — ignore
  }
}

export default function useCodingProfiles() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Try session cache first
    const cached = getSessionCache();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

    fetch(`${apiUrl}/coding-profiles`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
          setSessionCache(json.data);
        } else {
          throw new Error('Invalid response shape');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch coding profiles:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
