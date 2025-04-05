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


let audios = [
    "Music/Ado - Odo.mp3",
    "Music/BITE ME (feat. Zephyrianna).m4a",
    "Music/Click.m4a",
    "Music/CYBERPUNK 2077 SOUNDTRACK - WHO'S READY FOR TOMORROW by Rat Boy & IBDY (Official Video).m4a",
    "Music/Die Mad D.m4a",
    "Music/DXRTYTYPE - Bedrock.mp3",
    "Music/FOREVER.m4a",
    "Music/Gamer Mom.m4a",
    "Music/Get Prommed _3.m4a",
    "Music/higanbanban - Override.mp3",
    "Music/Inst.ogg",
    "Music/Life Letters.m4a",
    "Music/Molina Hey Kids (Feat. Late Verlane).mp3",
    "Music/Murder Brings (Trailer Theme).m4a",
    "Music/Murder Drones.m4a",
    "Music/OST - Disassembly Required.m4a",
    "Music/PollmixaN - Серый человек.mp3",
    "Music/Sadfriendd Luga - 5star.mp3",
    "Music/Salvi, Franklin Dam - Calabria.mp3",
    "Music/Solver Uzi.m4a",
    "Music/Spiderbait - Black Betty.mp3",
    "Music/StayedGone.m4a",
    "Music/The Dark Scientist - Lunziestella.m4a",
    "Music/The Knife Dance.m4a",
    "Music/The Plot 2_ This Time Its Personal.m4a",
    "Music/The Plot.m4a",
    "Music/Unfunny Game Slowed.mp3",
    "Music/Uzi and N_ The Drone Killers.m4a",
    "Music/UZI THE DRONE KILLER.m4a",
    "Music/Vinnie Dixie - Cyberpunk 2077.mp3",
    "Music/Voices.ogg",
    "Music/Yomoti - Before Chill.mp3",
    "Music/YOURE FREAKIN GROUNDED.m4a",
    "Music/Zachz Winner - doodle Slowed.mp3",
];







// const audios = [
//   'Music/Murder Drones.m4a', 'Music/UZI THE DRONE KILLER.m4a', 'Music/The Plot.m4a', 
//   'Music/The Plot 2_ This Time Its Personal.m4a', 'Music/Click.m4a', 
//   'Music/Murder Brings (Trailer Theme).m4a', 'Music/Get Prommed _3.m4a', 
//   'Music/The Knife Dance.m4a', 'Music/OST - Disassembly Required.m4a', 
//   'Music/Solver Uzi.m4a', 'Music/Gamer Mom.m4a', 'Music/YOURE FREAKIN GROUNDED.m4a', 
//   'Music/Die Mad D.m4a', 'Music/Uzi and N_ The Drone Killers.m4a', 
//   'Music/BITE ME (feat. Zephyrianna).m4a', 'Music/FOREVER.m4a', 'Music/DXRTYTYPE - Bedrock.mp3',
//   'Music/Molina Hey Kids (Feat. Late Verlane).mp3', 'Music/Unfunny Game Slowed.mp3', 'Music/Vinnie Dixie - Cyberpunk 2077.mp3',
//   'Music/Salvi, Franklin Dam - Calabria.mp3', 'Music/Yomoti - Before Chill.mp3', 'Music/Spiderbait - Black Betty.mp3', 'Music/Sadfriendd Luga - 5star.mp3',
//   'Music/PollmixaN - Серый человек.mp3', 'Music/Ado - Odo.mp3', 'Music/higanbanban - Override.mp3',
//   'Music/Zachz Winner - doodle Slowed.mp3', "Music/Voices.ogg", 'Music/Inst.ogg'
// ];

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
  } else if (fileName.endsWith('.ogg')) {
    return fileName.replace('.ogg', '');
  }else {
    return fileName;
  }
}
const likes = [

];

