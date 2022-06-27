import { AccountEntity } from 'src/domain/entities'

export namespace AddAccountUseCase {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export interface UseCase {
    add(account: AddAccountUseCase.Params): Promise<AccountEntity>
  }
}
