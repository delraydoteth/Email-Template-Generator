// TemplateDisplay.js
import React from 'react';

const TemplateDisplay = ({ templateText, copyToClipboard }) => (
  <div className="template-display mb-3">
    <textarea
      className="form-control"
      value={templateText}
      readOnly
      rows="10"
    ></textarea>
    <button onClick={copyToClipboard} className="btn btn-primary mt-2">
      Copy to Clipboard
    </button>
  </div>
);

export default TemplateDisplay;
