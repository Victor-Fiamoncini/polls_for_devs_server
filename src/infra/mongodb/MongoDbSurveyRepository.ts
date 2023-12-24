import { AddSurveyRepository } from '@/data/contracts/repositories/AddSurveyRepository'
import { SurveyModel } from '@/data/models/SurveyModel'

import { MongoHelper } from '@/infra/mongodb/MongoHelper'

export class MongoDbSurveyRepository implements AddSurveyRepository.Repository {
  async add(survey: SurveyModel): Promise<void> {
    const surveyColletion = await MongoHelper.getCollection('surveys')

    await surveyColletion.insertOne(survey)
  }
}
