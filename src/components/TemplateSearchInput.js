import React from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const TemplateSearchInput = ({ searchTerm, setSearchTerm, templates, setSelectedTemplate }) => {
  
  console.log("Templates received in TemplateSearchInput:", templates); // Log the templates received

  // Inline function for filtering templates based on the search term
  const filterTemplates = (term) => {
    const filtered = templates.filter(template =>
      template.title.toLowerCase().includes(term.toLowerCase())
    );
    console.log(`Filtering templates with term "${term}", found ${filtered.length} matches.`); // Log filtering action
    return filtered;
  };

  const handleChange = (e) => {
    console.log('Handling change event in search input.'); // Initial log for handling change
    const term = e.target.value;
    console.log(`Search term entered: ${term}`); // Log the current search term
    setSearchTerm(term);
    // Optional: Log the action of updating the searchTerm state
    console.log(`Search term state updated to: ${term}`);
  };

  return (
    <div className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search Templates"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <ListGroup>
          {filterTemplates(searchTerm).map((template) => (
            <ListGroup.Item 
              key={template.id} 
              action 
              onClick={() => {
                console.log(`Template selected: ${template.title}`); // Log which template was selected
                setSelectedTemplate(template);
              }}
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
