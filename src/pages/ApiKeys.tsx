
import React, { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useApiKeys } from '@/contexts/ApiKeysContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Loader2, Key, Trash2, AlertTriangle, Save, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

// Service type definitions
interface ServiceConfig {
  name: string;
  key: string;
  description: string;
  placeholder: string;
  learnMoreUrl: string;
}

const services: { [key: string]: ServiceConfig } = {
  openai: {
    name: 'OpenAI',
    key: 'openai',
    description: 'Used for AI Chat, PDF Summarizer, and Code Assistant',
    placeholder: 'sk-...',
    learnMoreUrl: 'https://platform.openai.com/api-keys'
  },
  stability: {
    name: 'Stability AI',
    key: 'stability',
    description: 'Used for Image Generator',
    placeholder: 'sk-...',
    learnMoreUrl: 'https://platform.stability.ai/account/keys'
  },
  azure_speech: {
    name: 'Azure Speech',
    key: 'azure_speech',
    description: 'Used for Speech to Text',
    placeholder: '32-character key',
    learnMoreUrl: 'https://portal.azure.com/'
  },
  google_tts: {
    name: 'Google TTS',
    key: 'google_tts',
    description: 'Used for Text to Speech',
    placeholder: 'AIza...',
    learnMoreUrl: 'https://console.cloud.google.com/apis/credentials'
  },
  writesonic: {
    name: 'Writesonic',
    key: 'writesonic',
    description: 'Used for Writing Assistant',
    placeholder: 'Your API key',
    learnMoreUrl: 'https://writesonic.com/api'
  },
  replicate: {
    name: 'Replicate',
    key: 'replicate',
    description: 'Used for Image Enhancer',
    placeholder: 'r8_...',
    learnMoreUrl: 'https://replicate.com/account/api-tokens'
  }
};

export default function ApiKeys() {
  const { user, loading: authLoading } = useAuth();
  const { apiKeys, loading, saveApiKey, deleteApiKey } = useApiKeys();
  const navigate = useNavigate();
  
  const [currentKeys, setCurrentKeys] = useState<{[key: string]: string}>({});
  const [savingService, setSavingService] = useState<string | null>(null);
  const [deletingService, setDeletingService] = useState<string | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Initialize form with existing keys
  React.useEffect(() => {
    if (apiKeys.length > 0) {
      const keyMap: {[key: string]: string} = {};
      apiKeys.forEach(key => {
        keyMap[key.service] = key.api_key;
      });
      setCurrentKeys(keyMap);
    }
  }, [apiKeys]);

  const handleInputChange = (service: string, value: string) => {
    setCurrentKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleSaveKey = async (service: string) => {
    if (!currentKeys[service]) return;
    
    try {
      setSavingService(service);
      await saveApiKey(service, currentKeys[service]);
    } finally {
      setSavingService(null);
    }
  };

  const handleDeleteKey = async (service: string) => {
    const apiKey = apiKeys.find(key => key.service === service);
    if (!apiKey) return;
    
    try {
      setDeletingService(service);
      await deleteApiKey(apiKey.id);
      // Remove from current keys state
      setCurrentKeys(prev => {
        const updated = { ...prev };
        delete updated[service];
        return updated;
      });
    } finally {
      setDeletingService(null);
    }
  };

  const getServiceKeys = () => {
    return Object.keys(services);
  };

  if (authLoading || loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="container p-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for the different services.</p>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Security Notice</AlertTitle>
            <AlertDescription>
              Your API keys are securely stored and only accessible by you. They are used to make requests on your behalf.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="aiservices">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="aiservices">AI Services</TabsTrigger>
              <TabsTrigger value="otherservices">Other Services</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aiservices">
              <div className="space-y-4">
                {['openai', 'stability', 'writesonic'].map(serviceKey => {
                  const service = services[serviceKey];
                  const hasKey = apiKeys.some(k => k.service === serviceKey);
                  
                  return (
                    <Card key={serviceKey}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Key className="mr-2 h-5 w-5" />
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label htmlFor={serviceKey}>API Key</Label>
                            <Input
                              id={serviceKey}
                              type="text"
                              placeholder={service.placeholder}
                              value={currentKeys[serviceKey] || ''}
                              onChange={(e) => handleInputChange(serviceKey, e.target.value)}
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <Button 
                              onClick={() => handleSaveKey(serviceKey)}
                              disabled={savingService === serviceKey || !currentKeys[serviceKey]}
                            >
                              {savingService === serviceKey ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                            </Button>
                            {hasKey && (
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteKey(serviceKey)}
                                disabled={deletingService === serviceKey}
                              >
                                {deletingService === serviceKey ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <a href={service.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                            Get API Key
                          </a>
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" size="sm">
                              <Lock className="h-3 w-3 mr-1" />
                              How is this secured?
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>How your API keys are secured</DialogTitle>
                              <DialogDescription>
                                <div className="space-y-4 mt-4">
                                  <p>
                                    Your API keys are securely stored in our database with row-level security, ensuring only you can access them.
                                  </p>
                                  <p>
                                    When you use any tool that requires an API key, our backend makes the request on your behalf without exposing the key to your browser.
                                  </p>
                                  <p>
                                    We never share, sell, or use your API keys for any purpose other than making the requested API calls on your behalf.
                                  </p>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="otherservices">
              <div className="space-y-4">
                {['azure_speech', 'google_tts', 'replicate'].map(serviceKey => {
                  const service = services[serviceKey];
                  const hasKey = apiKeys.some(k => k.service === serviceKey);
                  
                  return (
                    <Card key={serviceKey}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Key className="mr-2 h-5 w-5" />
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label htmlFor={serviceKey}>API Key</Label>
                            <Input
                              id={serviceKey}
                              type="text"
                              placeholder={service.placeholder}
                              value={currentKeys[serviceKey] || ''}
                              onChange={(e) => handleInputChange(serviceKey, e.target.value)}
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <Button 
                              onClick={() => handleSaveKey(serviceKey)}
                              disabled={savingService === serviceKey || !currentKeys[serviceKey]}
                            >
                              {savingService === serviceKey ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                            </Button>
                            {hasKey && (
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteKey(serviceKey)}
                                disabled={deletingService === serviceKey}
                              >
                                {deletingService === serviceKey ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <a href={service.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                            Get API Key
                          </a>
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" size="sm">
                              <Lock className="h-3 w-3 mr-1" />
                              How is this secured?
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>How your API keys are secured</DialogTitle>
                              <DialogDescription>
                                <div className="space-y-4 mt-4">
                                  <p>
                                    Your API keys are securely stored in our database with row-level security, ensuring only you can access them.
                                  </p>
                                  <p>
                                    When you use any tool that requires an API key, our backend makes the request on your behalf without exposing the key to your browser.
                                  </p>
                                  <p>
                                    We never share, sell, or use your API keys for any purpose other than making the requested API calls on your behalf.
                                  </p>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
