import { Hasher } from '@/data/contracts/hash/Hasher'
import { AddAccountRepository } from '@/data/contracts/repositories/AddAccountRepository'
import { LoadAccountByEmailRepository } from '@/data/contracts/repositories/LoadAccountByEmailRepository'

import { AccountEntity } from '@/domain/entities/AccountEntity'
import { AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'

export class DbAddAccountUseCase implements AddAccountUseCase.UseCase {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository.Repository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository.Repository
  ) {}

  async add(account: AddAccountUseCase.Params): Promise<AccountEntity> {
    const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(
      {
        email: account.email,
      }
    )

    if (existingAccount) return null

    const hashedPassword = await this.hasher.hash(account.password)

    const createdAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword,
    })

    return createdAccount
  }
}
