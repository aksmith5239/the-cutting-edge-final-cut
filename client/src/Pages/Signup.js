import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Form, Card, Row, Col } from "react-bootstrap";
// import heroImage from "../assets/hero-image.jpeg";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
  // added to make sure passoword length < 5 or error
    if(formState.password.length < 5) {
      console.log('here', formState.password.length)
      setError('Password length must be greater than 5');
      return;
  }
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <Row>
        <Col lg={true}>
      <Link to="/login">
        ← Go to Login
      </Link>
      
      
      
      <Card className='lg-card'>
        <Card.Header>
        <h2><strong>Signup</strong></h2>
        </Card.Header>
         
          <Card.Body>
        <form onSubmit={handleFormSubmit}>
        <Form.Group>
        <div className="flex-row space-between my-2">
           <div className="error">{error}</div>
        </div>
        
          <div className="flex-row space-between my-2">
          <Form.Label htmlFor="firstName">First Name:</Form.Label>
          <Form.Control
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        </Form.Group>
        <Form.Group>
        <div className="flex-row space-between my-2">
          <Form.Label htmlFor="lastName">Last Name:</Form.Label>
          <Form.Control
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        </Form.Group>
        <Form.Group>
        <div className="flex-row space-between my-2">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        </Form.Group>
        <div className="flex-row space-between my-2">
          <Form.Label htmlFor="pwd">Password:</Form.Label>
          <Form.Control
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <Form.Group>
        <div className="flex-row flex-end">
        
          <button type="submit">
            Submit
          </button>
        </div>
        </Form.Group>
      </form>
      </Card.Body>
      <div>
      <img src="../images/hero-image.jpeg" className='heroImage' alt='scissors and comb' />
      </div>
      </Card>
      
      
      </Col>
      </Row>
    </div>
   
  );

}

export default Signup;
