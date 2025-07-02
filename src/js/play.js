//создание нужного количества букв для загаданного слова
const words = {
    all: [],
    animals: [
      'слон', 'тигр', 'лев', 'волк', 'медведь',
      'заяц', 'лисица', 'еж', 'крокодил', 'обезьяна',
      'жираф', 'пингвин', 'кит', 'орел', 'собака',
      'кошка', 'зебра', 'бегемот', 'антилопа', 'кролик',
      'панда', 'кенгуру', 'барсук', 'выдра', 'ласточка',
      'сова', 'ястреб', 'кабан', 'морж', 'черепаха',
      'дельфин', 'муравьед', 'страус', 'тигр', 'лисица',
      'козёл', 'корова', 'осёл', 'бобр', 'попугай'
    ],
    fruits: [
      'яблоко', 'банан', 'апельсин', 'груша', 'персик',
      'слива', 'виноград', 'ананас', 'киви', 'арбуз',
      'дыня', 'мандарин', 'кокос', 'черешня', 'лимон',
      'гранат', 'финик', 'инжир', 'маракуйя', 'папайя',
      'гуава', 'личи', 'черника', 'малина', 'клюква',
      'смородина', 'абрикос', 'перец', 'томат', 'авокадо',
      'дыня', 'карамбола', 'помело', 'шиповник', 'фейхоа',
      'хурма', 'земляника', 'черешня', 'слива', 'грейпфрут'
    ],
    cities: [
      'москва', 'париж', 'лондон', 'берлин', 'рим',
      'киев', 'минск', 'стамбул', 'пекин', 'токио',
      'мельбурн', 'каир', 'мумбаи', 'барселона',
      'новосибирск', 'екатеринбург', 'казань', 'самара', 'омск',
      'ростов', 'уфа', 'волгоград', 'пермь', 'краснодар',
      'нижний', 'тольятти', 'челябинск', 'курск', 'воронеж',
      'иваново', 'тамбов', 'орёл', 'липецк', 'брянск'
    ],
    professions: [
      'врач', 'учитель', 'инженер', 'программист', 'повар',
      'водитель', 'пилот', 'журналист', 'художник', 'певец',
      'архитектор', 'полицейский', 'фермер', 'актёр', 'дизайнер',
      'стоматолог', 'бухгалтер', 'менеджер', 'юрист', 'психолог',
      'электрик', 'сантехник', 'строитель', 'парикмахер', 'фармацевт',
      'переводчик', 'директор', 'оператор', 'кассир', 'продавец',
      'водолаз', 'пожарный', 'солдат', 'моряк', 'плотник',
      'садовник', 'таксист', 'курьер', 'бариста', 'логист'
    ],
    transport: [
      'автомобиль', 'велосипед', 'самолёт', 'поезд', 'корабль',
      'мотоцикл', 'трамвай', 'метро', 'автобус', 'вертолёт',
      'катер', 'электросамокат', 'грузовик', 'скутер', 'яхта',
      'пароход', 'троллейбус', 'монорельс', 'кабриолет', 'фургон',
      'байк', 'джип', 'катамаран', 'пикап', 'рейсовый',
      'скоростной', 'трамвайчик', 'водный', 'подводная', 'самокат',
      'электромобиль', 'гидроцикл', 'погрузчик', 'экскаватор', 'бульдозер'
    ],
    colors: [
      'красный', 'синий', 'зелёный', 'жёлтый', 'оранжевый',
      'фиолетовый', 'чёрный', 'белый', 'коричневый', 'розовый',
      'голубой', 'серый', 'бордовый', 'бирюзовый', 'лавандовый',
      'малиновый', 'салатовый', 'пурпурный', 'золотой', 'серебряный',
      'медный', 'бежевый', 'шоколадный', 'изумрудный', 'лазурный',
      'песочный', 'терракотовый','хаки'
      
    ]
};
words.all = [
...words.animals,
...words.fruits,
...words.cities,
...words.professions,
...words.transport,
...words.colors
];

const modalSelectWords = document.querySelector('.modal-selectWords'),
      overlay = document.querySelector('.overlay'),
      checkboxes = modalSelectWords.querySelectorAll('input'),
      allCheck = modalSelectWords.querySelector('#all'),
      ownWordButton = document.querySelector('[data-inputWord]'),
      startGameButton = document.querySelector('[data-startGame]'),
      ownStartGameButton = document.querySelector('[data-ownStartGame]'),
      modalEnterWord = document.querySelector('.modal-enterWord');
      
