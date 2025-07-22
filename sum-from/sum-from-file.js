import fs from 'fs'

sumFromFile('./sum-from/rand-nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Cannot sum:', err))


function sumFromFile(file) {
    var nums = 0
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) return reject(err)
            const singleNums = content.split('\r\n')
           const sum = singleNums.reduce((acc, num ) => acc + +num ,0 )
            resolve(sum)
        })
    })
}



