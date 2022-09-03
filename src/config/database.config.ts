export default () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  sync: JSON.parse(process.env.DB_SYNC), //生产模式必须关闭
  entityPrefix: process.env.DB_ENTITYPREFIX,
});
