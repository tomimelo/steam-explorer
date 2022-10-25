export interface FindOptions {
  page: number
}

export interface FindResults<T> {
  total: number,
  results: T,
  page: number
}

export interface Explorer {
  findUsers(q: string, options: FindOptions): Promise<FindResults<unknown>>
}
