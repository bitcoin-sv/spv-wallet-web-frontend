import { Contact, confirmContactWithTOTP } from '@/api';
import { ErrorBar } from '@/components/ErrorBar';
import { Input } from '@/components/Input';
import { FC, useMemo, useState } from 'react';

const TOTP_VALID_REGEX = /^\d{2}$/;

export const usePeerTOTP = (peer: Contact, onConfirmed: () => void) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const valid = useMemo(() => {
    return TOTP_VALID_REGEX.test(value);
  }, [value]);

  const onConfirm = async () => {
    setLoading(true);
    setError(false);
    try {
      await confirmContactWithTOTP(peer, value);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      onConfirmed();
    }
  };

  return { value, setValue, valid, loading, onConfirm, error };
};

type PeerTOTPProps = ReturnType<typeof usePeerTOTP> & {
  peerName: string;
};

export const PeerTOTP: FC<PeerTOTPProps> = ({ value, setValue, valid, peerName, error, loading }) => {
  return (
    <div>
      <hr />
      {error && <ErrorBar errorMsg="An error occurred" />}
      <Input
        inputOnLightBackground
        labelText={`Enter code from: ${peerName}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!valid}
        type="number"
        disabled={loading}
      />
    </div>
  );
};
