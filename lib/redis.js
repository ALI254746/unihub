import { createClient } from "redis";

let client;

if (!global.redisClient) {
  client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
  });

  client.connect().catch((err) => console.error("Redis connect error:", err));

  global.redisClient = client;
} else {
  client = global.redisClient;
}

export default client;
