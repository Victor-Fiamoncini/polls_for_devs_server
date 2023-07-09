export const env = {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://polls_for_devs_mongo:27017/polls_for_devs_mongo',
  port: process.env.PORT || 3333,
  jwtSecret:
    process.env.JWT_SECRET || 'at-sg36+28=AJSB@$%%klnsdfgnfgisdfngsidm',
}
