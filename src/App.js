import React, { useState } from "react";
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
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizedText, setCustomizedText] = useState("");

  // Removed useEffect for automatically updating customizedText upon template or company name change

  // Function to manually update customized text when a template is selected
  const updateCustomizedText = (template) => {
    // Check if companyName is provided for customization
    if (template && companyName) {
      // Customize template with companyName
      const newText = customizeTemplate(template.body, companyName);
      setCustomizedText(newText);
    } else if (template) {
      // Use template body directly if companyName is not provided
      setCustomizedText(template.body);
    }
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
          setSearchTerm={setSearchTerm}
          templates={templates}
          setSelectedTemplate={(template) => {
            setSelectedTemplate(template);
            updateCustomizedText(template); // Update customized text only when template is clicked
          }}
        />
        <TemplateDisplay
          templateText={customizedText}
        />
      </div>
    </div>
  );
}

export default App;
