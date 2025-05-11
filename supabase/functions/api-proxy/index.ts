
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.json();
    const { service, endpoint, payload } = body;
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create a Supabase client to access the database
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get the user ID from the JWT
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      console.error('User validation error:', userError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the API key from the database
    const { data: apiKeyData, error: apiKeyError } = await supabaseAdmin
      .from('api_keys')
      .select('api_key')
      .eq('user_id', user.id)
      .eq('service', service)
      .single();

    if (apiKeyError || !apiKeyData) {
      console.error('API key retrieval error:', apiKeyError);
      return new Response(JSON.stringify({ error: 'API key not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let apiResponse;
    let apiUrl;
    let headers: HeadersInit = { 'Content-Type': 'application/json' };

    // Handle different APIs
    switch (service) {
      case 'openai':
        apiUrl = `https://api.openai.com/v1/${endpoint}`;
        headers = {
          ...headers,
          'Authorization': `Bearer ${apiKeyData.api_key}`,
        };
        break;
      case 'stability':
        apiUrl = `https://api.stability.ai/v1/${endpoint}`;
        headers = {
          ...headers,
          'Authorization': `Bearer ${apiKeyData.api_key}`,
        };
        break;
      case 'azure_speech':
        apiUrl = `https://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken`;
        headers = {
          ...headers,
          'Ocp-Apim-Subscription-Key': apiKeyData.api_key,
        };
        break;
      case 'google_tts':
        // We'll handle Google TTS differently since it uses Google APIs
        apiUrl = `https://texttospeech.googleapis.com/v1/${endpoint}?key=${apiKeyData.api_key}`;
        break;
      case 'writesonic':
        apiUrl = `https://api.writesonic.com/v2/${endpoint}`;
        headers = {
          ...headers,
          'X-API-KEY': apiKeyData.api_key,
        };
        break;
      case 'replicate':
        apiUrl = `https://api.replicate.com/v1/${endpoint}`;
        headers = {
          ...headers, 
          'Authorization': `Token ${apiKeyData.api_key}`,
        };
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid service' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log(`Making request to ${apiUrl}`);
    
    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
