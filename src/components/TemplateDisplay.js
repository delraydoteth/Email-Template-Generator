import React, { useState, useEffect } from 'react';
import { copyToClipboard } from './utilities'; // Adjust the path as necessary

const TemplateDisplay = ({ templateText }) => {
  const [editableText, setEditableText] = useState(templateText);

  useEffect(() => {
    setEditableText(templateText);
  }, [templateText]);

  const handleTextChange = (e) => {
    setEditableText(e.target.value);
  };

  // Use the copyToClipboard utility directly with the current state
  const handleCopy = () => {
    copyToClipboard(editableText);
  };

  return (
    <div className="template-display mb-3">
      <textarea
        className="form-control"
        value={editableText}
        onChange={handleTextChange}
        rows="10"
      ></textarea>
      <button onClick={handleCopy} className="btn btn-primary mt-2">
        Copy to Clipboard
      </button>
    </div>
  );
};

export default TemplateDisplay;
