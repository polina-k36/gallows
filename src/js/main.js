//модалки

const modalRule = document.querySelector('.modal-rule'),
      modalAnswer = document.querySelector('.modal-answer'),
      modalSignIn = document.querySelector('.modal-signIn'),
      targetSignIn = document.querySelectorAll('[data-signin]'),
      targetAnswer = document.querySelectorAll('[data-answer]'),
      targetRule = document.querySelectorAll('[data-rule]'),
      targetPlay = document.querySelectorAll('[data-play]'),
      closeTargetModal = document.querySelectorAll('.modal__close'),
      overlay = document.querySelector('.overlay');


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
})


