const BIN_TO_CHAR = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "[", "]", ";", "'", "#", "|", ",", ".", "/", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "!", "€", "£", "$", "%",
    "^", "&", "*", "(", ")", "_", "+", "{", "}", ":", "@", "~", "|", "<", ">", "?", ")", "\"", " ",
    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "", "",
];

const BIN_TO_CAT = [
    "meow", "meoww", "meowww", "meowwww", "mrow", "mroww", "mrowww", "mrowwww", "mrrp", "mrrrp",
    "mrrrrp", "mrrrrrp", "purr", "purrr", "purrrr", "purrrrr",
];

function cat_noise_to_bin(cat_noise){
    if (cat_noise[0] == "p") {
        // length min bound to 4
        let length = Math.max(cat_noise.length, 4);
        // length max bound to 7
        length = Math.min(length, 7);
        return 12 | (length - 4);
        // if meow
    } else if (cat_noise[0] == "m" && cat_noise.includes("e")) {
        // length min bound to 4
        let length = Math.max(cat_noise.length, 4);
        // length max bound to 7
        length = Math.min(length, 7);
        return length - 4;
        // if mrrp
    } else if (cat_noise[0] == "m" && !cat_noise.includes("o")) {
        // length min bound to 4
        let length = Math.max(cat_noise.length, 4);
        // length max bound to 7
        length = Math.min(length, 7);
        return 8 | (length - 4);
        // if mrow
    } else {
        // length min bound to 4
        let length = Math.max(cat_noise.length, 4);
        // length max bound to 7
        length = Math.min(length, 7);
        return 4 | (length - 4);
    }
}

// translate a {length} bit number to its String binary representation with a length of {length} bits
function number_to_bin(number, length) {
  let result = number.toString(2);
  return "0".repeat(length - result.length) + result
}

// translate a text to its bit representation, each character is 7 bits and their bit
// representation is their index in the BIN_TO_CHAR array
function text_to_bin(text) {
  for (let i=0;i<text.length;i++){
    if (!BIN_TO_CHAR.includes(text[i])){
      throw Error("char: " + text[i] + " is not valid");
    }
  }
  let result = []
  for (let i=0;i<text.length;i++){
    let index = BIN_TO_CHAR.indexOf(text[i]);
    result.push(number_to_bin(index, 7))
  }
  return result.join("")
}

// translate cat noises to their bit representations, each noise is 4 bits and their bit
// representation is their index in the BIN_TO_CAT array
function cat_to_bin(text) {
  let result = []
  let cat_noises = text.split(" ");
  for (let i=0;i<cat_noises.length;i++){
    let cat_noise = cat_noises[i]
    if (cat_noise == ":3" || cat_noise == ":3c"){
      continue
    }
    result.push(number_to_bin(cat_noise_to_bin(cat_noise), 4));
  }
  for (let i=0;i<cat_noises.length;i++){
    let cat_noise = cat_noises[i]
    if (cat_noise == ":3"){
      result.push(number_to_bin(0, 1));
    }else if (cat_noise == ":3c"){
      result.push(number_to_bin(1, 1));
    }
  }
  return result.join("");
}

function bin_to_cat(bin) {
  let result = [];
  for (let i=0;i<bin.length;i++){
    if (i % 4 != 0 && bin.length - i > bin.length % 4){
      continue;
    }
    if (bin.length - i <= bin.length % 4){
      if (bin[i] == "0"){
        result.push(":3")
      }else{
        result.push(":3c")
      }
    }else {
      let cat_bin = bin.substring(i, i + 4);
      let cat_noise = BIN_TO_CAT[parseInt(cat_bin, 2)];
      result.push(cat_noise);
    }
  }
  return result.join(" ");
}

function bin_to_text(bin) {
    let result = [];
    for (let i=0;i<bin.length;i++){
      if (i % 7 != 0 || bin.length < i + 7){
        continue;
      }
      let letter_bin = bin.substring(i, i + 7);
      let letter = BIN_TO_CHAR[parseInt(letter_bin, 2)];
      result.push(letter);
    }
    return result.join("")
}

function text_to_cat(text) {
  let bin = text_to_bin(text)
  return bin_to_cat(bin);
}

function cat_noises_to_text(cat_noises) {
  let bin = cat_to_bin(cat_noises);
  return bin_to_text(bin)
}
