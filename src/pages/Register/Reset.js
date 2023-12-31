import React, { useState } from 'react'

import "./Reset.css"
const Reset = () => {
    const[email, setEmail] = useState("")
    const submitHandler =(e) =>{
        e.preventDefault()
    }
  return (
    <form onSubmit={submitHandler} className='resetForm'>
    <h2>Enter your email to reset the password...</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <button type='submit'>Reset</button>
      </form>
  )
}

export default Reset