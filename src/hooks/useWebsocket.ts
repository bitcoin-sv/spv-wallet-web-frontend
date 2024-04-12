import { useWsUrl } from '@/api/wsUrl.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Centrifuge, MessageContext, Subscription } from 'centrifuge';
import { WebsocketTransaction } from '@/api/types';
import { toast } from 'react-toastify';

export const useWebsocket = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [retries, setRetries] = useState(0);
  const wsUrl = useWsUrl();

  const centrifuge = useMemo(() => new Centrifuge(wsUrl, { websocket: WebSocket }), [wsUrl]);

  const connect = useCallback(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      centrifuge.connect();
    }
  }, [centrifuge, isInitialized]);

  const disconnect = useCallback(() => {
    setIsInitialized(false);
    centrifuge.disconnect();
  }, [centrifuge]);

  useEffect(() => {
    const handleMessage = (ctx: MessageContext) => {
      const event: WebsocketTransaction | undefined = ctx?.data;

      if (event !== null && typeof event == 'object' && !Array.isArray(event)) {
        const { eventType, status, error } = event;
        switch (eventType) {
          case 'create_transaction':
            if (status === 'success') {
              toast.success('Transaction successfully sent');
            } else if (status === 'error') {
              toast.error(error || 'Error while sending transaction');
            }
            break;
        }
      }
    };

    const handleError = () => {
      setRetries((prevState) => prevState + 1);
      if (retries >= 3) {
        centrifuge.disconnect();
      }
    };

    centrifuge.on('message', handleMessage);
    centrifuge.on('error', handleError);

    return () => {
      centrifuge.removeAllListeners('message');
      centrifuge.removeAllListeners('error');
    };
  }, [centrifuge, retries]);

  useEffect(() => {
    const channel = 'spv-wallet';
    let sub: Subscription;
    if (!centrifuge.getSubscription(channel)) {
      sub = centrifuge.newSubscription(channel);
      sub.subscribe();
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
        sub.removeAllListeners();
      }
    };
  }, [centrifuge]);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);
};
