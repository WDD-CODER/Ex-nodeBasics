import ms from 'ms'
import fs from 'fs'


readFile()
function readFile() {
    fs.readFile('./aboutTime/timeStamps.txt', 'utf8', (err, content) => {
        if (err) return console.log('Cannot read file', err)
        const nums = content.split('\r\n').filter(num => num)
        const timeStamps = nums.map(num => Number(num))
        timeStamps.forEach(timeStamp => {
            return console.log({
                timeStamp,
                timeStampsByName: ms(timeStamp, { long: true }) })
         })
    })
}



