import { makeAuthenticationUseCase } from '@/main/factories/auth/authenticationUseCaseFactory'
import { makeSignInValidator } from '@/main/factories/auth/signInValidatorFactory'
import { makeLogControllerDecorator } from '@/main/factories/log/logControllerDecoratorFactory'

import { Controller } from '@/presentation/contracts/Controller'
import { SignInController } from '@/presentation/controllers/auth/SignInController'

export const makeSignInController = (): Controller => {
  const authenticationUseCase = makeAuthenticationUseCase()
  const validatorComposite = makeSignInValidator()

  const signInController = new SignInController(
    authenticationUseCase,
    validatorComposite
  )

  return makeLogControllerDecorator(signInController)
}
