import { AccountModel } from '@/data/models/AccountModel'

export namespace LoadAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export interface Repository {
    loadByEmail(params: Params): Promise<AccountModel>
  }
}
