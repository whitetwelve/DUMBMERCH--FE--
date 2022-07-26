import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/API'
import { UserContext } from '../../context/user-context'

const Login = () => {

  const title = 'Login'
  document.title = title

  let moving = useNavigate()
  const [ state , dispatch ] = useContext(UserContext)
  const [ message , setMessage ] = useState(null)

  // console.log(state)
  
  const [ data , setData ] = useState({
    email : '',
    password : ''
  })

  const { email , password } = data 

  const forChangeInput = (e) =>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // CONFIG TYPE DATA
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // CONVERT DATA TO STRING
      const body = JSON.stringify(data);
      console.log(data);
      // INPUT DATA
      const response = await API.post('/login', body, config);
      console.log(response);
      // RESPONSES
      const userName = response.data.data.name
      const userStatus = response.data.data.status

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data
      })
      
      if(userStatus == 'customer'){
        alert(`Welcome user ${userName} !`)
        moving('/')
      } else if(userStatus == 'admin'){ 
        alert(`Welcome ${userName} !`)
        moving('/Complain-admin')
      } else {
        alert("Ga bisa login ya ?")
      }

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-3">
          {error.response.data.message}
        </Alert>
      )
      console.error(error);
      setMessage(alert)
        
    }
  })
    return (
        <>
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4 ms-lg-auto">
        <div
          style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }}
          className="mb-3"
        >
          Login
        </div>
        {message}
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="email"
              onChange={forChangeInput}
              value={email}
              placeholder="Email"
              name="email"
              autoComplete='off'
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              value={password}
              onChange={forChangeInput}
              placeholder="Password"
              name="password"
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-login">Login</button>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}

export default Login