const { createClient } = require("redis");

const redis_client = createClient();

redis_client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  try {
    await redis_client.connect();
    console.log("==> Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

async function redis_set(key, value) {
  try {
    await redis_client.set(key, value);
    console.log(`Key "${key}" set successfully`);
  } catch (err) {
    console.error(`Failed to set key "${key}":`, err);
  }
}

async function redis_get(key) {
  try {
    const value = await redis_client.get(key);
    if (value) {
      console.log(`Key "${key}" retrieved successfully`);
    } else {
      console.log(`Key "${key}" not found`);
    }
    return value;
  } catch (err) {
    console.error(`Failed to get key "${key}":`, err);
    return null;
  }
}

process.on("SIGINT", async () => {
  try {
    await redis_client.disconnect();
    console.log("Redis client disconnected");
  } catch (error) {
    console.log("Error while diconnecting redis", error);
  }
});

module.exports = { redis_set, redis_get };
