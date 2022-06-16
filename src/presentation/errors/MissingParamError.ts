export class MissingParamError extends Error {
  constructor (readonly param: string) {
    super(`Missing param: ${param}`)

    this.name = 'MissingParamError'
  }
}
