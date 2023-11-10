import { SurveyModel } from '@/data/models/SurveyModel'

export namespace AddSurveyRepository {
  export interface Repository {
    add(survey: SurveyModel): Promise<void>
  }
}
