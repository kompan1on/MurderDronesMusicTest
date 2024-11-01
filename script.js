function toggleDropdown() {
    var dropdown = document.getElementById("dropdownBlocks");
    dropdown.classList.toggle("show");
}

// Функция для замены базового блока на вторичный
function replaceBaseBlock(secondaryBlock) {
    var baseBlock = document.getElementById("BBImg");
    baseBlock.src = secondaryBlock.src;
    baseBlock.style.backgroundColor = secondaryBlock.style.backgroundColor;
    toggleDropdown(); // Закрываем список
}

// Функция для управления видимостью блоков
function setVisibility(selectedClass) {
    // Получаем все блоки
    var blocks = document.querySelectorAll('.extra-block');
    
    // Проходим по каждому блоку
    blocks.forEach(function(block) {
        // Если у блока есть выбранный класс
        if (block.classList.contains(selectedClass.toString())) {
            block.classList.add('visible');
            block.classList.remove('unvisible');
        } else {
            block.classList.add('unvisible');
            block.classList.remove('visible');
        }
    });
}

const audios = [
  'Music/Murder Drones.m4a', 'Music/UZI THE DRONE KILLER.m4a', 'Music/The Plot.m4a', 
  'Music/The Plot 2_ This Time Its Personal.m4a', 'Music/Click.m4a', 
  'Music/Murder Brings (Trailer Theme).m4a', 'Music/Get Prommed _3.m4a', 
  'Music/The Knife Dance.m4a', 'Music/OST - Disassembly Required.m4a', 
  'Music/Solver Uzi.m4a', 'Music/Gamer Mom.m4a', 'Music/YOURE FREAKIN GROUNDED.m4a', 
  'Music/Die Mad D.m4a', 'Music/Uzi and N_ The Drone Killers.m4a', 
  'Music/BITE ME (feat. Zephyrianna).m4a', 'Music/FOREVER.m4a', 'Music/DXRTYTYPE - Bedrock.mp3',
  'Music/Molina Hey Kids (Feat. Late Verlane).mp3', 'Music/Unfunny Game Slowed.mp3', 'Music/Vinnie Dixie - Cyberpunk 2077.mp3',
  'Music/Salvi, Franklin Dam - Calabria.mp3', 'Music/Yomoti - Before Chill.mp3', 'Music/Spiderbait - Black Betty.mp3', 'Music/Sadfriendd Luga - 5star.mp3',
  'Music/PollmixaN - Серый человек.mp3', 'Music/Ado - Odo.mp3'
];

// Убираем "Music/" из каждой строки массива
const cleanAudios = audios.map(audio => audio.replace('Music/', ''));

// Функция для получения названия трека без расширения файла
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

// Функция для создания списка треков
function createTrackList() {
  const trackList = document.getElementById('trackList');

  // Используем cleanAudios вместо audios
  cleanAudios.forEach((audio, index) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = `Icons/${getTrackName(audio)}.png`;
    img.alt = `Cover for ${getTrackName(audio)}`;

    const trackName = document.createElement('span');
    trackName.textContent = getTrackName(audio);

    const div1 = document.createElement('div');
    div1.classList.add('divLi');

    const trackDuration = document.createElement('span');
    trackDuration.classList.add('duration');
    trackDuration.textContent = 'Loading...';

    // Загружаем метаданные без загрузки самого трека
    const audioElement = new Audio(`Music/${audio}`);
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
      const Aud = document.getElementById('sours'); // Источник аудио
      const audioPlayer = document.getElementById('audioPlayer'); // Аудиоэлемент
      const playPauseBtn = document.getElementById('playPauseBtn');
      
      // Устанавливаем путь к аудиофайлу
      Aud.src = `Music/${audio}`;
      
      // Загружаем новый аудиофайл
      audioPlayer.load();
    
      // Начинаем воспроизведение
      audioPlayer.play().then(() => {
        playPauseBtn.src = `Icons/icons8-пауза-100.png`;
      }).catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
      });
    });
    trackList.appendChild(li);
  });
}

// Функция для форматирования времени
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    const colorPicker = document.getElementById('colorPicker');

    // Начальные значения цвета
    let red = 124;
    let green = 10;
    let blue = 200;

    // Аудиоконтекст и анализатор
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Обновляем цвет визуализации при выборе нового цвета
    colorPicker.addEventListener('input', () => {
        const hexColor = colorPicker.value;
        const rgbColor = hexToRgb(hexColor);
        red = rgbColor.r;
        green = rgbColor.g;
        blue = rgbColor.b;
    });

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

            // Применяем выбранный цвет
            canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
            canvasCtx.fillRect(x, canvas.height - barHeight / 0.2, barWidth, barHeight / 0.1);

            // Зеркальный канвас: меняем вертикальное направление
            canvasMirrorCtx.save();
            canvasMirrorCtx.scale(1, -1); // Отзеркаливаем по вертикали
            canvasMirrorCtx.fillStyle = `rgb(${red},${green},${blue})`;
            canvasMirrorCtx.fillRect(x, -barHeight / 0.2, barWidth, barHeight / 0.1);
            canvasMirrorCtx.restore();

            x += barWidth + 0.6;
        }
    }

    // Воспроизведение и начало визуализации
    audio.onplay = function() {
        audioContext.resume();
        draw();
    };

    // Преобразование HEX в RGB
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }
};

  

