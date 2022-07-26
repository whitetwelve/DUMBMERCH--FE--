import React, { useState, useEffect } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Table , Button, Alert } from "react-bootstrap"
import imgEmpty from "../../assets/img/empty.png"
import "../../assets/css/Categories.css"
import { API } from "../../config/API"
import { useQuery, useMutation } from 'react-query'; 
import { useNavigate } from "react-router-dom"
import DeleteCategory from "../../components/modal/DeleteProduct"

const Categories = () => {
    const title = `Categories`
    document.title = title
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {data: categories, refetch} = useQuery('categoryData', async () => {
        const response = await API.get('/categories')
        return response.data.category
      })

    const editCategory = (id) => {
        navigate(`/category/${id}`)
    } 

    const addCategory = () => {
        navigate(`/add-category`)
    }


  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/category/${id}`);  
      
      if(response.data.status == "Success"){
        let alert = (
          <Alert variant="success" className='py-2'>Kategori dengan id {id} berhasil dihapus!</Alert>
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
        <Container>
            <Navbar title={title}/>
            <Row>
          <Col className="mt-2">
            <div className="text-header-category mt-5 mb-4">
                    <p>List Category</p>
                </div>
          </Col>
          <Col className="text-end">
          <div className="success-delete mt-4">
            {message}
            </div>
            <Button
              className="mb-4"
              onClick={addCategory}
              variant="danger"
              style={{ width: '100px', 
                        position:'absolute',
                            top:'9rem',
                                left:'71.2rem'}}
            >
              Add
            </Button>
          </Col>
          <Col xs="12" >
            {categories?.length !== 0 ? (
              <Table striped hover size="lg" variant="dark" id="tables">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => (
                    <tr key={index}>
                      <td width="10%" className="align-middle">
                        {index + 1}
                      </td>
                      <td width="60%" className="align-middle">
                        {item.name}
                      </td>
                      <td width="30%">
                        <Button
                          onClick={() => {
                            editCategory(item.id);
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
                <DeleteCategory         
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}/>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: '40%' }}
                  alt="empty"
                />
                <div className="mt-3">No data category</div>
              </div>
            )}
          </Col>
        </Row>
        </Container>
    )
}

export default Categories