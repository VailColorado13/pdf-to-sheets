async function organizeExtractedTextFromPDF (rawTextFromPDF) {
    
    //regex expressions
    const topPostCopyRegex = /(?<=Top Post Copy: )(.*?)(?=\|)/s

    //variables used to store data from spreadsheet
    const topPostCopy = rawTextFromPDF.match(topPostCopyRegex)
    return topPostCopy

}

module.exports = organizeExtractedTextFromPDF