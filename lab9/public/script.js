document.addEventListener('DOMContentLoaded', function() {
    const tools = [
        'Молоток',
        'отвертка',
        'Гаечный ключ',
        'плоскогубцы',
        'Ножовка',
        'рулетка'
    ];

    // Если мы на первой странице
    if (document.getElementById('toolsList')) {
        const list = document.getElementById('toolsList');
        tools.forEach(tool => {
            const li = document.createElement('li');
            li.textContent = tool;
            list.appendChild(li);
        });
    }

    // Если мы на второй странице
    if (document.getElementById('processedList')) {
        const processedTools = tools.map(tool => {
            return tool.charAt(0).toUpperCase() + tool.slice(1).toLowerCase();
        }).sort();
        
        const list = document.getElementById('processedList');
        processedTools.forEach(tool => {
            const li = document.createElement('li');
            li.textContent = tool;
            list.appendChild(li);
        });
    }
});