import { DbAuthenticationUseCase } from '@/data/usecases/auth/DbAuthenticationUseCase'

import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

import { JwtAdapter } from '@/infra/encrypt/JwtAdapter'
import { BcryptAdapter } from '@/infra/hash/BcryptAdapter'
import { MongoDbAccountRepository } from '@/infra/mongodb/MongoDbAccountRepository'

import { env } from '@/main/config/env'

export const makeAuthenticationUseCase = (): AuthenticationUseCase.UseCase => {
  const accountRepository = new MongoDbAccountRepository()
  const hasher = new BcryptAdapter()
  const encrypter = new JwtAdapter(env.jwtSecret)

  return new DbAuthenticationUseCase(
    accountRepository,
    hasher,
    encrypter,
    accountRepository
  )
}