// Функция для создания списка треков
function createTrackList() {
  const trackList = document.getElementById('trackList');

  cleanAudios.forEach((audio, index) => {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const li = document.createElement('li');
    li.setAttribute("data-track", `data-track-${index + 1}`);
    const img = document.createElement('img');
    img.src = `Icons/${getTrackName(audio)}.png`;
    img.alt = `Cover for ${getTrackName(audio)}`;
    const trackName = document.createElement('span');
    trackName.textContent = getTrackName(audio);
    
    // Контейнер для лайка
    const divLikes = document.createElement('div');
    divLikes.classList.add("divLikes");
    divLikes.setAttribute("data-track", `track-item-${index + 1}`);

    // SVG иконка лайка
    const trackFollow1 = document.createElementNS(svgNamespace, 'svg');
    trackFollow1.setAttribute("width", "24");
    trackFollow1.setAttribute("height", "24");
    trackFollow1.setAttribute("viewBox", "0 0 24 24");

    const trackFollow2 = document.createElementNS(svgNamespace, 'svg');
    trackFollow2.setAttribute("width", "24");
    trackFollow2.setAttribute("height", "24");
    trackFollow2.setAttribute("viewBox", "0 0 24 24");
    trackFollow2.classList.add("opasityHeart")
    divLikes.appendChild(trackFollow1);
    divLikes.appendChild(trackFollow2);

    const div1 = document.createElement('div');
    div1.classList.add('divLi');

    const trackDuration = document.createElement('span');
    trackDuration.classList.add('duration');
    trackDuration.textContent = 'Loading...';

    // Загружаем метаданные трека
    const audioElement = new Audio(`Music/${audio}`);
    audioElement.preload = 'metadata'; 
    audioElement.addEventListener('loadedmetadata', () => {
      trackDuration.textContent = formatTime(audioElement.duration);
    });

    li.appendChild(img);
    li.appendChild(div1);
    li.appendChild(divLikes);
    div1.appendChild(trackName);
    div1.appendChild(trackDuration);

    // Клик для воспроизведения трека
    li.addEventListener('click', () => {
      const Aud = document.getElementById('sours');
      const audioPlayer = document.getElementById('audioPlayer');
      const playPauseBtn = document.getElementById('playPauseBtn');
      
      Aud.src = `Music/${audio}`;
      audioPlayer.load();
    
      audioPlayer.play().then(() => {
        playPauseBtn.src = `Icons/icons8-пауза-100.png`;
      }).catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
      });
    });

    // Обработчик лайков
    divLikes.addEventListener('click', (event) => {
      event.stopPropagation(); // Чтобы не срабатывал клик по li
      toggleLike(event.currentTarget);
    });

    trackList.appendChild(li);
  });
}


function toggleLike(element) {
  const track = element.getAttribute('data-track');
  const svgIcon = element.querySelector('svg');

  if (!likes.includes(track)) {
    likes.push(track);
    element.classList.add('liked');
    svgIcon.classList.add('animate-like');
  } 
  else {
    likes.splice(likes.indexOf(track), 1);
    element.classList.remove('liked');
    svgIcon.classList.remove('animate-like');
  }

  // Добавляем класс анимации
  // svgIcon.classList.add('animate-like');
  // Удаляем класс после завершения анимации
  // svgIcon.addEventListener('animationend', () => {
  //   svgIcon.classList.remove('animate-like');
  // }, { once: true });
  console.log('Лайкнутые треки:', likes);
}

// Функция для форматирования времени
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

    analyser.fftSize = 512 * 4 ;
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

        const barWidth = (canvas.width / bufferLength) * 1.18;
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

            x += barWidth ;//+ 0.6
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
      const initialLineColor = "#7C0AC8";
      const initialBGColor = "#000000"; // HEX-код для RGB(124, 10, 200)
      document.getElementById("colorPicker").value = initialLineColor;
      document.getElementById("BGcolorPicker").value = initialBGColor;
  
      // Применяем начальный цвет как фильтр
      applyFilter();
  });
  
  function applyFilter() {
      const colorPicker = document.getElementById("colorPicker");
      const BGcolorPicker = document.getElementById("BGcolorPicker");
      const selectedColor = colorPicker.value; // Получаем выбранный цвет
      const selectedBGColor = BGcolorPicker.value; // Получаем выбранный цвет
  
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
      
      document.documentElement.style.setProperty('--main-line-color', selectedColor);
      document.documentElement.style.setProperty('--main-bg-color', selectedBGColor);
  }