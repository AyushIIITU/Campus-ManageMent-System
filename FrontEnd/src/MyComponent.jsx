import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    // Execute the provided JavaScript code when the component mounts
    OnlineWebFonts_Com({
      'Id': '.div',
      'Data': __Animations['559477'],
    }).Play();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="div"></div>
  );
}

export default MyComponent;
