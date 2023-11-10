import { AccountModel } from '@/data/models/AccountModel'

export namespace AddAccountRepository {
  export type Params = Omit<AccountModel, 'id'>

  export interface Repository {
    add(account: Params): Promise<AccountModel>
  }
}