const styles = ['style0.css','style1.css', 'style2.css', 'style3.css', 'style4.css', 'style5.css']; // Массив с путями к стилям
    let currentStyleIndex = 0; // Индекс текущего стиля

document.getElementById('1').addEventListener('click', function () {
    currentStyleIndex = 1;

    const stylesheet = document.getElementById('stylesheet');
    // Устанавливаем новый href в зависимости от текущего индекса
    stylesheet.setAttribute('href', styles[currentStyleIndex]);
});
document.getElementById('2').addEventListener('click', function () {
    currentStyleIndex = 2;

    const stylesheet = document.getElementById('stylesheet');
    // Устанавливаем новый href в зависимости от текущего индекса
    stylesheet.setAttribute('href', styles[currentStyleIndex]);
});
document.getElementById('3').addEventListener('click', function () {
    currentStyleIndex = 3;

    const stylesheet = document.getElementById('stylesheet');
    // Устанавливаем новый href в зависимости от текущего индекса
    stylesheet.setAttribute('href', styles[currentStyleIndex]);
});
document.getElementById('4').addEventListener('click', function () {
    currentStyleIndex = 4;

    const stylesheet = document.getElementById('stylesheet');
    // Устанавливаем новый href в зависимости от текущего индекса
    stylesheet.setAttribute('href', styles[currentStyleIndex]);
});
document.getElementById('5').addEventListener('click', function () {
    currentStyleIndex = 5;

    const stylesheet = document.getElementById('stylesheet');
    // Устанавливаем новый href в зависимости от текущего индекса
    stylesheet.setAttribute('href', styles[currentStyleIndex]);
});



    // Получаем элементы
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const seekBar = document.getElementById('seekBar');
    const timeInfo = document.getElementById('timeInfo');

    // Обработчик кнопки воспроизведения/паузы
    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.src = `Icons/icons8-пауза-100.png`;
        } else {
            audioPlayer.pause();
            playPauseBtn.src = `Icons/icons8-воспроизведение-100.png`;
        }
    });

    // Обновление слайдера громкости
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = volumeSlider.value;
    });

    // Обновление временной шкалы по мере воспроизведения
    audioPlayer.addEventListener('timeupdate', function() {
        // Обновляем положение слайдера воспроизведения
        seekBar.max = audioPlayer.duration || 0;
        seekBar.value = audioPlayer.currentTime;
        
        // Обновляем отображение времени
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60);

        timeInfo.textContent = `${formatTimeForPlay(currentMinutes, currentSeconds)} / ${formatTimeForPlay(durationMinutes, durationSeconds)}`;
    });

    // Перемотка трека с помощью временной шкалы
    seekBar.addEventListener('input', function() {
        audioPlayer.currentTime = seekBar.value;
    });

    // Функция форматирования времени в мм:сс
    function formatTimeForPlay(minutes, seconds) {
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Обработка загрузки аудиофайла для динамической продолжительности
    audioPlayer.addEventListener('loadedmetadata', function() {
        seekBar.max = audioPlayer.duration;
        timeInfo.textContent = `00:00 / ${formatTimeForPlay(Math.floor(audioPlayer.duration / 60), Math.floor(audioPlayer.duration % 60))}`;
    });
    
    document.addEventListener("DOMContentLoaded", () => {
      // Устанавливаем начальный цвет в colorPicker и накладываем его
      const initialColor = "#7C0AC8"; // HEX-код для RGB(124, 10, 200)
      document.getElementById("colorPicker").value = initialColor;
  
      // Применяем начальный цвет как фильтр
      applyFilter();
  });
  
  function applyFilter() {
      const colorPicker = document.getElementById("colorPicker");
      const selectedColor = colorPicker.value; // Получаем выбранный цвет
  
      // Устанавливаем выбранный цвет как фоновый для наложения
      const colorOverlay1 = document.getElementById("colorOverlay1");
      colorOverlay1.style.backgroundColor = selectedColor;
      const colorOverlay2 = document.getElementById("colorOverlay2");
      colorOverlay2.style.backgroundColor = selectedColor;
      const colorOverlay3 = document.getElementById("colorOverlay3");
      colorOverlay3.style.backgroundColor = selectedColor;
      const colorOverlay4 = document.getElementById("colorOverlay4");
      colorOverlay4.style.backgroundColor = selectedColor;
      const colorOverlay5 = document.getElementById("colorOverlay5");
      colorOverlay5.style.backgroundColor = selectedColor;
      const colorOverlay6 = document.getElementById("colorOverlay6");
      colorOverlay6.style.backgroundColor = selectedColor;
      const baseBlock = document.getElementById("colorOverlay");
      baseBlock.style.backgroundColor = selectedColor;
      document.documentElement.style.setProperty('--main-bg-color', selectedColor);
      updateCanvasColor("visualizer", selectedColor);
      updateCanvasColor("visualizerMirror", selectedColor);
  }

function updateCanvasColor(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    const canvasCtx = canvas.getContext("2d");

    // Преобразуем HEX в RGB
    const rgb = hexToRgb(color);

    // Очищаем холст и заливаем новым цветом
    canvasCtx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// Функция для преобразования HEX-кода в RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
} 