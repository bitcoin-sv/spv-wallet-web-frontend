import styled from '@emotion/styled'
import { sizes, srOnlyStyles } from '@/styles'
import { variables } from '@/styles/variables'

export const FormCardWrapper = styled.section`
  width: 50%;
  max-width: 500px;
  margin: 0 auto;
  padding: ${sizes(4)} ${sizes(6)};
  text-align: center;
  border-radius: ${variables.borderRadius};
  background-color: ${variables.background.formCard};
  backdrop-filter: blur(10px);
  box-shadow: ${variables.shadow.tileShadow};
`
export const Form = styled.form`
  margin: ${sizes(6)} 0 0;
`

export const CardHeadline = styled.h2`
  font-size: 26px;
  margin-bottom: ${sizes(2)};
`

export const FormLegend = styled.legend`
  ${srOnlyStyles}
`

export const ActionButtons = styled.div`
  margin: 0 0 ${sizes(12)};
`

export const CardFooter = styled.div`
  text-align: center;
  margin: 0 0 ${sizes(4)};
`
