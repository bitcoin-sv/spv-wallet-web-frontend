import styled from '@emotion/styled';
import { sizes, srOnlyStyles } from '@/styles';
import { variables } from '@/styles/variables';
import { media } from '@/styles/media';

export const FormCardWrapper = styled.section`
  width: 100%;
  margin: ${sizes(4)} auto;
  padding: ${sizes(2)};
  text-align: center;
  border-radius: ${variables.borderRadius};
  background-color: ${variables.background.FormCard};
  backdrop-filter: blur(10px);
  box-shadow: ${variables.shadow.tileShadow};

  ${media.sm} {
    max-width: 500px;
    padding: ${sizes(4)} ${sizes(6)};
    margin: 0 auto;
  }
`;
export const Form = styled.form`
  margin: ${sizes(2)} 0 0;

  ${media.sm} {
    margin: ${sizes(6)} 0 0;
  }
`;

export const CardHeadline = styled.h2`
  font-size: 26px;
  margin-bottom: ${sizes(2)};
`;

export const FormLegend = styled.legend`
  ${srOnlyStyles}
`;

export const ActionButtons = styled.div`
  margin: 0 0 ${sizes(6)};

  ${media.sm} {
    margin: 0 0 ${sizes(12)};
  }
`;

export const CardFooter = styled.div`
  text-align: center;
  margin: 0 0 ${sizes(4)};
`;
