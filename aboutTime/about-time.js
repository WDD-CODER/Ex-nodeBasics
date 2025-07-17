import ms from 'ms'
import fs from 'fs'
import { resolve } from 'path'


// readFile()
// function timeStamps() {
//     fs.readFile('./aboutTime/timeStamps.txt', 'utf8', (err, content) => {
//         if (err) return console.log('Cannot read file', err)
//         console.log(content)
//         const lines = content.split('\n')
//         getMsForTimeStamp(lines)
//     })
// }

// function getMsForTimeStamp(cleanLines) {
//     cleanLines.forEach(line => {
//         const num = Number(line)
//         console.log(ms(num, { long: true }))
//     })
// }



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



sumFromFile('./aboutTime/rand-nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Cannot sum:', err))
