document.getElementById('laden').addEventListener('click', async () => {
  const persona = document.getElementById('persona').value;
  const topic = document.getElementById('thema').value;
  const response = await fetch(`/api/chat?persona=${persona}&topic=${topic}`);
  const data = await response.json();
  document.getElementById('daten').textContent = JSON.stringify(data.message);
});

