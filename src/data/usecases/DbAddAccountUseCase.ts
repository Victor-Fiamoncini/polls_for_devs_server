import { AddAccountRepository, Hasher } from 'src/data'

import { AccountEntity, AddAccountUseCase } from 'src/domain'

export class DbAddAccountUseCase implements AddAccountUseCase.UseCase {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository.Repository
  ) { }

  async add (account: AddAccountUseCase.Params): Promise<AccountEntity> {
    const hashedPassword = await this.hasher.hash(account.password)

    const createdAccount = await this.addAccountRepository.add({ ...account, password: hashedPassword })

    return createdAccount
  }
}
