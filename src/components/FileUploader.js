import React from 'react'

function FileUploader() {

    const [uploadedFile, setUploadedFile] = React.useState(null);

    const handleUpload = (event) => {
        setUploadedFile(event.target.files[0]);
      }

    const handleClick = () => {
        const formData = new FormData()
        formData.append('pdfFile', uploadedFile)
        formData.append('startPage', 3)
        formData.append('endPage', 3)
        fetch("/extract-text", {
            method: "post",
            body: formData
        }).then(response => {
            return response.text()
        }).then(extractedText => {
            console.log(extractedText)
        })  
    }

  return (
    <div>
        <input type="file" id="inpFile" onChange={handleUpload}></input>
        <button type="button" id="btnUpload" onClick={handleClick}>Upload</button>
    </div>
  )
}

export default FileUploader