import { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { variables } from '@/styles';
import { colors, sizes } from '@/styles';
import { Contact, getTOTP } from '@/api';
import { CircularProgress } from '@mui/material';

export const useYourTOTP = (peer: Contact) => {
  const [totp, setTotp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTotp = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setTotp(await getTOTP(peer));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [peer]);

  useEffect(() => {
    fetchTotp();
  }, [fetchTotp]);

  return { totp, loading, error };
};

type YourTOTPProps = ReturnType<typeof useYourTOTP> & {
  peerName: string;
};

export const YourTOTP: FC<YourTOTPProps> = ({ error, loading, totp, peerName }) => {
  return (
    <Container error={!!error}>
      {error ? (
        <> Error during fetching your TOTP </>
      ) : (
        <span>
          Your TOTP code is: <b>{loading ? <CircularProgress size={22} /> : totp}</b>. Pass this code to {peerName}.
        </span>
      )}
    </Container>
  );
};

type ContainerProps = {
  error: boolean;
};

const Container = styled.div<ContainerProps>`
    padding: ${sizes(4)};
    font-size: 22px;
    border-radius: ${variables.borderRadius};
    color: white;
    box-shadow: ${variables.shadow.inputEffectShadow};
    background-color: ${({ error }) => (error ? colors.primaryBackground : colors.infoBackground)};
}
`;
