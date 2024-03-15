import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CompanyNameInput from "./components/CompanyNameInput";
import TemplateSearchInput from "./components/TemplateSearchInput";
import TemplateDisplay from "./components/TemplateDisplay";
import SubjectLine from "./components/SubjectLine";
import OutlookButton from "./components/OutlookButton";
import { customizeTemplate } from "./components/utilities";
import templates from "./templates.json";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizedText, setCustomizedText] = useState("");
  const [emailBody, setEmailBody] = useState(""); // State for holding the edited text for the email body.

  const updateCustomizedText = (template) => {
    if (template && companyName) {
      const newText = customizeTemplate(template.body, companyName);
      setCustomizedText(newText);
      setEmailBody(newText); // Also update emailBody with the new text.
    } else if (template) {
      setCustomizedText(template.body);
      setEmailBody(template.body); // Also update emailBody with the template body.
    }
  };

  // This function is called when text changes in TemplateDisplay.
  const handleEmailBodyChange = (newText) => {
    setEmailBody(newText); // Update emailBody state with the edited text.
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <CompanyNameInput
          companyName={companyName}
          setCompanyName={setCompanyName}
        />
        <SubjectLine companyName={companyName} />
        <TemplateSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          templates={templates}
          setSelectedTemplate={(template) => {
            setSelectedTemplate(template);
            updateCustomizedText(template);
            setSearchTerm(template.title); // This ensures the search bar updates with the template's title.
          }}
        />
        <TemplateDisplay
          templateText={customizedText} // Pass the initial or updated template text.
          onTextChange={handleEmailBodyChange} // Pass the function to handle text changes.
        />
        <OutlookButton 
          subject={`${companyName.toUpperCase()} - White Cap Credit Application - Additional Information Required`}
          body={emailBody} // Use the latest email body text, including any edits.
        />
      </div>
    </div>
  );
}

export default App;
