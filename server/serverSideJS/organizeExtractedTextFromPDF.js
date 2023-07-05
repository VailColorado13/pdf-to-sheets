const organizeStringArrays = require('./organizeStringArrays')

async function organizeExtractedTextFromPDF (rawTextFromPDF) {
   
    //regex expressions
    const topPostCopyRegex = /(?<=Top Post Copy: )(.*?)(?=\|)/s
    const headlineCopyRegex = /\bHL\d+:(.*?)(?=\|)/sg
    const linkDescriptionCopyRegex = /\bLD\d+:(.*?)(?=\|)/sg

    //variables used to store unorganized data from spreadsheet
    let topPostCopy = rawTextFromPDF.match(topPostCopyRegex)
    let headlineCopy = rawTextFromPDF.match(headlineCopyRegex)
    let linkDescriptionCopy = rawTextFromPDF.match(linkDescriptionCopyRegex)

    //pass unorganized data through organizeStringArrays to order it/clean up 
    headlineCopy = await organizeStringArrays(headlineCopy)
    linkDescriptionCopy = await organizeStringArrays(linkDescriptionCopy)

    
    headlineCopy = headlineCopy.map(string => [string])

    //create return object
    let returnObject = {}
    returnObject['topPostCopy'] = topPostCopy
    returnObject['headlineCopy'] = headlineCopy
    returnObject['linkDescriptionCopy'] = linkDescriptionCopy


    //console.log(JSON.stringify(returnObject, null, 2));

    return returnObject

}

module.exports = organizeExtractedTextFromPDF