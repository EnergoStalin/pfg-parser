import * as XLSX from 'xlsx'

export default function() {
    const book = XLSX.utils.book_new()

    return book
}