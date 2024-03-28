import { FC, InputHTMLAttributes, useMemo } from 'react'

import { FormattedValueLabel } from './Input.styles'
import { Input } from './Input'
import { CoinsInputProps } from './types'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'

export const CoinsInput: FC<CoinsInputProps> = (props) => {
  const formattedValue = useFormattedValue(props.value)

  return (
    <Input {...props} type="number" min="0" step="any">
      {formattedValue && <FormattedValueLabel>BSV: {formattedValue}</FormattedValueLabel>}
    </Input>
  )
}

const FORMATTED_INITIAL_VALUE = '0.00000000'

const useFormattedValue = (value: InputHTMLAttributes<HTMLInputElement>['value']) => {
  return useMemo(() => {
    if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
      return FORMATTED_INITIAL_VALUE
    }
    const formatted = convertSatToBsv(value)
    if (!formatted || isNaN(parseInt(formatted))) {
      return FORMATTED_INITIAL_VALUE
    }
    return formatted
  }, [value])
}
