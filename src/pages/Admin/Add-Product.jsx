import React, { useState } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/API"
import { useMutation } from "react-query"

const AddProduct = () => {
    const title = "Add Product"
    document.title = title


    let navigate = useNavigate();

    const [message , setMessage] = useState(null)
    const [preview, setPreview] = useState(null); //For image preview
  
    const [form, setForm] = useState({
      image: '',
      name: '',
      desc: '',
      price: '',
      qty: '',
    }); 
  

    // Handle change data on form
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      });
  
      // Create image url for preview
      if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };
  
        // Store data with FormData as object
        const formData = new FormData();
        formData.set('image', form.image[0], form.image[0].name);
        formData.set('name', form.name);
        formData.set('desc', form.desc);
        formData.set('price', form.price);
        formData.set('qty', form.qty);
  
        // Insert product data
        const response = await API.post('/product', formData, config);
        console.log(response);
  
    alert('Produk berhasil ditambahkan!')
        navigate('/product-admin');
      } catch (error) {
        console.log(error);
      }
    });
    return (
        <>
        <Navbar title={title} />
        <Container className="py-5">
          <Row style={{marginLeft:'-4rem'}}>
            <Col xs="12">
              <div className="text-header-category mb-4"><h3>Add Product</h3></div>
            </Col>
            <Col xs="12">
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                {preview && (
                  <div>
                    <img
                    className="mb-2"
                      src={preview}
                      style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                        objectFit: 'cover',
                      }}
                      alt={preview}
                    />
                  </div>
                )}
                <Button variant="danger" className="mt-3" style={{
                }}>
                    <input
                    type="file"
                    id="upload"
                    name="image"
                    hidden
                    onChange={handleChange}
                    />
                    <label for="upload" className="label-file-add-product">
                    Upload file
                    </label>
                </Button>
                <input
                  type="text"
                  placeholder="Product Name"
                  autoComplete="off"
                  name="name"
                  onChange={handleChange}
                  className="input-edit-category mt-4 text-black"
                />
                <textarea
                  placeholder="Product Desc"
                  name="desc"
                  onChange={handleChange}
                  className="input-edit-category mt-4 text-black"
                  style={{ height: '130px' }}
                ></textarea>
                <input
                  type="number"
                  placeholder="Price (Rp.)"
                  name="price"
                  onChange={handleChange}
                  className="input-edit-category mt-4 text-black"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  name="qty"
                  onChange={handleChange}
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
      </>
    )
}

export default AddProduct
