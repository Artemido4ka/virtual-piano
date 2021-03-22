//1) _мышь

//находим массив обектов клавиш пианино
const keys = document.querySelectorAll('.piano-key')

//флаг 
var flag = false;

//создаем слушателя при нажатии,делаем флаг true, запускаем playAudio,там же меняется стиль на active
keys.forEach(element => {
  element.addEventListener('mousedown', () => {
    flag = true
    playAudio(element);
   })
});

//при отжатии на ВСЕЙ области меняем флаг на false, т.к. можно отжать за пределами клавиш  
document.addEventListener('mouseup', () => {
  flag = false
})

//при отжатии на клавише, убираем стиль active
keys.forEach(element => {
  element.addEventListener('mouseup', () => {
    changeToNotactive(element);
  })
});

//при наведении на клавишу и если флаг true , запускаем playAudio,там же меняется стиль на active 
keys.forEach(element => {
  element.addEventListener('mouseover', () => {
    if (flag == true) {
      playAudio(element);
    }
  })
});

//при уводе с клавиши , убираем стиль active 
keys.forEach(element => {
  element.addEventListener('mouseout', () => changeToNotactive(element))
});

//функция удаления стиля
function changeToNotactive(event) {
  event.classList.remove('piano-key-active');
}

//функция добавления звука и стиля прожатия
function playAudio(event) {
  let audio = document.getElementById(event.dataset.note);
  audio.currentTime = 0;
  audio.play();
  event.classList.add('piano-key-active');
}

//////////////////////////////////////////////////////////////////////////

//2) _клава кока

//массивы символов и кодов
let codes = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'];
let symbol = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'Q', 'W', 'E', 'R', 'T'];

//создаем слушателя при нажатии клавиши клавиатуры,находим нажатую, запускаем playAudio,там же меняется стиль на active
window.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  for (let i = 0; i < codes.length; i++) {
    if (event.code === codes[i]) {
      let keysBoard = document.querySelector('div[data-letter=' + symbol[i] + ']');
      playAudio(keysBoard);
    }
  }
});

//создаем слушателя при нажатии клавиши клавиатуры,находим нажатую, убираем стиль active
window.addEventListener('keyup', (event) => {
  for (let i = 0; i < codes.length; i++) {
    if (event.code === codes[i]) {
      let keysBoard = document.querySelector('div[data-letter=' + symbol[i] + ']');
      changeToNotactive(keysBoard);
    }
  }
});

//////////////////////////////////////////////////////////////////////////

//3)функция полного екрана

const fullscreen = document.querySelectorAll('.fullscreen')

//создаем слушателя при клике на кнопку
fullscreen.forEach(v => {
  v.addEventListener('click', () => toggleFullScreen())
})

function toggleFullScreen() {
  if (!document.fullscreenElement && 
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

//////////////////////////////////////////////////////////////////////////

//4)изменение раскладок нот и буков 

//находим ноты,буквы и смассив двух кнопок
const button1 = document.querySelector('.btn-notes');
const button2 = document.querySelector('.btn-letters');
const buttons = document.querySelectorAll('.btn')

//создаем слушателя для массива кнопок,вызываем функцию change
buttons.forEach(element => {
  element.addEventListener('click', change);
});

//меняем кнопку на активную и показываем соответствующею ей раскладку 
function change(event) {
  if (event.target.classList.contains('btn-notes')) {
    keys.forEach(key => key.classList.remove('piano-key-letter'));
    event.target.classList.add('btn-active');
    button2.classList.remove('btn-active');
  }
  if (event.target.classList.contains('btn-letters')) {
    keys.forEach(key => key.classList.add('piano-key-letter'));
    event.target.classList.add('btn-active');
    button1.classList.remove('btn-active');
  }

}






