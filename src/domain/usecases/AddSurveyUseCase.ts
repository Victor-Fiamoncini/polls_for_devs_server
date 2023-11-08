export namespace AddSurveyUseCase {
  type SurveyAnswer = {
    image: string
    answer: string
  }

  export type Params = {
    question: string
    answers: SurveyAnswer[]
  }

  export interface UseCase {
    add(survey: AddSurveyUseCase.Params): Promise<void>
  }
}
