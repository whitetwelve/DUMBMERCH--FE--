import { Container, Nav, NavLink } from "react-bootstrap"
import logo from "../../assets/img/DumbMerch_Logo.png"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../../assets/css/Nav.css"
import { useContext } from "react"
import { UserContext } from "../../context/user-context"


const Navbar = (props) => {
    const[state, dispatch] = useContext(UserContext)
    const moving = useNavigate()

    const logout = () => {
        dispatch({
            type:"LOGOUT"
        })
        moving("/Auth")
    }

    return (
        <>
            <Container>
                <div className="img">
                    <img src={logo} onClick={() => moving('/')}/>
                </div>
                <Nav className="mt-4">
                    <NavLink href="/about-us" id="firstNav"  className={props?.title == 'About Us' ? `text-navbar-active` : `text-navbar`}>About Us</NavLink>
                    <NavLink href="/Complain-customer" className={props?.title == 'Complain' ? `text-navbar-active` : `text-navbar`}>Complain</NavLink>
                    <NavLink href="/profile" className={props?.title == 'My Profile' ? `text-navbar-active` : `text-navbar`}>Profile</NavLink>
                    <NavLink onClick={logout} className="text-navbar">Logout</NavLink>
                </Nav>
            </Container>
        </>
    )
}

export default Navbar