import { SurveyEntity } from '@/domain/entities/SurveyEntity'

export namespace AddSurveyUseCase {
  export interface UseCase {
    add(survey: SurveyEntity): Promise<void>
  }
}
