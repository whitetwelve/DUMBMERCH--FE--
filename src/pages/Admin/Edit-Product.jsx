import React, { useEffect, useState } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Button, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from "../../config/API"
import empty from "../../assets/img/empty.png"
const EditProduct = () => {
    const title = "Edit Product"
    document.title = title 

    const moving = useNavigate()

    const { id } = useParams()
    const [preview, setPreview] = useState(null);
    const [product, setProduct] = useState({});

    const [form, setForm] = useState({
        image : "",
        name : "",
        desc : "",
        price : "",
        qty : ""
    })

    const { data : productData, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id)
        console.log(response);
        return response.data.data
    })

    useEffect(() => {
        if(productData){
            setPreview(productData?.image)
            setForm({
                ...form,
                name : productData?.name,
                desc : productData?.desc,
                price : productData?.price,
                qty : productData?.qty
            })
        }
    },[productData])

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

    
        // Store data with FormData as object
          const formData = new FormData();
          if (form?.image) {
              formData.set("image", form?.image[0].name);
            }
          formData.set('name', form?.name);
          formData.set('desc', form?.desc);
          formData.set('price', form?.price);
          formData.set('qty', form?.qty);
        
       // Configuration
        const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };

        // Insert product data
        const response = await API.patch(`/product/${id}`,formData,config);    
        console.log(response.data.data);
        moving('/product-admin');
      } catch (error) {
        console.log(error);
      }
    });
    return (
        <Container className="py-5">
            <Navbar title={title}/>
        <Row style={{marginLeft:'-4rem'}}>
          <Col xs="12">
            <div className="text-header-category mb-4">
                <h3>Update Product</h3>
            </div>
          </Col>
          <Col xs="12">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    className="mb-3"
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <Button variant="danger" className="mt-2">
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
                autoComplete='off'
                name="name"
                onChange={handleChange}
                value={form?.name}
                className="input-edit-category mt-4 text-black"
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                value={form?.desc}
                className="input-edit-category mt-4 text-black"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                value={form?.price}
                className="input-edit-category mt-4 text-black"
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                value={form?.qty}
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

export default EditProduct