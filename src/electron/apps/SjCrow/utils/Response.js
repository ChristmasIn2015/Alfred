export default (answer = '') => (target, name, descriptor) => {
    const sourceFunction = descriptor.value

    descriptor.value = async function(...args) {
        let result = {
            code: null,
            data: '',
            message: '',
        }
        try {
            let data = await sourceFunction.apply(this, args)
            result.code = 200
            result.data = data || answer
        } catch (error) {
            result.message = error.message || error
        } finally {
            return Promise.resolve(result)
        }
    }
    return descriptor
}
