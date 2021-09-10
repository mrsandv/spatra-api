const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

dotenv.config();

const applicantsRouter = require('./routes/applicants');
const usersRouter = require('./routes/users');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/applicants', applicantsRouter);

app.use('/api/users', usersRouter);

app.get('/api/version', (req, res) => {
	res.status(200).json({ version: '1.0' });
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
