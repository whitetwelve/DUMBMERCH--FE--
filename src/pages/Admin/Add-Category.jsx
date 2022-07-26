import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Container, Row, Col, Button } from "react-bootstrap"
import Navbar from "../../components/partials/NavbarAdmin"
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/API"
import "../../assets/css/Categories.css"

const AddCategory = () => {
    const title = 'Add Category'
    document.title = title 

    const moving = useNavigate()
    const [category, setCategory] = useState({})

    const handleChange = (e) => {
        setCategory(e.target.value);
      };
    
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Configuration
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
    
          // Data body
          const body = JSON.stringify({name : category});
    
          // Insert category data
          const response = await API.post('/category', body, config);
          moving('/categories');
        } catch (error) {
          console.log(error);
        }
      });
    return (
        <Container>
            <Navbar title={title}/>
            <Row style={{marginLeft : '-3.7rem',
                            marginTop : '2rem'}}>
          <Col xs="12">
            <div className="text-header-category mb-4 mt-5">
                <p id="addca">Add Category</p>
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                placeholder="Input category here .."
                name="category"
                className="input-edit-category mt-4 text-black"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
        </Container>
    )
}

export default AddCategory