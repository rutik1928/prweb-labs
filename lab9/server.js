const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Массив инструментов с возможными ошибками в регистре
const tools = [
    'Молоток',
    'отвертка',
    'Гаечный ключ',
    'плоскогубцы',
    'Ножовка',
    'рулетка'
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/process', (req, res) => {
    // Обработка массива
    const processedTools = tools.map(tool => {
        return tool.charAt(0).toUpperCase() + tool.slice(1).toLowerCase();
    }).sort();
    
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});