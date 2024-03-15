import { Input } from '@/components/Input'
import { FC, useMemo, useState } from 'react'

const TOTP_VALID_REGEX = /^\d{6}$/

export const usePeerTOTP = (onRequestRefresh: () => void) => {
  const [value, setValue] = useState('')
  const [confirming, setConfirming] = useState(false)

  const valid = useMemo(() => {
    return TOTP_VALID_REGEX.test(value)
  }, [value])

  const onConfirm = () => {
    setConfirming(true)
    //TODO implement it
    setTimeout(() => {
      setConfirming(false)
      onRequestRefresh()
    }, 1000)
  }

  return { value, setValue, valid, confirming, onConfirm }
}

type PeerTOTPProps = ReturnType<typeof usePeerTOTP> & {
  peerName: string
}

export const PeerTOTP: FC<PeerTOTPProps> = ({ value, setValue, valid, peerName }) => {
  return (
    <div>
      <hr />
      <Input
        inputOnLightBackground
        labelText={`Enter code from: ${peerName}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!valid}
        type="number"
      />
    </div>
  )
}
