const express = require('express');
const app = express();
const contactsRouter = require('./routes/contacts'); // Make sure this path is correct
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Use the contacts router
app.use('/contacts', contactsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
