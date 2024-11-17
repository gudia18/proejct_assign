const express = require('express');
const router = express.Router();
const db = require('../db');

// Validate the input data
function validateContactData({ firstName, lastName, email, phoneNumber, company, jobTitle }) {
  if (!email || !phoneNumber) {
    return { error: "Email and Phone Number are required" };
  }

  // Email validation (simple regex)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { error: "Invalid email format" };
  }

  // Phone number validation (must be numeric and 10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phoneNumber)) {
    return { error: "Phone number must be numeric and 10 digits" };
  }

  return null;  // No validation errors
}

// Add a new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  const validationError = validateContactData(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const [result] = await db.query(
      `INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phoneNumber, company, jobTitle]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const [contacts] = await db.query('SELECT * FROM contacts');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a contact by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [contact] = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);
    if (contact.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing contact
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  const validationError = validateContactData(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const [result] = await db.query(
      `UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ?, company = ?, job_title = ? 
       WHERE id = ?`,
      [firstName, lastName, email, phoneNumber, company, jobTitle, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      `DELETE FROM contacts WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
