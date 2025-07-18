import { utilService } from "../util.service.js";
import fs from "fs";
drawSquareToFile()
function drawSquareToFile() {
    const str = getSquare(utilService.getRandomIntInclusive(3, 20))
    writeToFile(str)
        .then(() => {
            setTimeout(drawSquareToFile, 200)
        })
}

function writeToFile(str) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./draw-to-file/pic.txt', str, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}


function getSquare(size) {
    var str = '*'.repeat(size) + '\n'
    for (let i = 0; i < size; i++) {
        str += '*' + ' '.repeat(size - 2) + '*\n'
    }
    str += '*'.repeat(size) + '\n'
    return str
}