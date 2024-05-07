import { parse } from "dotenv";

export const isSamePhoneNumber = (num1, num2) => {
  let number1 = parsedPhoneNumber(num1);
  let number2 = parsedPhoneNumber(num2);

  return number1 == number2;
};

export const parsedPhoneNumber = (num) => {
  if (num.startsWith("639")) num = "0" + num.substring(2);
  if (num.startsWith("+639")) num = "0" + num.substring(3);
  if (num.startsWith("9")) num = "0" + num;
  return num;
};
