require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rectangleRoute = require('./routes/rectangleRoute');
const circleKRoute = require('./routes/circleKRoute');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// MySQL Connection
// const mysqlConnection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

// mysqlConnection.connect(err => {
//     if (err) {
//         console.error('MySQL connection error:', err);
//     } else {
//         console.log('Connected to MySQL');
//     }
// });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', rectangleRoute);
app.use('/circleK', circleKRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

