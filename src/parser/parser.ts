import { User } from '../types/user'

export interface Parser<DATA = unknown> {
  parseUsers(data: DATA): ReadonlyArray<User>
}
