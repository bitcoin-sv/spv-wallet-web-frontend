import { acceptContact, rejectContact } from '@/api/requests';
import { SmallButton } from '@/components/Button';
import { ConfirmationModal } from '@/components/Modal';
import { errorMessage } from '@/utils/errorMessage';
import { FC, useState } from 'react';

type AcceptRejectProps = {
  paymail: string;
  onAccept: () => void;
  onReject: () => void;
};

export const AcceptReject: FC<AcceptRejectProps> = ({ paymail, onAccept, onReject }) => {
  const [state, setState] = useState<'none' | 'accept' | 'reject'>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitAccept = async () => {
    await acceptContact(paymail);
    onAccept();
  };

  const submitReject = async () => {
    await rejectContact(paymail);
    onReject();
  };

  const onConfirm = async () => {
    const submit = state === 'accept' ? submitAccept : submitReject;
    setError('');
    setLoading(true);
    try {
      await submit();
      setState('none');
    } catch (error: unknown) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setState('none');
    setError('');
  };

  return (
    <>
      <SmallButton variant="accept" onClick={() => setState('accept')}>
        Accept
      </SmallButton>
      <SmallButton variant="reject" onClick={() => setState('reject')}>
        Reject
      </SmallButton>
      <ConfirmationModal
        title={state === 'accept' ? 'Accept contact' : 'Reject contact'}
        subtitle={`Are you sure you want to ${state === 'accept' ? 'accept' : 'reject'} this contact invitation?`}
        open={state !== 'none'}
        loading={loading}
        error={error || undefined}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};
