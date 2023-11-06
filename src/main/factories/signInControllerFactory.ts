import { makeAuthenticationUseCase } from '@/main/factories/authenticationUseCaseFactory'
import { makeLogControllerDecorator } from '@/main/factories/logControllerDecoratorFactory'
import { makeSignInValidator } from '@/main/factories/signInValidatorFactory'

import { Controller } from '@/presentation/contracts/Controller'
import { SignInController } from '@/presentation/controllers/SignInController'

export const makeSignInController = (): Controller => {
  const authenticationUseCase = makeAuthenticationUseCase()
  const validatorComposite = makeSignInValidator()

  const signInController = new SignInController(
    authenticationUseCase,
    validatorComposite
  )

  return makeLogControllerDecorator(signInController)
}
