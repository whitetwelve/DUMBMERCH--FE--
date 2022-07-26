import React, { useState, useEffect } from 'react'
import Navbar from "../../components/partials/NavbarCustomer"
import "../../assets/css/Main.css"
import { Card, Container, Row, Col } from 'react-bootstrap'
import { API } from "../../config/API"
import RupiahFormat from "rupiah-format"
import { useNavigate, useParams } from 'react-router-dom'


const Main = () => {
    const title = 'Products'
    document.title = title
    const [products, setProducts] = useState([])

    const navigate = useNavigate()
    const getProducts = async () => {
        const response = await API.get('/products')
        setProducts(response.data.data)
    }

    const detailProduct = (id) => {
        navigate(`/product/${id}`)
    } 
    useEffect(() => {
        getProducts()
    },[])
    console.log(products);
    return (   
    <Container>
        <Navbar/>
        <Row>
            {products?.map((item, index) => (
            <Col key={index} className='mt-2'>
                <Card className="card my-5 shadow-lg" style={{border:'none',background: '#212121'}}>
                    <Card.Img className="img-top" variant="top" src={item?.image} onClick={() => detailProduct(item.id)} style={{cursor:'pointer'}}/>
                    <Card.Body>
                        <Card.Title style={{color :'#F74D4D', fontSize : '18px'}}>{item?.name}</Card.Title>
                        <Card.Text style={{fontSize : '14px'}}>
                        Price : {RupiahFormat.convert(item.price)}
                        </Card.Text>
                        <Card.Text style={{fontSize : '14px'}}>
                        Stock : {item?.qty}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            ))}
            </Row>
    </Container>
    )
}

export default Main