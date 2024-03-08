// ItemContext.js
import React, { createContext, useState } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({}); // Add state for form data

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem, formData, setFormData }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
