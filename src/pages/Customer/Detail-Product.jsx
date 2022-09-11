import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import Navbar from "../../components/partials/NavbarCustomer"
import {  Container, Row, Col, Button } from "react-bootstrap"
import { API } from "../../config/API"
import RupiahFormat from "rupiah-format"
import { useParams, useNavigate } from 'react-router-dom';
import "../../assets/css/Detail-product.css"
import kosong from '../../assets/img/empty.png'
import { useMutation } from "react-query"

const DetailProduct = () => {
    const title = `Detail Product`
    document.title = title
    
    const [state] = useContext(UserContext)

    const moving = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
  console.log(product);
    const getDetailProduct = async () => {
        const response = await API.get(`/product/${id}`)
        //  console.log(response);
        setProduct(response.data.data)
    }
    // console.log(product);

  const handleBuy = useMutation(async () => {
    try {
      // Get data from product
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        idBuyer : state.user.id,
        price: product.price,
      };

      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", config);
      console.log(response);
      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result)
          moving("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          moving("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

    useEffect(() => {
        getDetailProduct()
    },[])

          // Create config Snap payment page with useEffect here ...
  useEffect(()=>{
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  },[])
    return (
        <Container>
            <Navbar/>
            <Row>
                <Col className="mt-2">
                    <img id="img" className="mt-5 ms-3" src={product?.image ? `http://localhost:5000/uploads/` + product?.image : kosong } />
                </Col>
                <Col className="position-absolute">
                    <div className="name-product mt-5">
                        <p className='mt-5'>{product?.name}</p>
                    </div>
                    <div className="stock-product">
                        <p>Stock : {product?.qty} </p>
                    </div>
                    <div className="desc-product">
                        <p>
                            {product?.desc}
                        </p>
                    </div>
                    <div className="price">
                        <p className=''>{RupiahFormat.convert(product?.price)}</p>
                    </div>
                    <div className="btn-buy">
                        <Button className="btn" variant="danger"
                        onClick={()=> handleBuy.mutate()}>
                            Buy
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailProduct