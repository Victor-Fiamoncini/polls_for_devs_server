import { AccountModel } from 'src/data'

export namespace AddAccountRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export interface Repository {
    add(account: AddAccountRepository.Params): Promise<AccountModel>
  }
}
