document
  .getElementById('laden')
  .addEventListener('click', async () => {
    const persona = document.getElementById('persona').value;
    const topic = document.getElementById('thema').value;
    const response = await fetch(
      `/api/chat?persona=${persona}&topic=${topic}`
    );
    const data = await response.json();
    document.getElementById('daten').textContent = JSON.stringify(
      data.message
    );
    document.getElementById('play').style.display = 'block';
  });

document
  .getElementById('play')
  .addEventListener('click', async () => {
    const text = document.getElementById('daten').textContent;
    const persona = document.getElementById('persona').value;
    let voice = 'onyx';
    if (persona === 'yoda') voice = 'fable';
    if (persona === 'oracle') voice = 'nova';
    const audioPlayer = document.getElementById('audioPlayer');
    const response = await fetch(
      `/api/speech?text=${text}&voice=${voice}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    audioPlayer.style.display = 'block';
    audioPlayer.src = url;
    audioPlayer.play().catch((error) => {
      console.error('Fehler beim Abspielen des Audios:', error);
    });
  });
