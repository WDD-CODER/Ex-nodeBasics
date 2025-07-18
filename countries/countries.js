import fs from 'fs'
import PDFDocument from 'pdfkit-table'

import { utilService } from '../util.service.js'

const data = utilService.readJsonFile('./countries/countries.json')
data.sort((a, b) => a.name.common.localeCompare(b.name.common));
const sortedData = data.map(country => {
    const capital = (!country.capital) ? 'none' : country.capital[0]
    return [country.name.common, capital, country.population,]
})


let doc = new PDFDocument({ margin: 30, size: 'A4' })

doc.pipe(fs.createWriteStream('./countries/countriesPDF.pdf'))

createPdf(doc)
.then(() =>doc.end())

function createPdf() {
    const table = {
        title: 'My first PDF',
        subtitle: 'sort by name ',
        headers: ['country', 'Capital', 'Population'],
        rows: sortedData,
    }
    return (doc.table(table, { columnSize: [200, 100, 100] }))
}


