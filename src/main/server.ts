import { MongoHelper } from '@/infra/mongodb/MongoHelper'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

const initApp = async () => {
  try {
    await MongoHelper.connect(env.mongoUrl)

    app.listen(env.port, () =>
      console.log(`☕ Server running at http://localhost:${env.port}`)
    )
  } catch (err) {
    console.error(err)
  }
}

initApp()
