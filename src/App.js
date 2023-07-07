import React from 'react'
import FileUploader from './components/FileUploader'
import RequestInput from './components/RequestInput'


function App() {

  const [pageRange, setPageRange] = React.useState(['test'])

  const onRangeSubmit = (start, end) => {
    console.log('onRangeSubmit clicked') 
    let range = []
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    setPageRange(range)
  }

  React.useEffect(() => {console.log(pageRange)},[pageRange])

  return (
    <div> 
      <RequestInput onRangeSubmit={onRangeSubmit}/>
      <FileUploader/>
    </div>
  )
}

export default App