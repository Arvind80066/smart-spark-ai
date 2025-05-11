
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  service: string;
  api_key: string;
  created_at: string;
}

interface ApiKeysContextType {
  apiKeys: ApiKey[];
  loading: boolean;
  saveApiKey: (service: string, apiKey: string) => Promise<void>;
  getApiKey: (service: string) => ApiKey | undefined;
  deleteApiKey: (id: string) => Promise<void>;
}

const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined);

export function ApiKeysProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    } else {
      setApiKeys([]);
      setLoading(false);
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*');

      if (error) {
        throw error;
      }

      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API keys',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = async (service: string, apiKey: string) => {
    try {
      // Check if there's already a key for this service
      const existingKey = apiKeys.find(key => key.service === service);
      
      if (existingKey) {
        // Update the existing key
        const { error } = await supabase
          .from('api_keys')
          .update({ api_key: apiKey })
          .eq('id', existingKey.id);

        if (error) throw error;
      } else {
        // Create a new key
        const { error } = await supabase
          .from('api_keys')
          .insert({ service, api_key: apiKey });

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `${service} API key saved successfully`,
      });
      
      fetchApiKeys();
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to save API key',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const getApiKey = (service: string) => {
    return apiKeys.find(key => key.service === service);
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'API key deleted successfully',
      });
      
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete API key',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <ApiKeysContext.Provider value={{ apiKeys, loading, saveApiKey, getApiKey, deleteApiKey }}>
      {children}
    </ApiKeysContext.Provider>
  );
}

export function useApiKeys() {
  const context = useContext(ApiKeysContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeysProvider');
  }
  return context;
}
