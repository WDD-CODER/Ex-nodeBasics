import ms from 'ms'
import fs from 'fs'


readFile()
function readFile() {
    fs.readFile('./aboutTime/timeStamps.txt', 'utf8', (err, content) => {
        if (err) return console.log('Cannot read file', err)
        console.log(content)
        const lines = content.split('\n')
        getMsForTimeStamp(lines)
    })
}

function getMsForTimeStamp(cleanLines) {
    cleanLines.forEach(line => {
        const num = Number(line)
        console.log(ms(num, { long: true }))
    })
}



