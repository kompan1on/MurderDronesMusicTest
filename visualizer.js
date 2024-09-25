// window.onload = function() {
//     const audioInput1 = document.getElementById('audio1');
//     const audioInput2 = document.getElementById('audio2');
//     const playButton = document.getElementById('play');
//     const masterTimeControl = document.getElementById('masterTime');
//     const masterVolumeControl = document.getElementById('masterVolume');
//     const timeLabel = document.getElementById('timeLabel');
//     const canvas = document.getElementById('visualizer');
//     const canvasCtx = canvas.getContext('2d');
  
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const analyser = audioContext.createAnalyser();
//     analyser.fftSize = 1024;
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
  
//     let audioBuffer1, audioBuffer2, source1, source2, isPlaying = false;
//     let gainNode1, gainNode2, masterGainNode;
//     let startTime = 0; // Для хранения начального времени при воспроизведении
//     let pauseTime = 0; // Время, на котором была пауза
  
//     // Функция загрузки аудиофайлов в буфер
//     function loadAudioFile(file, callback) {
//       const reader = new FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onload = () => {
//         audioContext.decodeAudioData(reader.result, (buffer) => {
//           callback(buffer);
//         });
//       };
//     }
  
//     // Обработчики для загрузки аудиофайлов
//     audioInput1.onchange = function(event) {
//       const file = event.target.files[0];
//       if (file) {
//         loadAudioFile(file, (buffer) => {
//           audioBuffer1 = buffer;
//           resetTimeControl();
//         });
//       }
//     };
  
//     audioInput2.onchange = function(event) {
//       const file = event.target.files[0];
//       if (file) {
//         loadAudioFile(file, (buffer) => {
//           audioBuffer2 = buffer;
//           resetTimeControl();
//         });
//       }
//     };
  
//     // Сброс ползунка времени на 0 и установка максимального значения
//     function resetTimeControl() {
//       masterTimeControl.value = 0;
//       if (audioBuffer1 && audioBuffer2) {
//         const maxDuration = Math.min(audioBuffer1.duration, audioBuffer2.duration);
//         masterTimeControl.max = maxDuration;
//       } else if (audioBuffer1) {
//         masterTimeControl.max = audioBuffer1.duration;
//       } else if (audioBuffer2) {
//         masterTimeControl.max = audioBuffer2.duration;
//       }
//       updateTimeLabel(0);
//     }
  
//     // Обновление метки времени
//     function updateTimeLabel(currentTime) {
//       const minutes = Math.floor(currentTime / 60);
//       const seconds = Math.floor(currentTime % 60);
//       timeLabel.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//     }
  
//     // Перемотка аудио
//     function seekAudio(time) {
//       if (source1 && source2) {
//         source1.stop();
//         source2.stop();
//       }
  
//       // Создаем новые источники для каждого аудио с новым временем начала
//       source1 = audioContext.createBufferSource();
//       source2 = audioContext.createBufferSource();
//       source1.buffer = audioBuffer1;
//       source2.buffer = audioBuffer2;
  
//       // Подключаем узлы громкости
//       gainNode1 = audioContext.createGain();
//       gainNode2 = audioContext.createGain();
//       masterGainNode = audioContext.createGain();
  
//       source1.connect(gainNode1).connect(masterGainNode).connect(analyser);
//       source2.connect(gainNode2).connect(masterGainNode).connect(analyser);
//       analyser.connect(audioContext.destination);
  
//       gainNode1.gain.value = masterVolumeControl.value;
//       gainNode2.gain.value = masterVolumeControl.value;
  
//       // Воспроизводим с указанного времени
//       startTime = audioContext.currentTime - time;
//       source1.start(0, time);
//       source2.start(0, time);
//       isPlaying = true;
  
//       draw();
//     }
  
//     // Воспроизведение обоих аудио
//     function playAudio() {
      
//         if (isPlaying) {
//           // Приостановить воспроизведение
//           pauseTime = audioContext.currentTime - startTime;
//           source1.stop();
//           source2.stop();
//           isPlaying = false;
//           playButton.textContent = "Play Both Tracks";
//         } else {
//           // Возобновить воспроизведение
//           seekAudio(pauseTime);
//           playButton.textContent = "Pause Both Tracks";
//           updateTime();
//         }
      
//     }
  
//     // Обновление времени и метки времени
//     function updateTime() {
//       if (isPlaying) {
//         const currentTime = audioContext.currentTime - startTime;
//         masterTimeControl.value = currentTime;
//         updateTimeLabel(currentTime);
  
//         requestAnimationFrame(updateTime);
//       }
//     }
  
//     // Обновление громкости при изменении ползунка
//     masterVolumeControl.oninput = function() {
//       if (gainNode1 && gainNode2) {
//         gainNode1.gain.value = this.value;
//         gainNode2.gain.value = this.value;
//       }
//     };
  
//     // Перемотка аудио при изменении ползунка времени
//     masterTimeControl.oninput = function() {
//       if (isPlaying) {
//         seekAudio(this.value);
//       } else {
//         updateTimeLabel(this.value);
//       }
//     };
  
//     // Обработчик для кнопки воспроизведения
//     playButton.onclick = function() {
//       playAudio();
//     };
  
//     // Визуализация аудиоданных
//     function draw() {
//       requestAnimationFrame(draw);
  
//       analyser.getByteFrequencyData(dataArray);
  
//       canvasCtx.fillStyle = 'rgb(0, 0, 0)';
//       canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  
//       const barWidth = (canvas.width / bufferLength) * 2.5;
//       let barHeight;
//       let x = 0;
  
//       for (let i = 0; i < bufferLength; i++) {
//         barHeight = dataArray[i];
  
//         const red = 124;
//         const green = 10;
//         const blue = 200;
  
//         canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
//         canvasCtx.fillRect(x, canvas.height - barHeight / 0.6, barWidth, barHeight / 1);
  
//         x += barWidth + 0.5;
//       }
//     }
//   };

const audios = [
  'Murder Drones.m4a', 'UZI THE DRONE KILLER.m4a', 'The Plot.m4a', 
  'The Plot 2_ This Time Its Personal.m4a', 'Click.m4a', 
  'Murder Brings (Trailer Theme).m4a', 'Get Prommed _3.m4a', 
  'The Knife Dance.m4a', 'OST - Disassembly Required.m4a', 
  'Solver Uzi.m4a', 'Gamer Mom.m4a', 'YOURE FREAKIN GROUNDED.m4a', 
  'Die Mad D.m4a', 'Uzi and N_ The Drone Killers.m4a', 
  'BITE ME (feat. Zephyrianna).m4a', 'FOREVER.m4a'
];

let currentStyleIndex = 0;

function getTrackName(fileName) {
  return fileName.replace('.m4a', '');
}

function createTrackList() {
  const trackList = document.getElementById('trackList');

  audios.forEach((audio, index) => {
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

    const audioElement = new Audio(audio);
    audioElement.addEventListener('loadedmetadata', () => {
      const duration = formatTime(audioElement.duration);
      trackDuration.textContent = duration;
    });

    li.appendChild(img);
    li.appendChild(div1);
    div1.appendChild(trackName);
    div1.appendChild(trackDuration);

    li.addEventListener('click', () => {
      const Aud = document.getElementById('sours');
      const audioPlayer = document.getElementById('audioPlayer');
      Aud.setAttribute('src', audio);
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
  // 32 64 128 256 512 1024 2048 4096 8192 16384
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

      x += barWidth + 1;
    }
  }

  audio.onplay = function() {
    audioContext.resume();
    draw();
  };
};
