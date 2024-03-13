export type PaginationParams = {
  page: number
  page_size: number // this is a backend API requirement, not a TypeScript naming convention
  order: string
  sort: 'desc' | 'asc'
}
