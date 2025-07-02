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
      cat = document.querySelector('.cat');


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
let catMoveUpInterval;
let catMoveDownInterval;
cat.addEventListener('click', () => {
    cat.classList.toggle('cat-sprite');
    if (cat.classList.contains('cat-sprite')){
        catMoveUpInterval = setInterval(() => {
            bottomValue = parseInt(window.getComputedStyle(cat).bottom, 10) || 0;
            rightValue = parseInt(window.getComputedStyle(cat).right, 10) || 0;
            cat.style.transform = 'rotate(-50deg)';
            if (bottomValue <= 450 && rightValue <= 1300) {
                bottomValue = parseInt(window.getComputedStyle(cat).bottom, 10) || 0;
                rightValue = parseInt(window.getComputedStyle(cat).right, 10) || 0;
                cat.style.bottom = (bottomValue + 3) + 'px';
                cat.style.right = (rightValue + 10) + 'px';
            } else {
                clearInterval(catMoveUpInterval);
                catMoveDownInterval = setInterval(() => {
                    bottomValue = parseInt(window.getComputedStyle(cat).bottom, 10) || 0;
                    rightValue = parseInt(window.getComputedStyle(cat).right, 10) || 0;
                    cat.style.transform = 'rotate(-250deg)';
                    if (bottomValue >= 20 && rightValue >= 50) {
                        bottomValue = parseInt(window.getComputedStyle(cat).bottom, 10) || 0;
                        rightValue = parseInt(window.getComputedStyle(cat).right, 10) || 0;
                        cat.style.bottom = (bottomValue - 3) + 'px';
                        cat.style.right = (rightValue - 10) + 'px';
                    } else {
                        clearInterval(catMoveDownInterval);
                        cat.style.transform = 'rotate(-10deg)';
                        cat.classList.remove('cat-sprite');
                    }
                }, 50);
            }
        }, 50);
    } else {
        console.log('пушин не бежит');
        clearInterval(catMoveUpInterval);
        clearInterval(catMoveDownInterval);
    }
})