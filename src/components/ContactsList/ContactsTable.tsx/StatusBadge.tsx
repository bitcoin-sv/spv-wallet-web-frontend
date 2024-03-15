import { ContactStatus } from '@/api/types/contact'
import { FC } from 'react'
import { Chip, ChipProps } from '@mui/material'

type StatusBadgeProps = {
  status: ContactStatus
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const { label, color } = dictionary[status]

  return <Chip size="small" label={label} color={color} />
}

const dictionary: Record<ContactStatus, { label: string; color: ChipProps['color'] }> = {
  'pending-invitation': { label: 'Pending', color: 'primary' },
  'untrusted': { label: 'Untrusted', color: 'secondary' },
  'trusted': { label: 'Trusted', color: 'success' },
}
