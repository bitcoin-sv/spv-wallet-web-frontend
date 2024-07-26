import { Modal } from '@/components/Modal';
import { FC, useEffect, useState } from 'react';
import {
  Form,
  TextWithValues,
  Value,
} from '@/components/Modal/_modals/TransactionConfirmModal/TransactionConfirmModal.styles';
import { SrOnlySpan } from '@/styles';
import { sendTransaction } from '@/api/requests';
import { Loader } from '@/components/Loader';
import { ErrorBar } from '@/components/ErrorBar';
import { useAutoupdate } from '@/providers/autoupdate';
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { modalCloseTimeout } from '../../modalCloseTimeout';

export interface TransactionData {
  paymail: string;
  amount: string;
}

const SUCCESS_SCREEN_MSG = 'Great! Transaction sent to receiver!';

interface TransactionConfirmModalProps {
  open: boolean;
  secondaryButtonOnClickHandler?: () => void;
  primaryButtonOnClickHandler?: () => void;
  transactionData: TransactionData;
}

export const TransactionConfirmModal: FC<TransactionConfirmModalProps> = ({
  open,
  primaryButtonOnClickHandler,
  secondaryButtonOnClickHandler,
  transactionData,
}) => {
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorWithReload, setErrorWithReload] = useState<boolean>(false);

  const { setAutoupdate } = useAutoupdate();

  const receiver = transactionData.paymail;
  const satoshisAmount = transactionData.amount;

  const onFormSubmitHandler = () => {
    if (!password) {
      setErrors('Password is required to confirm transaction.');
      return;
    }
    setErrors('');
    setLoading(true);

    const userPassword = password ? password : 'undefined';

    const newTransactionData = {
      recipient: receiver,
      satoshis: parseInt(satoshisAmount),
      password: userPassword,
    };

    sendTransaction(newTransactionData)
      .then(() => {
        setSuccessMsg(SUCCESS_SCREEN_MSG);

        //store info about new transaction in global context
        const updateTime = new Date().toISOString();
        setAutoupdate(updateTime);

        modalCloseTimeout().then(() => {
          setSuccessMsg('');
          secondaryButtonOnClickHandler?.();
        });
      })
      .catch((error) => {
        if (error) {
          setErrors(
            error.response.data?.message ??
              'Transfer was not sent. Please verify transfer data and try once again. If problem will happen again, contact with our support.',
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //back states to initial values on close modal
  useEffect(() => {
    return () => {
      setPassword('');
      setErrors('');
      setErrorWithReload(false);
      setSuccessMsg('');
    };
  }, [open]);

  return (
    <Modal
      open={open}
      modalTitle="New transaction"
      modalSubtitle="Please check your transactions data once again and confirm if everything is correct"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      secondaryButton={{
        text: 'Confirm',
        variant: 'accept',
        onClick: onFormSubmitHandler,
        type: 'submit',
      }}
      successScreenMsg={successMsg}
      isLoading={loading}
      onCloseByEsc={primaryButtonOnClickHandler}
    >
      {loading && <Loader />}
      <TextWithValues>
        You try to send <Value>{convertSatToBsv(satoshisAmount)} BSV</Value> to <Value>{receiver}</Value>
      </TextWithValues>
      <Form onSubmit={onFormSubmitHandler}>
        <legend>
          <SrOnlySpan>Transaction confirmation form</SrOnlySpan>
        </legend>
        <fieldset>
          <PasswordInput
            labelText="Password"
            inputOnLightBackground
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </fieldset>
        <p>If data are correct, confirm the transaction by your wallet's password</p>
        {errors && <ErrorBar errorMsg={errors} withReloadButton={errorWithReload} />}
      </Form>
    </Modal>
  );
};
