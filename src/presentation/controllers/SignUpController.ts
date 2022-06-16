export class SignUpController {
  handle (httpRequest: {
    body: { email: string; password: string; passwordConfirmation: string };
  }) {
    return {
      statusCode: 400
    }
  }
}
