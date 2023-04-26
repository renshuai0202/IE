function* generator() {
  yield 1;
  yield 2;
  yield 3;
};

const gen = generator();
// for(val of gen) {
//   console.log(val);
// }

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());