const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

const UserRoute = require('./routes/UserRoutes')
const AuthRoute = require('./routes/AuthRoutes')
const ProductRoutes = require('./routes/productRoutes')
const OrderRoutes = require('./routes/orderRoutes')
const cors = require('cors')

mongoose.connect('mongodb+srv://april:nie@batch139.6f781.mongodb.net/Capstone2', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to DataBase`));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())

app.use('/api/user', UserRoute)
app.use('/api', AuthRoute)
app.use('/api', ProductRoutes)
app.use('/api/order', OrderRoutes)


app.listen(PORT, () => console.log(`Server running at port ${PORT}`))