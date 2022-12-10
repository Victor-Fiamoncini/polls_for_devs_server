import { AccountModel } from 'src/data'

export namespace LoadAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export interface Repository {
    loadByEmail(params: LoadAccountByEmailRepository.Params): Promise<AccountModel>
  }
}
