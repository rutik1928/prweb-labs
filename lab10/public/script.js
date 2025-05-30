document.addEventListener('DOMContentLoaded', function() {
    // Если мы на главной странице
    if (document.getElementById('toolsForm')) {
        const form = document.getElementById('toolsForm');
        const lastOriginalList = document.getElementById('lastOriginalList');
        
        // Загружаем последний введенный список
        fetch('/api/original')
            .then(response => response.json())
            .then(data => {
                if (data.tools && data.tools.length > 0) {
                    lastOriginalList.innerHTML = data.tools.map(tool => 
                        `<li>${tool}</li>`
                    ).join('');
                } else {
                    document.getElementById('originalList').style.display = 'none';
                }
            });
        
        // Обработка формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const toolsInput = document.getElementById('toolsInput').value;
            
            fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `tools=${encodeURIComponent(toolsInput)}`
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            });
        });
    }
    
    // Если мы на странице результата
    if (document.getElementById('originalList') && document.getElementById('processedList')) {
        const originalList = document.getElementById('originalList');
        const processedList = document.getElementById('processedList');
        
        // Загружаем данные из файлов
        Promise.all([
            fetch('/api/original').then(res => res.json()),
            fetch('/api/processed').then(res => res.json())
        ])
        .then(([originalData, processedData]) => {
            if (originalData.tools && originalData.tools.length > 0) {
                originalList.innerHTML = originalData.tools.map(tool => 
                    `<li>${tool}</li>`
                ).join('');
            } else {
                document.querySelector('.list-box:first-child').innerHTML = 
                    '<p>Нет данных об исходном списке</p>';
            }
            
            if (processedData.tools && processedData.tools.length > 0) {
                processedList.innerHTML = processedData.tools.map(tool => 
                    `<li>${tool}</li>`
                ).join('');
            } else {
                document.querySelector('.list-box:last-child').innerHTML = 
                    '<p>Нет данных об обработанном списке</p>';
            }
        });
    }
});