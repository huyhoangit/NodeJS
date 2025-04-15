require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');
const RetangleRoutes = require('./routes/rectangleRoute');
const circleKRoutes = require('./routes/circleKRoute');
const CircleK = require('./models/circleKModel');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    let sutdent = {
        name: 'John Doe',
        age: 20,
        hobbies: ['reading', 'gaming', 'coding']
    };
    res.render('index', { stdio: sutdent });
});
app.use('/retangle', RetangleRoutes);
app.use('/circle', circleKRoutes);
app.use('/products', productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

