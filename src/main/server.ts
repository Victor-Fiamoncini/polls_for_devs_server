import { MongoHelper } from 'src/infra'

import { env } from 'src/main/config/env'

const initApp = async () => {
  try {
    await MongoHelper.connect(env.mongoUrl)

    const { app } = await import('src/main/config/app')

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  } catch (err) {
    console.error(err)
  }
}

initApp()
