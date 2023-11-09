type SurveyAnswer = {
  image: string
  answer: string
}

export type SurveyEntity = {
  question: string
  answers: SurveyAnswer[]
}
