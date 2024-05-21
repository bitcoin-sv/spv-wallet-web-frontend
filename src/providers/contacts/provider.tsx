import { searchContacts } from '@/api/requests/contact';
import { Contact } from '@/api/types/contact';
import { usePikeEnabled } from '@/hooks/useFeatureFlags';
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthorization } from '../authorization';

type ContactsContextValue = {
  contacts: Contact[] | null;
  refresh: () => void;
  loading: boolean;
  error: boolean;
};

export const ContactsContext = createContext<ContactsContextValue>(null as never);

export const ContactsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const enabled = usePikeEnabled();
  const { authorization } = useAuthorization();

  const load = useCallback(async () => {
    if (!enabled || !authorization) {
      return;
    }
    setLoading(true);
    try {
      const contactsResponse = await searchContacts();
      setContacts(contactsResponse.content);
    } catch {
      setContacts(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [authorization, enabled]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  useEffect(refresh, [refresh]);

  const context = useMemo(() => {
    return {
      contacts,
      refresh,
      loading,
      error,
    };
  }, [contacts, refresh, loading, error]);

  return <ContactsContext.Provider value={context}>{children}</ContactsContext.Provider>;
};
