import { AddAccountRepository, Encrypter } from 'src/data/contracts'

import { AccountEntity, AddAccountUseCase } from 'src/domain'

export class DbAddAccountUseCase implements AddAccountUseCase.UseCase {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository.Repository
  ) { }

  async add (account: AddAccountUseCase.Params): Promise<AccountEntity> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    await this.addAccountRepository.add({ ...account, password: hashedPassword })

    return new Promise(resolve => resolve(null))
  }
}
