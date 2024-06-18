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

module.exports = router;
