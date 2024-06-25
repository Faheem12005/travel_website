const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
app.use(cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
const router = express.Router();
app.use('/api', router);

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const secretKey = process.env.SECRET_KEY;


const users = [{ id: 1, username: 'user', password: 'password' }];

const Auth = (req,res,next) => {
    const {username,password} = req.body;
    if (!username || !password){
        return res.status(400).send('Username and password are required');
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (!user){
        return res.status(401).send('Invalid username and password');
    }
    next();
};

//generate token
let access = null;
const getNewAccessToken = async () => {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        console.log(`Sending request for token with params ${params.toString()}`)
        const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Corrected Content-Type header
            }
        });
        console.log(`${response.data.access_token} recieved`);
        access = response.data.access_token;
        console.log(`${access} as access token has been set`);
    } catch (error) {
        console.error('Error fetching token:', error.response.data);
        throw new Error('Failed to retrieve access token');
    }
};
getNewAccessToken();
setInterval(getNewAccessToken,45*60*1000);


const getAmadeusToken = async (req,res,next) => {
    req.token = access;
    next();
}

const authJWT = (req,res,next) => {
    const token = req.cookies.authToken;
    if (!token){
        return res.status(401).send('Unauthorized');
    }
    try{
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch(error){
        return res.status(401).send('Invalid token');
    }
};


const flightRoutes = require('./routes/getFlights.js');

router.use('/flights', authJWT, getAmadeusToken, (req, res, next) => {
    console.log(req.body);
    flightRoutes(req,res,next);
});


router.post('/login', Auth, (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: false, secure: false, maxAge: 3600000 }); // Set secure: true in production
    res.json({ message: 'Logged in successfully' }); 
});

router.get('/search',async (req,res) => {
    const params = new URLSearchParams();
    params.append('subType','AIRPORT,CITY');
    params.append('keyword',req.query.keyword);
    params.append('view','LIGHT');
    try{
        const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
            headers: {
                'Authorization':`Bearer ${access}`
            },
            params
        });
        res.json(response.data);
    } catch(error){
        console.error('Error fetching flights:', error.response.data);
        throw new Error('Failed to retrieve flight names');
    }    
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
