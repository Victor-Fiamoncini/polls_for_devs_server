import { Encrypter } from 'src/data/contracts'

import { AccountEntity, AddAccountModel, AddAccountUseCase } from 'src/domain'

export class DbAddAccountUseCase implements AddAccountUseCase {
  constructor (private readonly encrypter: Encrypter) { }

  async add (account: AddAccountModel): Promise<AccountEntity> {
    await this.encrypter.encrypt(account.password)

    return new Promise(resolve => resolve(null))
  }
}
