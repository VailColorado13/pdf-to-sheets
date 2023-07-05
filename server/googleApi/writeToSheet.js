// link to docs: https://developers.google.com/sheets/api/guides/concepts
// link to helpful tutorial: https://www.youtube.com/watch?v=MiPpQzW_ya0&t=534s
// lik to test sheet: https://docs.google.com/spreadsheets/d/1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY/edit#gid=170017883

const {google} = require('googleapis')
const keys = require('./keys.json')
const determineStartingRow = require('./determineStartingRow')


async function writeToSheets(dataFromPdf) {
    

    console.log(dataFromPdf.headlineCopy);

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
            gsrun(client, startingRow)
        }    
    })

    async function gsrun(cl, startingRow) {
        const gsapi = google.sheets({version: 'v4', auth: client})
        const options = {
            spreadsheetId: '1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY',
            range:`June '23 FB Segment Prospecting Carousels!J${startingRow}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: dataFromPdf.headlineCopy}
        }
       
       let response = await gsapi.spreadsheets.values.update(options)
    //    console.log(response)
    }
}


module.exports = writeToSheets;