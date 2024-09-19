const express = require('express');
const axios = require('axios');
const path = require('path');



const app = express();
const port = 8000;


// Tu API Key de OpenAI
const apiKey = '';

// Middleware para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ruta para manejar las solicitudes a la API de OpenAI
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'Por favor, responde siempre en español.' },
                { role: 'user', content: message }
            ],
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const reply = response.data.choices[0].message.content.trim();
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

let users = [
    { username: 'usuario', password: 'contraseña', email: 'usuario@example.com' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'OK' });
    } else {
        res.json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const userExists = users.some(u => u.username === username);
    if (userExists) {
        res.json({ message: 'El nombre de usuario ya está en uso' });
    } else {
        users.push({ username, password, email });
        res.json({ message: 'Usuario registrado exitosamente' });
    }
});



// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
