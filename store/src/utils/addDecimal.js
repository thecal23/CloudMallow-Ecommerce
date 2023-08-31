function addDecimal(str) {
  if (!str) {
    return "";
  }

  // Convert str to a string to ensure it's of string type
  const strValue = str.toString();

  // First, check if the input string has at least two characters
  if (strValue.length < 2) {
    return "0." + strValue.padStart(2, '0');
  } else {
    // Extract the last two characters and the rest of the string
    const lastTwo = strValue.slice(-2);
    const rest = strValue.slice(0, -2);

    // Combine the parts with a decimal point in between
    return rest + '.' + lastTwo;
  }
}

export default addDecimal;
