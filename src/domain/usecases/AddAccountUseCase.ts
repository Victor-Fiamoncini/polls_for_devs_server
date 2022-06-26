import { AccountEntity } from 'src/domain/entities'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccountUseCase {
  add(account: AddAccountModel): Promise<AccountEntity>
}
