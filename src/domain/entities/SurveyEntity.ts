type SurveyAnswer = {
  image: string
  answer: string
}

export interface SurveyEntity {
  question: string
  answers: SurveyAnswer[]
}
