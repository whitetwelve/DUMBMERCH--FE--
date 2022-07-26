import React, { useState, useEffect, useContext} from 'react'
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { API } from "../../config/API"
import { UserContext } from '../../context/user-context'
import Navbar from "../../components/partials/NavbarCustomer"
import "../../assets/css/AboutUs.css"
import IconsMail from "../../assets/img/mail-icon.png"
import Saya from ".././../assets/img/me.jpg"
import NoProfile from "../../assets/img/blank-profile.png"
import Moment from "moment"
import DislikeBef from "../../assets/img/dislikebef.png"
import DislikeAf from "../../assets/img/dislikeaf.png"
import LikeBef from "../../assets/img/likebef.png"
import LikeAf from "../../assets/img/likeaf.png"

const AboutUs = () => {
    const title = "About Us"
    document.title = title
    
    const [state] = useContext(UserContext)
    
    const moving = useNavigate()

    const id = state.user.id

    const [comments, setComments] = useState([])
    // console.log(comments);
    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        image: '',
        name: '',
        message: ''
      }); 

    let { data : profileFetchUp } = useQuery("FetchingProfileData", async () => {
        let response = await API.get(`/user/${id}`)
        return response.data.data.users.profile
    })
    
    const getComments = async () => {
        const response = await API.get(`/comments`)
        setComments(response.data.data)
    }

    useEffect(() => {
        getComments()
        setPreview(
            profileFetchUp?.image
        )
        setForm({
            image : profileFetchUp?.image,
            name : state?.user?.name,
            message : ''
        })
    },[profileFetchUp])
// console.log(profileFetchUp);
// console.log(preview);


const handleOnChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
    })
}

const handleSubmit = useMutation(async (e) => {
    try {
    //   Configuration
      const config = {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Store data with FormData as object
      const body = JSON.stringify({name : form?.name,
                                    image : form?.image,
                                    message : form?.message});

      // Insert product data
      const response = await API.post('/comment', body, config);
      console.log(response);
      alert("Comment berhasil ditambahkan")
      moving('/about-us');

      if(e.key == "Enter"){
        const response = await API.post('/comment', body, config);
        console.log(response);
        alert("Comment berhasil ditambahkan")
        moving('/about-us');
        }
    } catch (error) {
      console.log(error);
    }
  });

  console.log(comments);
    const sendMail = () => {
        let sbj = 'How can i help you?'
        const penerimaMail = 'dumbwaysID@mail.com'
        let app = `mailto:${penerimaMail}?subject=${sbj}&body=I guess i need your help`
        window.location.href = app;
    }


    return (
        <Container>
            <Navbar title={title}/>
            <Row>
                <div className="header-contents position-absolute">&nbsp;
                    <div className="title-contents">
                        <p>About us</p>
                    </div>
                    <div className="for-image">
                        <img src={Saya} />
                        <p className='mt-2'>Fuad Azkia</p>
                        <p id='anak'>&nbsp;React Developer</p>
                    </div>
                    <div className="desc col fw-bold position-absolute">
                        &nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ullam ad, expedita aspernatur, temporibus nesciunt odio dolores facere, ea placeat dolor nostrum quis sit explicabo neque quia. Odio perspiciatis, minima laborum similique impedit, qui vero ea voluptate pariatur minus nesciunt?
                    </div>
                    <div className="desc1 col position-absolute fw-bold">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus sit recusandae, animi eligendi beatae in. Optio deleniti fugiat maxime sit vitae! Distinctio aspernatur voluptatum molestias deleniti ducimus, expedita non cumque ad iure reiciendis animi fuga doloribus est accusantium, ipsum fugit! Maxime molestias alias iure quis! Est ipsam, tempore neque facere iure ab atque, amet, quibusdam autem soluta vitae culpa libero.
                    </div>
                    <div className="mail">
                        <Button onClick={sendMail} variant='primary' style={{width:'10rem'}}>
                            <img id="icon" src={IconsMail}/>
                            &nbsp;&nbsp;Mail us</Button>
                    </div>
                    <a href="mailto:"></a>
                </div>

                    {/* LIST COMMENT */}
                    <Col id="for-comments">
                        <hr /><hr />
                        <div className="title-header">
                            <h1>List Comment</h1>
                        </div>
                        <div className="left-img-profile mb-5">
                            <img className="rounded-circle mt-5" src={profileFetchUp?.image ? `http://localhost:5000/uploads/` + profileFetchUp?.image : NoProfile} />
                        </div>
                        
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <div className="comment-here">
                                <input type="text" name="message" placeholder='&nbsp;&nbsp;What do you think ?'
                                onChange={handleOnChange} value={form?.message} autoComplete="off"/>
                                <div className="triangle-left"></div>
                            </div>

                            <div className="img-input">
                                <input name="image" className="text-black" type="text" value={form?.image} onChange={handleOnChange} hidden/>
                            </div>

                            <div className="name-input">
                                <input name="name" className="text-black" type="text" value={form?.name}
                                onChange={handleOnChange} hidden/>
                            </div>

                            <Button type="submit" variant="danger" hidden>
                                Send
                            </Button>
                        </form>

                        <div className="list-comments">

                            <Card id="card">
                                    {comments?.map((item, index) => (
                                <ListGroup key={index} variant="flush">
                                    <ListGroup.Item>                            
                                        <div className="img-datas col">
                                            <img className="rounded-circle" src={item?.image || NoProfile}  />
                                        </div>
                                        <div className="right-datas">
                                            <div className="col name-datas">
                                                <p>{item?.name}</p>
                                            </div>
                                            <div className="post-date-datas">
                                                <p>{Moment(item?.createdAt).format('LLLL')}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item id="cmnt">                            
                                        <div className="comment-datas row">
                                            <p className="col d-inline">
                                                {item?.message}
                                            </p>  
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                    ))}
                            </Card> 
                        </div>
                    </Col>
            </Row>
        </Container>
    )
}

export default AboutUs