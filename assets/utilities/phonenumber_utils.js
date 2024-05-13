import { parse } from "dotenv";

export const isSamePhoneNumber = (num1, num2) => {
  let number1 = parsedPhoneNumber(num1);
  let number2 = parsedPhoneNumber(num2);

  return number1 == number2;
};

export const parsedPhoneNumber = (num) => {
  if (num.startsWith("09")) num = `+63${num.slice(1)}`;
  if (num.startsWith("9")) num = `+630${num}`;
  return num;
};
