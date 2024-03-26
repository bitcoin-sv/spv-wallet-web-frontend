import { searchContacts } from '@/api/requests/contact'
import { Contact } from '@/api/types/contact'
import { usePikeEnabled } from '@/hooks/useFeatureFlags'
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'

type ContactsContextValue = {
  contacts: Contact[] | null
  refresh: () => void
  loading: boolean
  error: boolean
}

export const ContactsContext = createContext<ContactsContextValue>(null as never)

export const ContactsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [contacts, setContacts] = useState<Contact[] | null>(null)
  const enabled = usePikeEnabled()

  const load = useCallback(async () => {
    if (!enabled) {
      return
    }
    setLoading(true)
    try {
      const contacts = await searchContacts()
      setContacts(contacts)
    } catch {
      setContacts(null)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [enabled])

  const refresh = useCallback(() => {
    load()
  }, [load])

  useEffect(refresh, [refresh])

  const context = useMemo(() => {
    return {
      contacts,
      refresh,
      loading,
      error,
    }
  }, [contacts, refresh, loading, error])

  return <ContactsContext.Provider value={context}>{children}</ContactsContext.Provider>
}
