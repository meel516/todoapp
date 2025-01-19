import { useCallback, useState } from "react";
import apiClient from "./apiClient";
import { endpoints, Endpoints, EndpointFunction } from "./endpoints";
import useLoader from "../hooks/useLoader";

interface MutationOptions {
  method?: "POST" | "GET" | "PUT" | "DELETE";
  isFormData?: boolean;
  body?: any;
}

const useMutation = () => {
  const { setLoading } = useLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutation = useCallback(
    async <S extends keyof Endpoints, A extends keyof Endpoints[S]>(
      serviceName: S,
      action: A,
      params?: any,
      options: MutationOptions = {},
    ) => {
      const mergedOptions = {
        method: "POST",
        isFormData: false,
        body: {},
        ...options,
      };

      const { method, isFormData, body } = mergedOptions;
      setIsLoading(true);
      setLoading(true);
      setError(null);
      try {
        const delay = await new Promise((resolve, reject) => {
          setTimeout(() => resolve(null), 1000);
        });
        const endpoint = endpoints[serviceName][action];

        let url: string;
        if (typeof endpoint === "function") {
          url = (endpoint as EndpointFunction)(params);
        } else {
          url = endpoint as string;
        }

        const headers = isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            };

        const response = await apiClient({
          url,
          method,
          headers,
          data: isFormData ? body : JSON.stringify(body),
        });

        const results = response.data;

        if (results) {
          return { results, status: response.status };
        } else {
          throw new Error("Request failed with error: " + results.message);
        }
      } catch (err) {
        console.error("Mutation error:", err);
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    },
    [],
  );

  return { mutation, isLoading, error };
};

export default useMutation;
