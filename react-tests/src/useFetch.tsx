import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>();
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("useFetch", e);
        setError(e);
      });
  }, [url]);

  return { data, isLoading: isLoading, error };
};
