import React, { createContext, useContext, useState } from 'react';

// Create the context
const ContactsContext = createContext();

// Create a provider for the context
export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, deleteContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

// Custom hook to use the Contacts context
export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
