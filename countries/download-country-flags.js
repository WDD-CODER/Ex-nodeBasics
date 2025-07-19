import fs from 'fs'
import path from 'path'

import { utilService } from '../util.service.js';

Promise.all([
    downloadCountryFlags('flagsSvg','svg').then(getFolderSize),
    downloadCountryFlags('flagsPng','png').then(getFolderSize)
])
    .then(([svgSize, pngSize]) => {
        howIsBigger(svgSize, pngSize)
    })
    .catch(err => console.log('err', err))

function downloadCountryFlags(folderName, fileType) {
    const countries = getCountries()
    // console.log('Countries:', countries.map(c => c.name))
    return downloadFlags(countries, folderName, fileType)
        .then(() => {
            console.log('Your flags are ready')
            return folderName
        })
        .catch(err => console.log('err', err))

}

function getCountries() {
    var countries = []
    const data = utilService.readJsonFile('./countries/countries.json')
    const sortedData = data.sort((a, b) => b.population - a.population);
    for (let i = 0; i < 5; i++) {
        countries.push(sortedData[i])
    }
    return countries
}


function downloadFlags(countries, folderName, fileType) {
    const downloadDir = `./countries/${folderName}`
    if (!fs.existsSync(downloadDir)) {
        console.log('no folder before! made a new oen!')
        fs.mkdirSync(downloadDir)
    }
    const prms = countries.map(country => {
        const url = country.flags[fileType]
        const name = country.name.common
        var fileSize = 0
        fetch(url, { method: 'HEAD' })
            .then(res => fileSize = res.headers.get('content-length'))
            .catch(err => console.log('err', err))

        return utilService.download(
            url,
            `${downloadDir}/${name}.png`
        )
    })
    return Promise.all(prms)
}

function getFolderSize(folderName) {
    const folder = `./countries/${folderName}`
    const files = fs.readdirSync(folder)
    let totalFilesSize = 0

    files.forEach(file => {
        const filePath = path.join(folder, file)
        const stat = fs.statSync(filePath)
        // console.log(`${filePath} size `, stat.size)
        totalFilesSize += stat.size
    })
    return totalFilesSize
}


function howIsBigger(a, b) {
    if (a > b) console.log('SVG folder is bigger');
    else if (b > a) console.log('PNG folder is bigger');
    else console.log('They are the same size');
}
