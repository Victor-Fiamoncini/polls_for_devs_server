import { AccountEntity } from '@/domain/entities/AccountEntity'

export namespace AddAccountUseCase {
  export type Params = Omit<AccountEntity, 'id'>

  export interface UseCase {
    add(account: Params): Promise<AccountEntity>
  }
}
