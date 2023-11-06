import { MongoDbLogErrorRepository } from '@/infra/mongodb/MongoDbLogErrorRepository'

import { ControllerWithLogDecorator } from '@/main/decorators/ControllerWithLogDecorator'

import { Controller } from '@/presentation/contracts/Controller'

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logErrorRepository = new MongoDbLogErrorRepository()

  return new ControllerWithLogDecorator(controller, logErrorRepository)
}
