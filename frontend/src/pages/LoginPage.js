import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';

function LoginPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleRegisterModalClose = () => setShowRegisterModal(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);

  const handleForgotPasswordModalClose = () => setShowForgotPasswordModal(false);
  const handleForgotPasswordModalShow = () => setShowForgotPasswordModal(true);

  return (
    <Container fluid>
      <Row>
        <Col sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="cat fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Incident Management System</span>
          </div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            <p className="small mb-3 ms-5"><a class="text-muted" href="#!" onClick={handleForgotPasswordModalShow}>Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a class="link-info" onClick={handleRegisterModalShow}>Register here</a></p>
          </div>
        </Col>
        <Col sm='6' className='d-none d-sm-block px-0'>
          <img src="https://files.oaiusercontent.com/file-pWX7xHXbqovIQevl0TtmgXUq?se=2024-06-12T02%3A33%3A47Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D7ec40371-94ea-444a-992d-723dfee1c1c1.webp&sig=UVZibx6GZebNdVqjrQTxAjdc3uHyts2DfcAYWjnfhQg%3D"
            alt="Login image" className="w-100 h-100" style={{objectFit: 'cover', objectPosition: 'center'}} />
        </Col>
      </Row>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={handleRegisterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form for creating account */}
          <p>Form for creating account goes here...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterModalClose}>
            Close
          </Button>
          {/* Add logic to handle account creation */}
          <Button variant="primary" onClick={handleRegisterModalClose}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={handleForgotPasswordModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form for resetting password */}
          <p>Form for resetting password goes here...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleForgotPasswordModalClose}>
            Close
          </Button>
          {/* Add logic to handle password reset */}
          <Button variant="primary" onClick={handleForgotPasswordModalClose}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginPage;