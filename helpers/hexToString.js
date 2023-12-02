export const stringToHex = (hex) => {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const hexValue = hex.substr(i, 2);
    const decimalValue = parseFloat(hexValue, 16);
    str += String.fromCharCode(decimalValue);
  }
  return str;
};
