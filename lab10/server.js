const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Пути к файлам
const originalFilePath = path.join(__dirname, 'data', 'original.txt');
const processedFilePath = path.join(__dirname, 'data', 'processed.txt');

// Проверяем и создаем файлы, если их нет
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(originalFilePath)) {
    fs.writeFileSync(originalFilePath, '');
}
if (!fs.existsSync(processedFilePath)) {
    fs.writeFileSync(processedFilePath, '');
}

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка формы
app.post('/process', (req, res) => {
    const inputText = req.body.tools;
    
    // Разделяем текст на массив (удаляем пустые строки и лишние пробелы)
    const originalTools = inputText.split('\n')
        .map(tool => tool.trim())
        .filter(tool => tool.length > 0);
    
    // Обрабатываем массив
    const processedTools = originalTools.map(tool => {
        return tool.charAt(0).toUpperCase() + tool.slice(1).toLowerCase();
    }).sort();
    
    // Записываем в файлы
    fs.writeFileSync(originalFilePath, originalTools.join('\n'), 'utf-8');
    fs.writeFileSync(processedFilePath, processedTools.join('\n'), 'utf-8');
    
    // Перенаправляем на страницу результата
    res.redirect('/result');
});

// Страница результата
app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

// API для получения данных из файлов
app.get('/api/original', (req, res) => {
    fs.readFile(originalFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json({ tools: data.split('\n').filter(tool => tool.length > 0) });
    });
});

app.get('/api/processed', (req, res) => {
    fs.readFile(processedFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json({ tools: data.split('\n').filter(tool => tool.length > 0) });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});