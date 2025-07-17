import fs from 'fs'


function sumFromFile(file) {
    var nums = 0
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) return reject(err)
            const singleNums = content.split('\r\n')
            singleNums.forEach(num => {
                nums += +num
            })
            resolve(nums)
        })
    })
}

sumFromFile('./sum-from/rand-nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Cannot sum:', err))


