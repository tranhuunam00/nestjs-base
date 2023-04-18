import { Redis } from 'ioredis'
import { CONFIG_APP } from 'src/core/constants'

const redisClient = new Redis({
  host: CONFIG_APP.REDIS.HOST,
  port: CONFIG_APP.REDIS.PORT,
})

export const pingRedis = () => {
  redisClient.ping((err, result) => {
    if (err) {
      throw new Error('Connect redis fail')
    } else {
      console.log('Connected to Redis server')
    }
  })
}
