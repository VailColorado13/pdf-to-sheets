const {google} = require('googleapis')
const keys = require('./keys.json')


async function reader() {



const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(async (error, tokens) => {
    if(error) {
        console.log(error)
        return
    }else {
        console.log('determineStartingRow is connected to google sheet')
    }    
})

async function determineStartingRow(client) {

    const gsapi = google.sheets({version:'v4', auth: client})
    const options = {
        spreadsheetId: `1h8e5rZN6c3nhpFnjVkDNTfhS5sd2vgnUco4FwnjeuOY`,
        range: `June '23 FB Segment Prospecting Carousels!J:J`
    }

    let rangeData = await gsapi.spreadsheets.values.get(options)
    
    return rangeData.data.values.length
}

const startingRow = await determineStartingRow(client) 
return startingRow + 1

}

module.exports = reader;