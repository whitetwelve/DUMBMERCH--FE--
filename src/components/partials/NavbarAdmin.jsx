import React, { useContext } from 'react'
import { UserContext } from '../../context/user-context'
import { Container, Nav } from "react-bootstrap"
import logo from "../../assets/img/DumbMerch_Logo.png"
import "../../assets/css/Nav.css"
import { useNavigate } from "react-router-dom"

const Navbar = (props) => {

    const moving = useNavigate()
    const [state, dispatch] = useContext(UserContext)

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
                    <img src={logo} />
                </div>
                <Nav className="mt-4">
                    <Nav.Link href="/Complain-admin" id="firstNav" className={props?.title == 'Complain Admin' ? `text-navbar-active` : `text-navbar`}>Complain</Nav.Link>
                    <Nav.Link href="/categories" className={props?.title == 'Categories' ? `text-navbar-active` : `text-navbar`
                    | props?.title == 'Add Category' ? `text-navbar-active` : `text-navbar`
                    | props?.title == 'Edit Category' ? `text-navbar-active` : `text-navbar`}>Category</Nav.Link>
                    <Nav.Link href="/product-admin" className={props?.title == 'Product Admin' ? `text-navbar-active` : `text-navbar` | props?.title == 'Add Product' ? `text-navbar-active` : `text-navbar` 
                    | props?.title == 'Edit Product' ? `text-navbar-active` : `text-navbar`}>Product </Nav.Link>
                    <Nav.Link onClick={logout} className="text-navbar" >Logout</Nav.Link>
                </Nav>
            </Container>
        </>
    )
}

export default Navbar