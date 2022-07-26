import React, { useState, useContext, useEffect } from 'react'
import Navbar from "../../components/partials/NavbarCustomer"
import { Card, Container, Row, Col, Button } from "react-bootstrap"
import Logo from "../../assets/img/DumbMerch_Logo.png"
import { useNavigate, useParams } from 'react-router-dom'
import "../../assets/css/Profile.css"
import { UserContext } from '../../context/user-context'
import { API } from "../../config/API"
import { useQuery } from 'react-query'
import Kosong from "../../assets/img/blank-profile.png"
import rp from "rupiah-format"
import Moment from "moment"

const Profile = () => {
    const title = "My Profile"
    document.title = title

    const [state] = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const id = state.user.id
    const moving = useNavigate()

    const [profile, setProfile] = useState({
        id:"",
        phone : "",
        gender : "",
        address : "",
        image : ""
    })

    let { data : profileFetchUp } = useQuery("FetchingProfileData", async () => {
        let response = await API.get(`/user/${id}`)
        // console.log(response.data.data.users.profile);
        return response.data.data.users.profile
    })
    
      // Fetching transactions data from database
  let { data: transactions, refetch: transactionsRefetch } = useQuery(
    "transactionsCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get(`/transaction/${state.user.id}`, config);
      return response.data.data
    }
  );

  console.log(transactions);
    useEffect(() => {
            setProfile({
                id: profileFetchUp?.id,
                phone : profileFetchUp?.phone,
                gender : profileFetchUp?.gender,
                address : profileFetchUp?.address,
            })
            setPreview(profileFetchUp?.image)
    },[])

    return (
        <Container>
            <Navbar title={title}/>
                <Row className="d-flex mt-4">
                    <div className="header-text">
                        <p className='mt-4'>My Profile</p>
                    </div>
                    <Col className='mt-3'>
                        <img className="d-block mb-5" src={preview ? `http://localhost:5000/uploads/` + preview :Kosong} />
                    </Col>
                    <Col className="mb-1 min-vh-100">
                        <div className="name-profile mt-5 position-absolute">
                            <p className='bapaknya'>Name</p>
                            <p className='anaknya'>{state.user.name}</p>
                        </div>
                        <div className="for-email position-absolute">
                            <p className='bapaknya'>Email</p>
                            <p className="anaknya">{state.user.email}</p>
                        </div>
                        <div className="for-phone position-absolute">
                            <p className='bapaknya'>Phone</p>
                            <p className="anaknya">{profile?.phone}</p>
                        </div>
                        <div className="for-gender position-absolute">
                            <p className='bapaknya'>Gender</p>
                            <p className="anaknya">{profile?.gender}</p>
                        </div>
                        <div className="for-address position-absolute">
                            <p className='bapaknya'>Address</p>
                            <p className="anaknya mb-5">{profile?.address}</p>
                        </div>
                        <div className="for-button mb-lg-5">
                            <Button className="position-absolute" variant="danger" onClick={() => moving('/profile/' + profile?.id )}>
                                Edit Profile
                            </Button>
                        </div>
                    </Col>
                    <Col className="ms-3" id="right-side">
                        <div className="for-transaction ms-5">
                            <p className='header-text'>My Transaction</p>
                        </div>
                        {transactions?.map(item => (
                            <div className="ms-5 mt-2 mb-4">
                                <Card id="cardss" key={item?.id}>
                                        <img id="img-transaction" className='ms-3' src={item?.product?.image} />
                                        <div id='isi'>
                                            <p className="merah" id='namabarang'>{item?.product?.name}</p>
                                            <p id="tgl" 
                                            className='merah'>{Moment(item?.createdAt).format('llll')}</p>
                                            <p>Price : {rp.convert(item.price)}</p>
                                            <p id="sub">Sub Total : {rp.convert(item.price)}</p>
                                        </div>
                                        <div className="logo">
                                            <img src={Logo} />
                                        </div>
                                        <Col xs="3">
                          <div
                             id="stts" className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                          >
                            {item.status}
                          </div>
                        </Col>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
        </Container>
    )
}

export default Profile