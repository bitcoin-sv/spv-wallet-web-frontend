import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const FormCardWrapper = styled.section`
  width: 40%;
  margin: 0 auto;
  padding: ${sizes(4)} ${sizes(6)};
  text-align: center;
  border-radius: ${variables.borderRadius};
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
`

export const CardHeadline = styled.h2`
  font-size: 26px;
  margin-bottom: ${sizes(2)};
`
