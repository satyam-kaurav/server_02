const { redis_get, redis_set } = require("../configs/redis");

const BASE_UID = "000000";

function incr_str(str) {
  const arr = str.split("");

  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if ((item >= "0" && item < "9") || (item >= "A" && item < "Z")) {
      arr[i] = String.fromCharCode(item.charCodeAt(0) + 1);
      break;
    }
    if (item === "9") {
      arr[i] = "A";
      break;
    }
    if (item === "Z") {
      arr[i] = "0";
      if (i === 0) {
        arr.unshift("0");
      }
    }
  }

  return arr.join("");
}

async function u_id() {
  try {
    let pre_value = await redis_get("u_id");
    pre_value = pre_value || BASE_UID;

    const new_value = incr_str(pre_value);

    await redis_set("u_id", new_value);

    return new_value;
  } catch (error) {
    console.log("err", error);
  }
}

module.exports = u_id;
