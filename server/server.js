const express = require('express')
const app = express()
const fileUpload = require("express-fileupload")
const pdfParse = require("pdf-parse")
const writeToSheets = require('./googleApi/writeToSheet')
const determineStartingRow = require('./googleApi/determineStartingRow')
const organizeExtractedTextFromPDF = require('./serverSideJS/organizeExtractedTextFromPDF')

app.use(fileUpload())

app.get("/api" , (req, res) => {
    res.json({"users": ['mike', 'jim', 'sebastian']})
})

app.post("/extract-text", async (req, res) => {
    const rawTextFromPDF = await pdfParse(req.files.pdfFile)
    const organizedData = await organizeExtractedTextFromPDF(rawTextFromPDF.text)
    determineStartingRow()
    writeToSheets(organizedData)
})


app.listen(5000, () => console.log('we are running the server on port 5000'))