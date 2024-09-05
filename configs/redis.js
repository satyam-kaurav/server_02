const { createClient } = require("redis");

const redis_client = createClient(); // accepts configs as object {}

redis_client.on("error", (err) => console.log("Redis redis_client Error", err));

async function redis_set(key, value) {
  await redis_client.connect();

  await redis_client.set(key, value);

  await redis_client.disconnect();
}
async function redis_get(key) {
  await redis_client.connect();

  const value = await redis_client.get(key);

  await redis_client.disconnect();

  return value;
}

module.exports = { redis_set, redis_get };
