import React from 'react';
import Form from 'react-bootstrap/Form';

const CompanyNameInput = ({ companyName, setCompanyName }) => (

  <Form className="mb-3" controlid="companyName">
    <Form.Label>Company Name</Form.Label>
    <Form.Control 
      type="text" 
      placeholder="Enter company name" 
      value={companyName} 
      onChange={(e) => setCompanyName(e.target.value)} 
    />
  </Form>
  
);

export default CompanyNameInput;
