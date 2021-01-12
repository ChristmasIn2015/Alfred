var count = 0
const timer = setInterval(() => {
    console.log(count++)
    if (count === 10) {
        clearInterval(timer)
        console.log('exit')
    }
}, 1000)
