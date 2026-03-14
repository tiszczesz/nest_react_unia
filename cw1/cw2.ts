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
console.log(user);
//console.log(b.toUpperCase());