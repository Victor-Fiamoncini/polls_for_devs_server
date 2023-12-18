import { AddSurveyRepository } from '@/data/contracts/repositories/AddSurveyRepository'

import { SurveyEntity } from '@/domain/entities/SurveyEntity'
import { AddSurveyUseCase } from '@/domain/usecases/AddSurveyUseCase'

export class DbAddSurveyUseCase implements AddSurveyUseCase.UseCase {
  constructor(
    private readonly addSurveyRepository: AddSurveyRepository.Repository
  ) {}

  async add(survey: SurveyEntity): Promise<void> {
    await this.addSurveyRepository.add(survey)
  }
}
