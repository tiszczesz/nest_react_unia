import { colors,actualDate,getColor } from "./colors.js"; 
// const a = "ala ma kota";
const a: string = "ala ma kota";
const b: number = 42;
type User = {
  name: string;
  age: number;
  date: Date;
};
const user: User = {
  name: "John Doe",
  age: 30,
  date: new Date(),
};

console.log(a.toUpperCase());
console.log(actualDate.toLocaleDateString());
console.log(user);
console.log(colors);
console.log(getColor(1));
console.log(getColor(6));
//console.log(b.toUpperCase());