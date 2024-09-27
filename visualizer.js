// const audios = [
//   'Murder Drones.m4a', 'UZI THE DRONE KILLER.m4a', 'The Plot.m4a', 
//   'The Plot 2_ This Time Its Personal.m4a', 'Click.m4a', 
//   'Murder Brings (Trailer Theme).m4a', 'Get Prommed _3.m4a', 
//   'The Knife Dance.m4a', 'OST - Disassembly Required.m4a', 
//   'Solver Uzi.m4a', 'Gamer Mom.m4a', 'YOURE FREAKIN GROUNDED.m4a', 
//   'Die Mad D.m4a', 'Uzi and N_ The Drone Killers.m4a', 
//   'BITE ME (feat. Zephyrianna).m4a', 'FOREVER.m4a', 'DXRTYTYPE - Bedrock.mp3',
//   'Molina Hey Kids (Feat. Late Verlane).mp3'
// ];

// let currentStyleIndex = 0;

// function getTrackName(fileName) {
//   if (fileName.endsWith('.m4a')) {
//     return fileName.replace('.m4a', '');
//   } else if (fileName.endsWith('.mp3')) {
//     return fileName.replace('.mp3', '');
//   } else if (fileName.endsWith('.wav')) {
//     return fileName.replace('.wav', '');
//   } else if (fileName.endsWith('.flac')) {
//     return fileName.replace('.flac', '');
//   } else if (fileName.endsWith('.aac')) {
//     return fileName.replace('.aac', '');
//   } else {
//     return fileName;
//   }
// }


// function createTrackList() {
//   const trackList = document.getElementById('trackList');

//   audios.forEach((audio, index) => {
//     const li = document.createElement('li');
//     const img = document.createElement('img');
//     img.src = `${getTrackName(audio)}.png`;
//     img.alt = `Cover for ${getTrackName(audio)}`;

//     const trackName = document.createElement('span');
//     trackName.textContent = getTrackName(audio);

//     const div1 = document.createElement('div');
//     div1.classList.add('divLi');

//     const trackDuration = document.createElement('span');
//     trackDuration.classList.add('duration');
//     trackDuration.textContent = 'Loading...';

//     const audioElement = new Audio(audio);
//     audioElement.addEventListener('loadedmetadata', () => {
//       const duration = formatTime(audioElement.duration);
//       trackDuration.textContent = duration;
//     });

//     li.appendChild(img);
//     li.appendChild(div1);
//     div1.appendChild(trackName);
//     div1.appendChild(trackDuration);

//     li.addEventListener('click', () => {
//       const Aud = document.getElementById('sours');
//       const audioPlayer = document.getElementById('audioPlayer');
//       Aud.setAttribute('src', audio);
//       audioPlayer.load();
//       audioPlayer.play();
//     });

//     trackList.appendChild(li);
//   });
// }

// function formatTime(timeInSeconds) {
//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = Math.floor(timeInSeconds % 60);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// window.addEventListener('DOMContentLoaded', createTrackList);
const audios = [
  'Murder Drones.m4a', 'UZI THE DRONE KILLER.m4a', 'The Plot.m4a', 
  'The Plot 2_ This Time Its Personal.m4a', 'Click.m4a', 
  'Murder Brings (Trailer Theme).m4a', 'Get Prommed _3.m4a', 
  'The Knife Dance.m4a', 'OST - Disassembly Required.m4a', 
  'Solver Uzi.m4a', 'Gamer Mom.m4a', 'YOURE FREAKIN GROUNDED.m4a', 
  'Die Mad D.m4a', 'Uzi and N_ The Drone Killers.m4a', 
  'BITE ME (feat. Zephyrianna).m4a', 'FOREVER.m4a', 'DXRTYTYPE - Bedrock.mp3',
  'Molina Hey Kids (Feat. Late Verlane).mp3'
];

function getTrackName(fileName) {
  if (fileName.endsWith('.m4a')) {
    return fileName.replace('.m4a', '');
  } else if (fileName.endsWith('.mp3')) {
    return fileName.replace('.mp3', '');
  } else if (fileName.endsWith('.wav')) {
    return fileName.replace('.wav', '');
  } else if (fileName.endsWith('.flac')) {
    return fileName.replace('.flac', '');
  } else if (fileName.endsWith('.aac')) {
    return fileName.replace('.aac', '');
  } else {
    return fileName;
  }
}

function createTrackList() {
  const trackList = document.getElementById('trackList');

  audios.forEach((audio) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = `${getTrackName(audio)}.png`;
    img.alt = `Cover for ${getTrackName(audio)}`;

    const trackName = document.createElement('span');
    trackName.textContent = getTrackName(audio);

    const div1 = document.createElement('div');
    div1.classList.add('divLi');

    const trackDuration = document.createElement('span');
    trackDuration.classList.add('duration');
    trackDuration.textContent = 'Loading...';

    // Загружаем метаданные без загрузки самого трека
    const audioElement = new Audio(audio);
    audioElement.preload = 'metadata'; // Загружаем только метаданные
    audioElement.addEventListener('loadedmetadata', () => {
      const duration = formatTime(audioElement.duration);
      trackDuration.textContent = duration; // Обновляем длительность трека
    });

    li.appendChild(img);
    li.appendChild(div1);
    div1.appendChild(trackName);
    div1.appendChild(trackDuration);

    // Логика загрузки аудиофайла только при клике
    li.addEventListener('click', () => {
      const Aud = document.getElementById('sours');
      const audioPlayer = document.getElementById('audioPlayer');
      Aud.setAttribute('src', audio); // Загружаем сам трек
      audioPlayer.load();
      audioPlayer.play();
    });

    trackList.appendChild(li);
  });
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

window.addEventListener('DOMContentLoaded', createTrackList);


window.onload = function() {
  const audio = document.getElementById('audioPlayer');
  const canvas = document.getElementById('visualizer');
  const canvasMirror = document.getElementById('visualizerMirror');
  const canvasCtx = canvas.getContext('2d');
  const canvasMirrorCtx = canvasMirror.getContext('2d');

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 2048 ;
  // 32 64 128 256 512 1024 2048 4096 8192 16384 32768
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    canvasMirrorCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasMirrorCtx.fillRect(0, 0, canvasMirror.width, canvasMirror.height);

    const barWidth = (canvas.width / bufferLength) * 1;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      const red = 124;
      const green = 10;
      const blue = 200;

      canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
      canvasCtx.fillRect(x, canvas.height - barHeight / 0.2, barWidth, barHeight / 0.1);

      // Зеркальный канвас: меняем вертикальное направление
      canvasMirrorCtx.save();
      canvasMirrorCtx.scale(1, -1);  // Отзеркаливаем по вертикали
      canvasMirrorCtx.fillStyle = `rgb(${red},${green},${blue})`;
      canvasMirrorCtx.fillRect(x, -barHeight / 0.2, barWidth, barHeight / 0.1);
      canvasMirrorCtx.restore();

      x += barWidth + 0.6;
    }
  }

  audio.onplay = function() {
    audioContext.resume();
    draw();
  };
};
