import React, { useState ,useContext} from 'react'
import { Container, Row , Col, Form , FormGroup ,Button } from 'reactstrap';
import { Link ,useNavigate} from 'react-router-dom';
import '../../styles/login.css'
import loginImg from '../../assets/images/login.png'
import userIcon from '../../assets/images/user.png'
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Login = () => {
   
  const [credentials, setCredentials] = useState({
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
    dispatch({ type:'LOGIN_START' });

    try{
      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'content-type' : 'application/json'
        },
        credentials:'include',
        body:JSON.stringify(credentials),
      })

      const result= await res.json();

      if(!res.ok) alert(result.message);
      console.log(result.data);

      dispatch({type:'LOGIN_SUCCESS', payload:result.data})
      navigate('/');

    }catch(err){
      dispatch({type:'LOGIN_FAILURE', payload:err.message})
    }
   }
   
  return (
<section className="login-section">
  <Container>
    <Row className="justify-content-center align-items-center">
      <Col lg="8" md="10" sm="12" className="m-auto">
        <div className="login__container d-flex flex-column flex-lg-row justify-content-between align-items-center">
          {/* Image Section */}
          <div className="login__img mb-4 mb-lg-0 text-center text-lg-start d-none d-lg-block">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="img-fluid"
            />
          </div>

          {/* Form Section */}
          <div className="login__form text-center text-lg-start">
            <div className="user mb-3">
              <img src={userIcon} alt="User Icon" className="img-fluid" />
            </div>
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleClick}>
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
                Login
              </Button>
            </Form>
            <p className="mt-3">
              Don't have an account? <Link to="/register">Register Here!</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>


  )
}

export default Login
