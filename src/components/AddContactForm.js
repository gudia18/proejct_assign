import React, { useState } from 'react';
import { useContacts } from '../contexts/ContactsContext';
import { TextField, Button, Grid, Box } from '@mui/material';

const AddContactForm = () => {
  const { addContact } = useContacts();  // Accessing the context
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContact = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle
    };

    addContact(newContact);  // Add the contact to context

    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setCompany('');
    setJobTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddContactForm;
