
import { useState } from 'react';
import { callApi } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { useApiKeys } from '@/contexts/ApiKeysContext';
import { useNavigate } from 'react-router-dom';

interface ApiCallOptions {
  service: string;
  endpoint: string;
  payload: any;
}

export function useApiCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const navigate = useNavigate();

  const checkApiKey = (service: string) => {
    const hasKey = apiKeys.some(key => key.service === service);
    return hasKey;
  };

  const callServiceApi = async <T,>({ service, endpoint, payload }: ApiCallOptions): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if the API key is available
      if (!checkApiKey(service)) {
        // Redirect to API keys page with a message
        toast({
          title: "API Key Required",
          description: `Please add your ${service} API key to use this feature`,
          variant: "destructive"
        });
        navigate('/api-keys');
        throw new Error(`${service} API key is required`);
      }
      
      const response = await callApi({ service, endpoint, payload });
      return response as T;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMsg);
      
      if (errorMsg !== `${service} API key is required`) {
        toast({
          title: "API Call Failed",
          description: errorMsg,
          variant: "destructive"
        });
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    callServiceApi,
    loading,
    error,
    checkApiKey
  };
}
