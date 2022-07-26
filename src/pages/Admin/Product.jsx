import React, { useState, useEffect } from 'react';
import NavbarAdmin from "../../components/partials/NavbarAdmin"
import { Container, Row, Col , Button, Table, Alert } from "react-bootstrap"
import ShowMoreText from 'react-show-more-text';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from "react-query"
import RupiahFormat from "rupiah-format"
import { API } from "../../config/API"
import imgEmpty from "../../assets/img/empty.png"
import DeleteData from "../../components/modal/DeleteProduct"
import { useParams } from 'react-router-dom';


const AdminProduct = () => {
    const navigate = useNavigate()
    const [ message , setMessage ] = useState(null)

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { id } = useParams()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const title = "Product Admin"
    document.title = title

      // Create process for fetching products data from database with useQuery here ...
  let {data: products, refetch} = useQuery('productData', async () => {
    const response = await API.get('/products')
    return response.data.data
  })

//   Handle Delete
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

//   Handle update 
const handleUpdate = (id) => {
    navigate('/edit-product/' + id)
}
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/product/${id}`);
      console.log(response);
      if(response.data.status == "Success"){
        let alert = (
          <Alert variant="success" className='mt-2 position-absolute'
          style={{top:'7.5rem',
            left : '28rem'}}
          >{response.data.message}</Alert>
        )
          setMessage(alert)
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  });


  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);
    return (
        <>
        <NavbarAdmin title={title} />
  
        <Container className="py-5 mt-5">
          <Row style={{marginTop : '-2rem'}}>
            <Col xs="6">
              <div className="text-header-category"><h3>List Product</h3></div>
            </Col>
            <Col xs="6" className="text-end">
              <div className="success-delete mt-4">
              {message}
              </div>
              <Button
                variant="danger"
                style={{ width: '100px', marginTop:'1.5rem', marginBottom:'2rem'}}
                onClick={()=> navigate('/add-product')}
              >
                Add
              </Button>
            </Col>
            <Col xs="12">
              {products?.length !== 0 ? (
                <Table striped hover size="lg" variant="dark">
                  <thead>
                    <tr>
                      <th width="1%" className="text-center">
                        No
                      </th>
                      <th>Photo</th>
                      <th>Product Name</th>
                      <th>Product Desc</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((item, index) => (
                      <tr key={index}>
                        <td className="align-middle text-center">{index + 1}</td>
                        <td className="align-middle">
                          <img
                            src={item?.image}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                            }}
                            alt={item.name}
                          />
                        </td>
                        <td className="align-middle">{item.name}</td>
                        <td className="align-middle">
                          <ShowMoreText
                            /* Default options */
                            lines={1}
                            more="show"
                            less="hide"
                            className="content-css"
                            anchorClass="my-anchor-css-class"
                            expanded={false}
                            width={280}
                          >
                            {item.desc}
                          </ShowMoreText>
                        </td>
                        <td className="align-middle">
                          {RupiahFormat.convert(item.price)}
                        </td>
                        <td className="align-middle">{item.qty}</td>
                        <td className="align-middle">
                          <Button
                            onClick={() => {
                              handleUpdate(item.id);
                            }}
                            className="btn-sm btn-success me-2"
                            style={{ width: '135px' }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className="btn-sm btn-danger"
                            style={{ width: '135px' }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center pt-5">
                  <img
                    src={imgEmpty}
                    className="img-fluid"
                    style={{ width: '40%' }}
                    alt="empty"
                  />
                  <div className="mt-3">No data product</div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <DeleteData
          setConfirmDelete={setConfirmDelete}
          show={show}
          handleClose={handleClose}
        />
      </>
    )
}

export default AdminProduct