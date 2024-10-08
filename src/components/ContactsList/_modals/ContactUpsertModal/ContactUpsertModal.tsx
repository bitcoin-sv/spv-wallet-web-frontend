import { Modal } from '@/components/Modal';
import { FC, useState } from 'react';
import { SrOnlySpan } from '@/styles';
import { Loader } from '@/components/Loader';
import { PaymailInput } from '@/components/Input/PaymailInput';
import { Input } from '@/components/Input';
import { upsertContact } from '@/api/requests/contact';
import { modalCloseTimeout } from '@/components/Modal/modalCloseTimeout';
import { ErrorBar } from '@/components/ErrorBar';
import { isValidPhone } from '@/utils/helpers/validatePhone';
import { ContactFields } from './useContactFields';
import { EMAIL_REGEX } from '@/utils/constants';
import { errorMessage } from '@/utils/errorMessage';

type ContactUpsertModal = {
  onSubmitted: () => void;
  onCancel: () => void;
  successMsg: string;
  modalTitle: string;
  modalSubtitle: string;
  fields: ContactFields;
  disabledPaymailInput: boolean;
};

export const ContactUpsertModal: FC<ContactUpsertModal> = ({
  onSubmitted,
  onCancel,
  fields,
  successMsg,
  modalTitle,
  modalSubtitle,
  disabledPaymailInput,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { name, paymail, phone, setName, setPaymail, setPhone } = fields;

  const onSuccess = async () => {
    setSuccessMessage(successMsg);
    await modalCloseTimeout();
    onSubmitted();
  };

  const onSubmit = async () => {
    if (phone && !isValidPhone(phone)) {
      setError('Wrong phone number.');
      return;
    }
    if (!paymail || !name) {
      setError('Both Paymail and Name are required');
      return;
    }
    if (!paymail.match(EMAIL_REGEX)) {
      setError('Invalid paymail address!');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await upsertContact(paymail, name, phone ? { phoneNumber: phone } : undefined);
      onSuccess();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      modalTitle={modalTitle}
      modalSubtitle={modalSubtitle}
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: onCancel }}
      secondaryButton={{
        text: 'Submit',
        variant: 'accept',
        onClick: onSubmit,
        type: 'submit',
      }}
      successScreenMsg={successMessage}
      isLoading={loading}
      onCloseByEsc={onCancel}
    >
      {loading && <Loader />}
      {error && <ErrorBar errorMsg={error} />}
      <form onSubmit={onSubmit}>
        <legend>
          <SrOnlySpan>{modalTitle}</SrOnlySpan>
        </legend>
        <fieldset>
          <PaymailInput
            inputOnLightBackground
            value={paymail}
            onChange={(event) => setPaymail(event.target.value)}
            labelSuffix="*"
            required
            disabled={disabledPaymailInput}
          />
          <Input
            inputOnLightBackground
            labelText="Name*"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Input
            inputOnLightBackground
            labelText="Phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </fieldset>
      </form>
    </Modal>
  );
};
