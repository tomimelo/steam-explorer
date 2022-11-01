export interface FindOptions {
  page: number
}

export interface FindResults<T = unknown> {
  total: number,
  results: ReadonlyArray<T>,
  page: number
}

export interface Explorer {
  findUsers(q: string, options: FindOptions): Promise<FindResults<unknown>>
}
