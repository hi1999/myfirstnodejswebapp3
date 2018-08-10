const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require('./service-account.json')

const SPREADSHEET_ID = '1GrvkbHdttGR8cG3M494MIqj5TvwNBts3Miy0ZszdQLo';

async function accessSpreadsheet() {
  console.log('-----1');
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  console.log('-----2');
  console.log('-----2'+doc.getInfo);
  //await promisify(doc.useServiceAccountAuth)(creds)
  console.log('-----3');
  const info = await promisify(doc.getInfo)()
  
  console.log('-----4');
  console.log('Loaded doc: ' + info.title +' by '+ info.author.email)
  const sheet = info.worksheets[0]
  console.log(
    'sheet 1: ' + sheet.title + '' + sheet.rowCount +'x'+ sheet.colCount
  )
}

accessSpreadsheet()
