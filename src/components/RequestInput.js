import React from 'react'

const RequestInput = ({onRangeSubmit}) => {

    const [start, setStart] = React.useState(0)
    const [end, setEnd] = React.useState(0)

    const handleStartChange = (e) => {
        setStart(Number(e.target.value))
    }

    const handleEndChange = (e) => {
       setEnd(Number(e.target.value))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      onRangeSubmit(start, end);
    }

  return (
        <div>
          <form onSubmit={handleSubmit} >
            <label>
              Start:
              <input type="number" value={start} onChange={handleStartChange} />
            </label>
            <br />
            <label>
              End:
              <input type="number" value={end} onChange={handleEndChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
  )
}

export default RequestInput