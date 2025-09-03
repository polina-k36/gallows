//модалки

const modalRule = document.querySelector('.modal-rule'),
      modalAnswer = document.querySelector('.modal-answer'),
      modalSignIn = document.querySelector('.modal-signIn'),
      targetSignIn = document.querySelectorAll('[data-signin]'),
      targetAnswer = document.querySelectorAll('[data-answer]'),
      targetRule = document.querySelectorAll('[data-rule]'),
      targetPlay = document.querySelectorAll('[data-play]'),
      closeTargetModal = document.querySelectorAll('.modal__close'),
      overlay = document.querySelector('.overlay'),
      cat = document.querySelector('.cat'),
      food = document.querySelector('.food_piece'),
      foodContainer = document.querySelector('.food');;


//СДЕЛАТЬ РАБОТУ С МОДАЛЬНЫМИ ОКНАМИ БОЛЕЕ РАЗУМНО
//показывание модалки
function showModal(targetList, modal){
    targetList.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'flex';
            overlay.style.display = 'block';
        })
    })
}
showModal(targetRule, modalRule);
//showModal(targetAnswer, modalAnswer);
showModal(targetSignIn, modalSignIn);

//закрытие модалки через крест

closeTargetModal.forEach(item => {
    item.addEventListener('click', () => {
        modalRule.style.display = 'none';
        modalSignIn.style.display = 'none';
        modalAnswer.style.display = 'none';
        overlay.style.display = 'none';
    })
});

//закрытие через overlay

document.addEventListener('click', e => {
    if (e.target == overlay){
        modalRule.style.display = 'none';
        modalSignIn.style.display = 'none';
        modalAnswer.style.display = 'none';
        overlay.style.display = 'none';
    }
});

let bottomValue;
let rightValue;
let cursorX = 0;
let cursorY = 0;
let catMoveUpInterval;
let handHoldFood = false;
let catRunForFood = false;
let catX = 10;
let catY = 20;
let catMoveMouse = (event) => {
    // Получаем координаты мыши относительно окна
    cursorX = event.clientX;
    cursorY = event.clientY;
    
    const dx = cursorX - catX;
    const dy = cursorY - catY;
    const speed = 1.5;
    catX += dx * speed;
    catY += dy * speed;
    const catDeg = (Math.atan2(dy, dx) * (180 / Math.PI)); //угол в радианах между курсором и котом перевод в градусы
    cat.style.left = catX + 'px';
    cat.style.top = catY + 'px';
    cat.style.transform = `rotate(${catDeg + 90}deg)`;
};

let foodMouse = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    food.style.position = 'fixed';
    food.style.left = x + 'px';
    food.style.top = y + 'px';
};

cat.addEventListener('mouseenter', () => {
    handHoldFood ? catRunForFood = true : catRunForFood = false; 
    if (catRunForFood) {
        cat.classList.add('cat-sprite');
        document.addEventListener('mousemove', catMoveMouse);
    } else {
        document.removeEventListener('mousemove', catMoveMouse);
    }
});

foodContainer.addEventListener('click', () => {
    handHoldFood = !handHoldFood;
    if (handHoldFood) {
        document.addEventListener('mousemove', foodMouse);
    } else { 
        document.removeEventListener('mousemove', foodMouse);
        document.removeEventListener('mousemove', catMoveMouse);
        cat.style.transform = 'rotate(-50deg)';
        cat.style.left = 20 + 'px';
        cat.style.top = 10  + 'px';
        food.style.position = 'absolute';
        food.style.left = 30 + 'px';
        food.style.top = 15  + 'px';
        setTimeout(staticCat, 2000);
    }    
});


function staticCat() {
    cat.style.transform = 'rotate(130deg)';
    cat.classList.remove('cat-sprite');
}
