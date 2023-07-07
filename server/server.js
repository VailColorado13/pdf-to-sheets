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
    console.log(req.body)
    const rawTextFromPDF = await pdfParse(req.files.pdfFile, {min: 4, max: 4})
    console.log(rawTextFromPDF)
    const organizedData = await organizeExtractedTextFromPDF(rawTextFromPDF.text)
    // determineStartingRow()
    // writeToSheets(organizedData)
})


app.listen(5000, () => console.log('we are running the server on port 5000'))