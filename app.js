const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiKey = '0d17460b1bddaef9af3c5a455d46b93f'; 

app.use(express.json());

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' 
            }
        });

        if (response.data.cod !== 200) {
            return res.status(400).json({ error: response.data.message });
        }

        const weatherData = response.data;
        res.json({
            location: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            wind_speed: weatherData.wind.speed,
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Weather information service is running on http://localhost:${port}`);
});
