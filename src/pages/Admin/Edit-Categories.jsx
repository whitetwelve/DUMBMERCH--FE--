import React, { useState } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Button } from 'react-bootstrap'
import "../../assets/css/Categories.css"
import { useQuery, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from "../../config/API"


const EditCategory = () => {
    const title = 'Edit Category'
    document.title = title

    const [category, setCategory] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const { data : fetchUpCategory, refetch } = useQuery("Kategori", async () => {
        const response = await API.get('/category/' + id)
        setCategory(response.data.detailCategory)
    })

    const ChangeFormCategory = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
          });
    }

    
  const submitFormCategory = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);
      
      console.log(response);
      navigate('/categories');
    } catch (error) {
      console.log(error);
    }
  });
    return (
        <Container>
            <Navbar title={title}/>
            <Row style={{marginLeft : '-4rem',
                            marginTop : '2rem'}}>
          <Col xs="12">
            <div className="text-header-category mb-4">
                    <p id="editca">Edit Category</p>
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => submitFormCategory.mutate(e)} >
              <input
                onChange={ChangeFormCategory}
                value={category.name}
                placeholder="category"
                className="input-edit-category mt-4 text-black"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
        </Container>
    )
}

export default EditCategory