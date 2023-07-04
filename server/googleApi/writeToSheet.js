// link to docs: https://developers.google.com/sheets/api/guides/concepts
// link to helpful tutorial: https://www.youtube.com/watch?v=MiPpQzW_ya0&t=534s
// lik to test sheet: https://docs.google.com/spreadsheets/d/1Jfvs9H5ZgZUDxNaA55q_w0u6bqxaIpD3nU3QFD9QH3g/edit#gid=0

const {google} = require('googleapis')
const keys = require('./keys.json')


function writeToSheets(dataFromPdf) {
    console.log('write to sheets has been called')
    console.log('logging data wts: ' + dataFromPdf)

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
            console.log('connected')
            gsrun(client)
        }    
    })

    async function gsrun(cl) {
        const gsapi = google.sheets({version: 'v4', auth: cl})
        const options = {
            spreadsheetId: '1Jfvs9H5ZgZUDxNaA55q_w0u6bqxaIpD3nU3QFD9QH3g',
            range:'Data!C3',
            valueInputOption: 'USER_ENTERED',
            resource: {values: [[dataFromPdf[0]]]}
        }
       
       let response = await gsapi.spreadsheets.values.update(options)
       //console.log(response)
    }
}


module.exports = writeToSheets;