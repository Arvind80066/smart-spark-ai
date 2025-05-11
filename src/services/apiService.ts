
import { supabase } from '@/integrations/supabase/client';

interface ApiCallOptions {
  service: string;
  endpoint: string;
  payload: any;
}

export async function callApi({ service, endpoint, payload }: ApiCallOptions) {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase.functions.invoke('api-proxy', {
      body: {
        service,
        endpoint,
        payload
      }
    });

    if (error) {
      console.error('API call error:', error);
      throw new Error(error.message || 'Failed to call API');
    }

    return data;
  } catch (error) {
    console.error('API service error:', error);
    throw error;
  }
}
