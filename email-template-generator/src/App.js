import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CompanyNameInput from './components/CompanyNameInput';
import TemplateSearchInput from './components/TemplateSearchInput';
import TemplateDisplay from './components/TemplateDisplay';
import { customizeTemplate, copyToClipboard } from './components/utilities';
import templates from './templates.json'; // Assuming this is the correct path

function App() {
  const [companyName, setCompanyName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Initialize as null
  const [customizedText, setCustomizedText] = useState('');

  // Adjust the search function to directly update the selected template based on the search term
  useEffect(() => {
    const filteredTemplates = templates.filter(template =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Automatically select the first template that matches the search term, if any
    setSelectedTemplate(filteredTemplates.length > 0 ? filteredTemplates[0] : null);
  }, [searchTerm]); // Dependency on searchTerm ensures this runs whenever searchTerm changes

  // Update the customized text whenever the selected template or company name changes
  useEffect(() => {
    if (selectedTemplate && companyName) {
      const text = customizeTemplate(selectedTemplate.body, companyName);
      setCustomizedText(text);
    } else {
      setCustomizedText(''); // Reset the text if no template is selected or company name is empty
    }
  }, [selectedTemplate, companyName]);

  // Function to handle copying to clipboard
  const handleCopyToClipboard = () => {
    copyToClipboard(customizedText);
    // Here, you could add logic to notify the user that the text has been copied.
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <CompanyNameInput companyName={companyName} setCompanyName={setCompanyName} />
        {/* Now, TemplateSearchInput only needs setSearchTerm to update searchTerm state */}
        <TemplateSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} templates={templates} />
        <TemplateDisplay templateText={customizedText} copyToClipboard={handleCopyToClipboard} />
      </div>
    </div>
  );
}

export default App;
