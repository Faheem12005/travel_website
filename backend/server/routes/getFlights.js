const express = require('express');
const axios = require('axios');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const token = req.token; // Token stored here
        const params = {
            originLocationCode: req.body.originLocationCode,
            destinationLocationCode: req.body.destinationLocationCode,
            departureDate: req.body.departureDate,
            adults: req.body.adults,
            nonStop: req.body.nonStop || null
        };

        console.log(`Sending GET request with data: ${params.toString()}`);
        const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params
        });
        console.log('Retrieved flights offers succesfully');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to get flight offers');
    }
});

router.post('/offer-price', async(req,res) => {
    const token = req.token;
    console.log('request body');
    console.log(req.body);
    const data = {
            "data" : {
                "type" : "flight-offers-pricing",
                "flightOffers" : [req.body.offer]
            }
    }
    try{
        const response = await axios.post('https://test.api.amadeus.com/v1/shopping/flight-offers/pricing',data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.status){
            res.status(500).send('Failed to get proper response from flight pricing');
        }
        console.log(`Retrieved flight price succesfully`);
        res.json(response.data);
    } catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to get flight prices');
    }
});

module.exports = router;
