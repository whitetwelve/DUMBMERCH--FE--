import { useContext, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../../assets/css/Auth.css"
import Logo from "../../assets/img/DumbMerch_Logo.png"
import { UserContext } from "../../context/user-context"
import Login from "../Auth/Login"
import Register from "../Auth/Register"


const Auth = () => { 
    const moving = useNavigate()

    const [state] = useContext(UserContext)

    const checkingUser = () => {
        if (state.isLogin === true) {
            if(state.user.status === 'customer'){
                moving('/')
            } else if (state.user.status === 'admin'){
                moving('/complain')
            } else {
                alert("Ga bisa login ya ?")
            }
        }
    }
    const [isRegister, setIsRegister] = useState(false)

    const handleToRegister = () => {
        setIsRegister(true)
    }
    checkingUser()

    const handleToLogin = () => {
        setIsRegister(false)
    }

    return (
        <div className="bg-black">
            <Container>
                <Row className="vh-100 d-flex align-items-center">
                    <Col md="6">
                        <img src={Logo} className="img-fluid" 
                        style={{ width: "264px",
                        height: "264px" }} alt="brand" />
                        
                        <div className="text-auth-header mt-4">Easy, Fast and Reliable</div>
                            <p className="text-auth-parag mt-3" 
                            style={{
                            fontFamily : 'Roboto',
                            fontWeight: '700'
                            }}>
                            Go shopping for merchandise, just go to dumb merch <br /> shopping. 
                            the biggest merchandise in{" "}
                            <b>Indonesia</b>
                            </p>
    
                        <div className="mt-5">
                            <Button className="btn btn-login px-5 text-white "
                            style={{background : '#F74D4D', border : 'none'}}
                            onClick={handleToLogin}>
                                Login
                            </Button>
                                
                            <button className="btn btn-register px-5 text-white" 
                            onClick={handleToRegister}>
                                Register
                            </button>
                        </div>
                    </Col>
                    <Col md="6">{isRegister ? <Register /> : <Login />}</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Auth