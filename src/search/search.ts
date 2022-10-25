export interface SearchOptions {
  page: number
}

export interface SearchResults<T> {
  total: number,
  results: T,
  page: number
}

export interface Search {
  searchUsers(q: string, options: SearchOptions): Promise<SearchResults<unknown>>
}
