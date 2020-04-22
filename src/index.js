require('./a.css')
require('./b.scss')
require('./c.less')
console.log(111111)



let fn = () => {
	console.log(2222)
}

fn()

function* gen() {
	yield 1;
}
console.log(gen().next())


// console.log('aaa'.includes('a'))

// class B {
//   c = 2;
// }
/* @log
class A {
  a = 1;
}
var a = new A()
console.log(a.a)

//这个装饰  没有学过
function log(target) {
  console.log(target)
} */