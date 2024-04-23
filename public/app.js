document.getElementById('laden').addEventListener('click', async () => {
    const response = await fetch('/api/chat');
    const data = await response.json();
    document.getElementById('daten').textContent = JSON.stringify(data);
});

