const express = require('express');
const connectionToDB = require('./config/db');

const app = express();

//Connection to database
connectionToDB();

//initialise middleware
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API is ready'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/blogs', require('./routes/api/blogs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
