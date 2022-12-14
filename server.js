const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const image = require('./controller/image');
const profile = require('./controller/profile');

const db = knex({
        client: 'pg',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
        }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send('It is Working')});

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.profile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running at ${process.env.PORT} port`);
})