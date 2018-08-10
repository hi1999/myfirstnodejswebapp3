const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require('credentials.json')

const SPREADSHEET_ID = '1GrvkbHdttGR8cG3M494MIqj5TvwNBts3Miy0ZszdQLo';

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  console.log('Loaded doc: ' + info.title +' by '+ info.author.email)
  const sheet = info.worksheets[0]
  console.log(
    'sheet 1: ' + sheet.title + '' + sheet.rowCount +'x'+ sheet.colCount
  )
}

accessSpreadsheet()
