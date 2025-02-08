require('dotenv').config(); // Esto carga el contenido de .env

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Asegúrate de usar process.env

console.log("Clave API cargada:", GOOGLE_API_KEY); // Esto te ayudará a verificar que la clave se esté leyendo correctamente

const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

app.post('/api/gemini', async (req, res) => {
    try {
        const response = await axios.post(API_REQUEST_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error en la llamada a Gemini:", error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Error al llamar a Gemini', 
            details: error.response?.data || error.message 
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
