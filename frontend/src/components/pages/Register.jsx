import React, { useState,useContext } from 'react'
import { Container, Row , Col, Form , FormGroup ,Button } from 'reactstrap';
import { Link,useNavigate } from 'react-router-dom';
import '../../styles/login.css'
import registerImg from '../../assets/images/register.png'
import userIcon from '../../assets/images/user.png'
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config.js';


const Register = () => {
   
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email:undefined,
    password: undefined
    })

    const {dispatch} =useContext(AuthContext)
    const navigate= useNavigate()

  const handleChange = e => {
    setCredentials(prev =>({...prev , [e.target.id] : e.target.value }))
   };

   const handleClick = async e=>{
    e.preventDefault();

    try{
      
      const res= await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers:{
          'content-type' : 'application/json'
        },
        body:JSON.stringify(credentials)
      })

      const result= await res.json()

      if(!res.ok) alert(result.message)

      dispatch({type:'REGISTER_SUCCESS'})
      navigate('/login')

    }catch(err){
      alert(err.message)
    }
   }
   
  return (
<section className="register-section">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg="8" md="10" sm="12" className="m-auto">
            <div className="login__container d-flex flex-column flex-lg-row justify-content-between align-items-center">
              {/* Image Section */}
              <div className="login__img mb-4 mb-lg-0 text-center text-lg-start d-none d-lg-block">
                <img src={registerImg} alt="" className="img-fluid" />
              </div>

              {/* Form Section */}
              <div className="login__form text-center text-lg-start">
                <div className="user mb-3">
                  <img src={userIcon} alt="" className="img-fluid" />
                </div>
                <h2 className="mb-4">Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                      className="form-control mb-3"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                      className="form-control mb-3"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                      className="form-control mb-3"
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn w-100" type="submit">
                    Register
                  </Button>
                </Form>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Login Here!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register

