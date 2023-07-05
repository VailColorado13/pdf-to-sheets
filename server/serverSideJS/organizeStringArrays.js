
async function organizeStringArrays (unsortedArrayWithTags) {
    return unsortedArrayWithTags.sort((a, b) =>  {
        return Number(a[2]) - Number(b[2])
    }).map(string => string.slice(5).replace(/\n/g, ""))
}


module.exports = organizeStringArrays