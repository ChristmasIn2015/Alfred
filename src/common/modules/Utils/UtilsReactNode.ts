export default class UtilsNodeReact {
    constructor() {}

    // 修饰器
    Response(answer: string = null): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let result = {
                    code: null,
                    data: '',
                    message: '',
                }
                let response = args[1]
                try {
                    let data = await sourceFunction.apply(this, args)
                    result.code = 200
                    result.data = data || answer
                } catch (error) {
                    result.message = error.message || error
                } finally {
                    response.send(result)
                }
            }
        }
    }
}