const letterWrapper = document.querySelector('.game__word');

const keysKeyboard = document.querySelectorAll('.game__keyboard_key'),
      modalGameOver = document.querySelector('.modal-gameOver'),
      gallowsPart = [...document.querySelector('.game__gallows').children, 
                     ...document.querySelector('.game__gallows-body').children],
      backArrow = document.querySelector('.modal__arr');

let attempts = 0; //количество попыток
let unlockLetter = 0; //количество открытых букв

let word;

let selectWords = [];

modalSelectWords.style.display = 'flex';
overlay.style.display = 'block';

allCheck.addEventListener('change', () => {
    if (allCheck.checked){
        checkboxes.forEach(check => {
            check.checked = true;
        });
    } else {
        checkboxes.forEach(check => {
            check.checked = false;
        });
    }
});

ownWordButton.addEventListener('click', () => {
    modalSelectWords.style.display = 'none';
    modalEnterWord.style.display = 'flex';
});

startGameButton.addEventListener('click', () => {
    checkboxes.forEach(check => {
        if (check.checked){
            selectWords = [...selectWords, ...words[check.id]]        
        }
    });
    if (selectWords.length === 0){
        alert('Выберите какую-нибудь категорию или придумайте свое слово для друга.');
        return;
    }
    modalSelectWords.style.display = 'none';
    overlay.style.display = 'none';
    renderWord();
    keyPress(letterWrapper.querySelectorAll('.game__word_letter'));
});

backArrow.addEventListener('click', () => {
    modalSelectWords.style.display = 'flex';
    modalEnterWord.style.display = 'none';
});

let ownWord;

document.querySelector('#word').addEventListener('input', e => {
    const checkRus = /^[\u0400-\u04FF]+$/;
    if (checkRus.test(e.target.value)){
        ownWord = e.target.value.toLowerCase();
    } else {
        e.target.value = e.target.value.slice(0, -1); 
    }
})

ownStartGameButton.addEventListener('click', () => {
    if (ownWord.length !== 0){
        selectWords = [ownWord];
    }else {
        alert('Введите что то в поле для слова. Иначе игра не начнется.');
    }
    overlay.style.display = 'none';
    modalEnterWord.style.display = 'none';
    renderWord();
    keyPress(letterWrapper.querySelectorAll('.game__word_letter'));
})

function renderWord(){
    word = selectWords[Math.floor(Math.random()*selectWords.length)];
    let letter;
    for (let i = 0; i < word.length; i++) {
        letter = document.createElement('div');
        letter.classList.add('game__word_letter');
        letter.textContent = word[i];
        letterWrapper.append(letter);
    }
}

//взаимодействие с клавиатурой

document.addEventListener('keydown', event => {
    keysKeyboard.forEach(key => {
        if (key.textContent === event.key){
            key.click();
        }
    });
});


function keyPress(letters) {
    function onClickHandler() {
        if (word.indexOf(this.textContent) !== -1) {
            this.classList.add('game__keyboard_key-right');
            letters.forEach(letter => {
                if (letter.textContent === this.textContent) {
                    letter.classList.add('game__word_letter-unlock');
                    unlockLetter++;
                }
            });
        } else {
            this.classList.add('game__keyboard_key-wrong');
            gallowsPart[attempts].style.display = 'block';
            attempts++;
        }
        if (attempts >= 9) {
            keysKeyboard.forEach(key => {
                key.removeEventListener('click', onClickHandler);
            });
            setTimeout(() => {
                modalGameOver.querySelector('.modal__result').textContent = 'Ты проиграл. Слово было - '+ word;
                modalGameOver.style.display = 'flex';
                overlay.style.display = 'block';
            }, 1000)
            return;
        }
        if (unlockLetter === word.length){
            setTimeout(() => {
                modalGameOver.querySelector('.modal__result').textContent = 'Ты выиграл!!! Слово действительно было - '+ word;
                modalGameOver.style.display = 'flex';
                overlay.style.display = 'block';
            }, 1000)
            return;
        }
    }

    keysKeyboard.forEach(key => {
        key.addEventListener('click', onClickHandler);
    });
}

