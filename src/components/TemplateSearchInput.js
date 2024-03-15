import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const TemplateSearchInput = ({ searchTerm, setSearchTerm, templates, setSelectedTemplate, selectedTemplate }) => {
  // State to control visibility of the ListGroup (dropdown)
  const [showDropdown, setShowDropdown] = useState(true);

  const filterTemplates = (term) => templates.filter(template =>
    template.title.toLowerCase().includes(term.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true); // Show dropdown when user edits search term
  };

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    setSearchTerm(template.title); // Update search bar with the selected template's name
    setShowDropdown(false); // Hide dropdown after selection
    // Optionally, show a confirmation message to the user here
  };

  return (
    <div className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search Templates"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && showDropdown && (
        <ListGroup style={{ maxHeight: '8rem', overflowY: 'scroll' }}>
          {filterTemplates(searchTerm).map((template) => (
            <ListGroup.Item 
              key={template.id} 
              action 
              onClick={() => handleSelect(template)}
            >
              {template.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default TemplateSearchInput;
