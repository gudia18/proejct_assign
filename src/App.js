import React from 'react';
import { ContactsProvider } from './contexts/ContactsContext';
import AddContactForm from './components/AddContactForm';
import ContactsTable from './components/ContactsTable';

const App = () => {
  return (
    <ContactsProvider>
      <AddContactForm />
      <ContactsTable />
    </ContactsProvider>
  );
};

export default App;
