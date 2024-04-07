import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // activeHttpRequests.current = activeHttpRequests.current.filter(
        //   (reqCtrl) => reqCtrl !== httpAbortCtrl
        // ); // old solution

        if (!response.ok) {
          throw new Error(
            responseData.message ||
              "Something went wrong, please try again later."
          );
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message || "Something went wrong, please try again later."
        );
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const abortControllers = activeHttpRequests.current.slice(); // Copying the ref value to a variable
    return () => {
      // activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort()); // old solution
      abortControllers.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
