// link to docs: https://developers.google.com/sheets/api/guides/concepts
// link to helpful tutorial: https://www.youtube.com/watch?v=MiPpQzW_ya0&t=534s
// lik to test sheet: https://docs.google.com/spreadsheets/d/1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY/edit#gid=170017883

const {google} = require('googleapis')
const keys = require('./keys.json')
const determineStartingRow = require('./determineStartingRow')


async function writeToSheets(dataFromPdf) {

    const startingRow = await determineStartingRow()

    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    )

    client.authorize((error, tokens) => {
        if(error) {
            console.log(error)
            return
        }else {
            console.log('writeToSheet is connected to google sheet')
            writeToSheets(client, startingRow, dataFromPdf)
            mergeCells(client, startingRow)
        }    
    })



    async function writeToSheets(client, startingRow) {
        const gsapi = google.sheets({version: 'v4', auth: client})
        const optionsWriteHeadlineCopy = {
            spreadsheetId: '1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY',
            range:`June '23 FB Segment Prospecting Carousels!J${startingRow}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: dataFromPdf.headlineCopy}
        }
        const optionsWriteLinkDescription = {
            spreadsheetId: '1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY',
            range:`June '23 FB Segment Prospecting Carousels!K${startingRow}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: dataFromPdf.linkDescriptionCopy}
        }
       
       const writeHeadlineCopyResponse = await gsapi.spreadsheets.values.update(optionsWriteHeadlineCopy)
       const writeLinkDescriptionResponse = await gsapi.spreadsheets.values.update(optionsWriteLinkDescription)
    }


   async function mergeCells(client, startingRow) {
    
 
    const gsapi = google.sheets({version: 'v4', auth: client})
    const request = {
        spreadsheetId: '1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY', 
        resource: {
            requests: [
                {
                    mergeCells: {
                        range: {
                            sheetId: 170017883,
                            startRowIndex: startingRow - 1,
                            endRowIndex: startingRow - 1 + dataFromPdf.headlineCopy.length,
                            startColumnIndex: 8,
                            endColumnIndex: 9,
                          },
                        mergeType: 'MERGE_ALL'
                    }
                } 
            ]        
        }
    }

    try {
        const mergeResponse = await gsapi.spreadsheets.batchUpdate(request);
        console.log('Cells merged successfully!');
      } catch (error) {
        console.error('Error merging cells:', error);
      }
   }



}


module.exports = writeToSheets;