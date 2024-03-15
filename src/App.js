import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import CompanyNameInput from "./components/CompanyNameInput";
import TemplateSearchInput from "./components/TemplateSearchInput";
import TemplateDisplay from "./components/TemplateDisplay";
import { customizeTemplate, copyToClipboard } from "./components/utilities";
import templates from "./templates.json"; // Assuming this is the correct path

function App() {
  const [companyName, setCompanyName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Initialize as null
  const [customizedText, setCustomizedText] = useState("");

  // Adjust the search function to directly update the selected template based on the search term
  useEffect(() => {
    const filteredTemplates = templates.filter((template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Automatically select the first template that matches the search term, if any
    setSelectedTemplate(
      filteredTemplates.length > 0 ? filteredTemplates[0] : null
    );
  }, [searchTerm]); // Dependency on searchTerm ensures this runs whenever searchTerm changes

  useEffect(() => {
    let newText = "";
    // Check if either selectedTemplate or companyName exists
    if (selectedTemplate || companyName) {
      // If one is missing, consider how to handle customization partially
      // For instance, if selectedTemplate is missing, you might not proceed with customization
      // Similarly, if companyName is missing, decide how to handle the template
      newText = selectedTemplate && companyName
        ? customizeTemplate(selectedTemplate.body, companyName) // Both are present
        : selectedTemplate // Only template is present, without customization
        ? selectedTemplate.body // Use template body without customization
        : "Please select a template and enter a company name."; // Prompt for missing info
    }
    // Update the state
    setCustomizedText(newText);
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
        <CompanyNameInput
          companyName={companyName}
          setCompanyName={setCompanyName}
        />
        {/* Now, TemplateSearchInput only needs setSearchTerm to update searchTerm state */}
        <TemplateSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          templates={templates}
          setSelectedTemplate={setSelectedTemplate} // Ensure this prop is passed
        />
        <TemplateDisplay
          templateText={customizedText}
        />
      </div>
    </div>
  );
}

export default App;
