import { useState, useCallback, useEffect } from 'react'

export const useYourTOTP = () => {
  const [totp, setTotp] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTotp = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      //TODO implement it
      await asyncSetTimeout(1000)
      setTotp(Math.floor(Math.random() * 1000000))
    } catch {
      setError('Error during fetching your TOTP')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTotp()
  }, [fetchTotp])

  return { totp, loading, error }
}

//async setTimeout
const asyncSetTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
