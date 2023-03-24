import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SaveFormModal(props) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Save the data
      props.saveData(formData);
      // Close the modal
      props.onClose();
    };

    const modalStyle = {
        display: props.show ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        backgroundColor: 'white',
        width: '50%', // Set the width of the modal here
        height: 'auto',
        overflow: 'auto',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    };  


    return (
      <div style = {modalStyle}>
        <Form onSubmit={handleSubmit}>
            
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" placeholder=" " name="id" value = {formData.id || ''} onChange={handleInputChange} />
            
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder=" " name="title" value = {formData.title || ''} onChange={handleInputChange} />

            <Form.Label>Category </Form.Label>
            <Form.Control type="text" placeholder=" " name="category" value = {formData.category || ''} onChange={handleInputChange} />

            <Form.Label>domain </Form.Label>
            <Form.Control type="text" placeholder=" Domain" name="domain"  onChange={handleInputChange} />

            <Form.Label>Created Date </Form.Label>
            <Form.Control type="text" placeholder=" " name="createdOn"  onChange={handleInputChange} />

            <Form.Label>ValidUntil </Form.Label>
            <Form.Control type="text" placeholder=" " name="validUntil"  onChange={handleInputChange} />

            <Form.Label> Entries</Form.Label>
            <Form.Control type="text" placeholder=" " name="entries"  onChange={handleInputChange} />

            <Button variant="primary" style={{marginTop:"30px"}}  type="submit">
                Submit
            </Button>


        </Form>
       
      </div>
    );
  };
  export default SaveFormModal ;