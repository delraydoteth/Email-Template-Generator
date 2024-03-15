// OutlookButton.js
import React from 'react';

const OutlookButton = ({ subject, body }) => {
  // Encode subject and body to be URL-safe
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // Create mailto link
  const mailtoLink = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;

  return (
    <a href={mailtoLink} className="btn btn-primary mt-3">Open in Outlook</a>
  );
};

export default OutlookButton;
