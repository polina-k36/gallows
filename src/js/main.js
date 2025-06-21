//модалки

const modalRule = document.querySelector('.overlay-rule'),
      modalAnswer = document.querySelector('.overlay-answer'),
      modalSignIn = document.querySelector('.overlay-signIn'),
      targetSignIn = document.querySelectorAll('[data-signin]'),
      targetAnswer = document.querySelectorAll('[data-answer]'),
      targetRule = document.querySelectorAll('[data-rule]'),
      closeTargetModal = document.querySelectorAll('.modal__close');


function showModal(targetList, modal){
    targetList.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
        })
    })
}
showModal(targetRule, modalRule);
showModal(targetAnswer, modalAnswer);
showModal(targetSignIn, modalSignIn);

closeTargetModal.forEach(item => {
    item.addEventListener('click', () => {
        modalRule.style.display = 'none';
        modalSignIn.style.display = 'none';
        modalAnswer.style.display = 'none';
    })
});

