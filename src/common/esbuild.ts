// ======================================================================
// ======================================================================
// ======================================================================
// ======================================================================

// 声明一个数组
const arr: number[] = [1, 2]
const arr2: (number | string)[] = [1, 2, '']

// 声明一个类型 比较少使用
type Fruit0 = { water: any }
const arr3: Fruit0[] = [{ water: 1 }]
// 声明一个接口
interface Person {
    1: string
    2: number
    3: boolean
    4: null
    5: undefined
    6: number[]
    // 7: Fruit
    9: () => string
}
interface Person2 extends Person {
    10: string
}
// 声明一个类
class Fruit implements Person {
    water: number
}
const arr4: Fruit[] = [{ water: 1 }]

// 声明一个函数, 其返回值是数字
function getTotal(a: number, b: number): number {
    return a + b // 但是实际可能返回 null undefined
}
function getTotal2({ a, b }: { a: number; b: number }): void {
    console.log(a, b)
    // return a + b // 但是实际可能返回 null undefined
}

// 声明/使用一个泛型函数
function count<T>(start: T, end: T) {
    return `${start}${end}`
}
count<string>('1', '2')
function count2<T, S>(start: T, end: S) {
    return `${start}${end}`
}
count2<string, number>('1', 2)

// 声明/使用一个泛型类
class Water<T> {
    constructor(private name: T[]) {}
    call(): void {
        console.log(this.name)
    }
}
const myWater = new Water<number>([1])
myWater.call()

// 使用枚举限制类型
enum Status {
    Red,
    Yellow,
}
function chargeStatus(type: Status) {
    if (type === Status.Red) console.log('is red')
}

// 模块化方案
// 1 namespace
// 2 export import
