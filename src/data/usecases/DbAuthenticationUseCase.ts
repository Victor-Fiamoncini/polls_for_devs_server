import { Encrypter } from '@/data/contracts/encrypt/Encrypter'
import { HashComparator } from '@/data/contracts/hash/HashComparator'
import { LoadAccountByEmailRepository } from '@/data/contracts/repositories/LoadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '@/data/contracts/repositories/UpdateAccessTokenRepository'

import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

export class DbAuthenticationUseCase implements AuthenticationUseCase.UseCase {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository.Repository,
    private readonly hashComparator: HashComparator.Comparator,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository.Repository
  ) {}

  async auth({
    email,
    password,
  }: AuthenticationUseCase.Params): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail({
      email,
    })

    if (!account) return null

    const isValid = await this.hashComparator.compare({
      plainPayload: password,
      hashedPayload: account.password,
    })

    if (!isValid) return null

    const accessToken = await this.encrypter.encrypt(account.id)

    if (!accessToken) return null

    await this.updateAccessTokenRepository.updateAccessToken({
      id: account.id,
      token: accessToken,
    })

    return accessToken
  }
}
