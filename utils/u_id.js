// generate 2,176,782,336 starts from 000000
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
      continue;
    }
  }

  return arr.join("");
}

const old_str = "000000";
const new_str = incr_str(old_str);

console.log({ old_str, new_str });
