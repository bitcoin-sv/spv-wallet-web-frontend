import { To } from 'history'
import { NavLink } from 'react-router-dom'

export const getLinkPropsFromTo = (to?: To, newTab?: boolean) => {
  if (!to) {
    return {}
  }

  if (typeof to === 'string' && (to.includes('http') || newTab)) {
    return { as: 'a', href: to, rel: 'noopener noreferrer', target: '_blank' } as const
  }

  return { as: NavLink, to: to }
}
