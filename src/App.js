import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CompanyNameInput from "./components/CompanyNameInput";
import TemplateSearchInput from "./components/TemplateSearchInput";
import TemplateDisplay from "./components/TemplateDisplay";
import SubjectLine from "./components/SubjectLine"; // Import the SubjectLine component
import { customizeTemplate, copyToClipboard } from "./components/utilities";
import templates from "./templates.json";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizedText, setCustomizedText] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);

  const updateCustomizedText = (template) => {
    if (template && companyName) {
      const newText = customizeTemplate(template.body, companyName);
      setCustomizedText(newText);
    } else if (template) {
      setCustomizedText(template.body);
    }
  };

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
    updateCustomizedText(template);
    setSearchTerm(template.title);
    setShowDropdown(false);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    setShowDropdown(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <CompanyNameInput
          companyName={companyName}
          setCompanyName={setCompanyName}
        />
        <TemplateSearchInput
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
          templates={templates}
          setSelectedTemplate={handleTemplateSelection}
          showDropdown={showDropdown}
        />
        <SubjectLine companyName={companyName} /> {/* Display the SubjectLine component */}

        <TemplateDisplay
          templateText={customizedText}
        />
      </div>
    </div>
  );
}

export default App;
