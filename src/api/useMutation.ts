import { useCallback, useState } from 'react';
import apiClient from './apiClient'; 
import { endpoints, Endpoints, EndpointFunction } from './endpoints';


interface MutationOptions {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'; 
  isFormData?: boolean;
  body?: any; 
}

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutation = useCallback(
    async <S extends keyof Endpoints, A extends keyof Endpoints[S]>(
      serviceName: S, 
      action: A, 
      params?: any,
      options: MutationOptions = {} 
    ) => {
      const mergedOptions = {
        method: 'POST', 
        isFormData: false, 
        body: {}, 
        ...options, 
      };

      const { method, isFormData, body } = mergedOptions;
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        // Get the endpoint from the endpoints configuration
        const endpoint = endpoints[serviceName][action];

        // Explicitly check if the endpoint is a function, and call it if it is
        let url: string;
        if (typeof endpoint === 'function') {
          // Call the function to get a string URL
          url = (endpoint as EndpointFunction)(params);
        } else {
          // Directly use the string if it's already a string
          url = endpoint as string;
        }

        // Now that `url` is guaranteed to be a string, we can use it directly in the request
        const headers = isFormData
          ? {}
          : {
              'Content-Type': 'application/json',
            };

        // Perform the API request using your apiClient (Axios)
        const response = await apiClient({
          url, // Now it's definitely a string
          method,
          headers,
          data: isFormData ? body : JSON.stringify(body), // Use JSON.stringify for non-form data
        });

        const results = response.data;

        // Handle response success or failure
        if (results.success) {
          return { results, status: response.status }; // Success response
        } else {
          throw new Error('Request failed with error: ' + results.message); // Handle failure
        }
      } catch (err) {
        console.error('Mutation error:', err);
        setError(err as Error); // Save the error to state
        throw err; // Re-throw for potential external handling
      } finally {
        setIsLoading(false); // Reset loading state
      }
    },
    [] // Empty dependency array ensures this function is stable across re-renders
  );

  return { mutation, isLoading, error };
};

export default useMutation;
