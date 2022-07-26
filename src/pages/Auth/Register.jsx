import { Alert } from 'react-bootstrap'
import React, { useState, useContext } from 'react'
import { useMutation } from 'react-query'
import { API } from '../../config/API'
import { UserContext } from '../../context/user-context'

const Register = () => {

  const title = 'Register'
  document.title = title

  const [ state , dispatch ] = useContext(UserContext)
  const [ message , setMessage ] = useState(null)

  // console.log(state)
  
  const [ data , setData ] = useState({
    name : '',
    email : '',
    password : ''
  })

  const { name , email , password } = data 

  const forChangeInput = (e) =>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers : {
          'Content-type' : 'application/json'
        }
      }

      // KONVERSI DATA KE STRING 
      const body = JSON.stringify(data)
      
      const response = await API.post('/register', body, config)
      console.log(response);

      if(response.data.message == "Register berhasil!"){
        const alert = (
          <Alert variant="success" className='py-3'>
            Regist akun berhasil!
          </Alert>
        )
        setMessage(alert)
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-3">
          {error.response.data.error}
        </Alert>
      )
      setMessage(alert)
        console.error(error);
    }
  })

    return (
        <>
        <div className="d-flex justify-content-center">
          <div className="card-auth p-4 ms-lg-auto">
            <div
              style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }}
              className="mb-2"
            >
              Register
            </div>
            {message}
            <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <div className="mt-3 form">
                <input
                  type="text"
                  placeholder="Name"
                  autoComplete='off'
                  name="name"
                  value={name}
                  onChange={forChangeInput}
                  className="px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete='off'
                  onChange={forChangeInput}
                  value={email}
                  name="email"
                  className="px-3 py-2 mt-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={forChangeInput}
                  value={password}
                  name="password"
                  className="px-3 py-2 mt-3"
                />
              </div>
              <div className="d-grid gap-2 mt-5">
                <button type="submit" className="btn btn-login">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        </>
    )
}

export default Register