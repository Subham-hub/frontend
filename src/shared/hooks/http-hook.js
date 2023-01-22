import { useCallback, useState } from "react";
import axios from "axios";

export const useHttp = () => {
  const [isLoading, setIsloading] = useState();
  const [error, setError] = useState();

  const sendRequest = useCallback(
    // ob:- other backend
    async (endpoint, method = "GET", data, headers, type) => {
      try {
        setIsloading(true);
        // https://aquatic-sphenoid-steel.glitch.me/
        const response = await axios({
          method,
          url:
            type === "ob"
              ? endpoint
              : `http://localhost:5000/api/v1/${endpoint}`,
          data,
          headers,
        });
        setIsloading(false);
        return response.data;
      } catch (e) {
        setIsloading(false);
        setError(e.response.data.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
};
