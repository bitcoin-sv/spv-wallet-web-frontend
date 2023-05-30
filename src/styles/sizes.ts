const base = 4

export function sizes(n: number, raw?: boolean) {
  return raw ? base * n : `${base * n}px`
}
