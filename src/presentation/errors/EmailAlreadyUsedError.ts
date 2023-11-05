export class EmailAlreadyUsedError extends Error {
  constructor(readonly email: string) {
    super(`Email already used: ${email}`)

    this.name = 'EmailAlreadyUsedError'
  }
}
