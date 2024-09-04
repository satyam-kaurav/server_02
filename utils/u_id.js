function nextChar(c, lowestbound, highestbond) {
  return c === highestbond
    ? lowestbound
    : String.fromCharCode(c.charCodeAt(0) + 1);
}

function incrementString(str) {
  let arr = str.split("");
  const length = arr.length;

  for (let i = length - 1; i >= 0; i--) {
    const current_char = arr[i];
    if (current_char >= "0" && current_char <= "9") {
      if (current_char < "9") {
        arr[i] = nextChar(current_char, "0", "9");
        break;
      } else {
        arr[i] = "0";
        continue;
      }
    }
    if (current_char >= "a" && current_char <= "z") {
      if (current_char < "z") {
        arr[i] = nextChar(current_char, "a", "z");
        break;
      } else {
        arr[i] = "a";
        continue;
      }
    }
    if (current_char >= "A" && current_char <= "Z") {
      if (current_char < "Z") {
        arr[i] = nextChar(current_char, "A", "Z");
        break;
      } else {
        arr[i] = "A";
        continue;
      }
    }
  }
  return arr.join("");
}

const new_str = incrementString("999zzzZZZ");

console.log(new_str);
