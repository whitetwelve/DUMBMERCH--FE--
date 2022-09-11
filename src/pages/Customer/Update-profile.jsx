import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Navbar from "../../components/partials/NavbarCustomer"
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from "react-query"
import { API } from "../../config/API"
import { UserContext } from '../../context/user-context'
import blankImg from "../../assets/img/blank-profile.png"
import Login from '../Auth/Login'

const UpdateProfile = () => {

    const title = 'My Profile'
    document.title = title
    
    const moving = useNavigate()

    const { id } = useParams()

    const [state] = useContext(UserContext)

    const [profile, setProfile] = useState({})
    let [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        image : "",
        phone : "",
        gender : "",
        address : ""
     })

     const { data : fetchUpProfile, refetch } = useQuery('getDataProfile', async () => {
        const response = await API.get('/user/' + state.user.id)
        return response.data.data.users.profile
     })

    useEffect(() => {
        setPreview(fetchUpProfile?.image)
        setForm({
          phone : fetchUpProfile?.phone,
          gender : fetchUpProfile?.gender,
          address : fetchUpProfile?.address
        })
    },[fetchUpProfile])
    console.log(fetchUpProfile);
    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
        if(e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0])
                setPreview(url)
        }
    }
    
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            // Configuration
            const config = {
              method: "PATCH",
              headers: {
                'Content-type': 'multipart/form-data',
              },
            };
            const formProfile = new FormData()
            if (form?.image) {
              formProfile.set("image", form?.image[0].name);
            }
            formProfile.set('phone', form?.phone)
            formProfile.set('gender', form?.gender)
            formProfile.set('address', form?.address)

            const response = await API.patch(`/profile/${id}`, formProfile, config);
            console.log(response)
            moving("/profile")
        } catch (error) {
            console.log(error);
        }
    })

    console.log(preview);
    return (
        <Container>     
            <Navbar title={title}/>
            <Container className="py-5 mt-4">
        <Row style={{marginLeft:'-4.5rem', marginTop:'-2rem'}}>
          <Col xs="12">
            <div className="text-header-category mb-4 ">
                <p style={{fontSize:'28px'}}>Edit Profile</p>
                </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={`http://localhost:5000/uploads/` + preview || preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                      borderRadius:'5px'
                    }}
                  />
                </div>
                )}
                <Button variant="danger" style=
                {{
                position : 'absolute',
                left:'15rem',
                top : '10rem'
                }}>
                    <input
                        type="file"
                        id="upload"
                        name="image"
                        hidden
                        onChange={handleOnChange}
                        style={{cursor:'pointer'}}
                    />
                    <label for="upload" className="label-file-add-product"
                    style={{cursor:'pointer'}}>
                        Upload photo
                    </label>
              </Button>
              <input
                type="text"
                placeholder="Phone"
                autoComplete="off"
                name="phone"
                value={form?.phone}
                onChange={handleOnChange}
                className="input-edit-category mt-4 text-black"
              />
              <input className="input-edit-category mt-4 text-black" 
              placeholder="Gender" 
                name="gender" 
                  type="text" 
                    value={form?.gender}
                        onChange={handleOnChange}
                        >
                        </input>

              <textarea
                placeholder="Address"
                name="address"
                onChange={handleOnChange}
                value={form?.address}
                className="input-edit-category mt-4 text-black"
                style={{ height: "130px" }}
              ></textarea>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" style={{width:'76rem'}}>
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
        </Container>
    )
}

export default UpdateProfile

