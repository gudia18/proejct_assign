import axios from 'axios';

const apiUrl = 'http://localhost:3000/contacts'; // Update this with the backend URL

const fetchContacts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

const addContact = async (contact) => {
  try {
    const response = await axios.post(apiUrl, contact);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

const deleteContact = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

export { fetchContacts, addContact, deleteContact };
