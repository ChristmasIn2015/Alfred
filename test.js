let count = 0
let timer = setInterval(() => {
    console.log(++count)
    if (count === 7) clearInterval(timer)
}, 1000)
