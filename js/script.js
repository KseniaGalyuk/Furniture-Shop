"use strict"
//*< Общие переменные>==========================================================================================
const body = document.querySelector('body');
let unlock = true;
//*</ Общие переменные>==========================================================================================
// Открытие подменю в шапке на сенсорных экранах
// Функция срабатывает когда весь контент загрузится
window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (Делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				// Сначала убираем уже открытые подменю
				if (document.querySelectorAll(".menu__item._hover").length > 0 && !targetElement.closest('._hover')) {
					_removeClasses(document.querySelectorAll(".menu__item._hover"), "_hover");
				}
				targetElement.closest('.menu__item').classList.toggle("_hover"); //Находим нужного родителя и вешаем ему класс
			}
			// Закрываем подменю при нажатии в любое место, кроме самого подменю (если есть открытые, конечно)
			if (!targetElement.closest('.menu__item') && document.querySelectorAll(".menu__item._hover").length > 0) {
				_removeClasses(document.querySelectorAll(".menu__item._hover"), "_hover");
			}
		}
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector(".search-form").classList.toggle("_active");
		} else if (!targetElement.closest('.search-form') && document.querySelectorAll(".search-form._active")) {
			document.querySelector(".search-form").classList.remove("_active");
		}
	}
}

// слайдер
// new Swiper('.swiper', {  //Класс должен быть указан блока, на который повешан слайдер
// 	//Навигация
// 	pagination: {
// 		el: '.swiper-pagination',
// 		// Буллеты
// 		//тип по умолчанию
// 		type: 'bullets',
// 		//можно ли на него нажимать
// 		clickable: true,
// 	},


// 	//Переключение с помощью клавиатуры
// 	keyboard: {
// 		//включить/выключить
// 		enabled: true,
// 		//Только когда слайдер в пределах вьюпорта вкдючить/выключить
// 		onlyInViewport: true,
// 		// Управление клавишами pageUp/pageDown включить/выключить
// 		pageUpDown: true,
// 	},


// 	// Переключение колесом мыши
// 	mousewheel: {
// 		// Чувствительность колеса мыши 0-не работает, можно больше 1
// 		sensitivity: 1,
// 		//Класс объекта на котором сработает прокрутка мышью
// 		// Если слайдеров много, они сработают все, в таком случае лучше оставлять по умолчанию
// 		eventsTarget: '.swiper', //Обычно класс тот же, что и сверху
// 	},


// 	// Количество слайдов для показа, можно указывать не целые числа, можно 'auto'-колво слайдеров выводится автоматически, в зависимости от контента или заданной ширины
// 	//slidesPerView: 1,


// 	// Если слайдов меньше чем нужно, слайдер полностью перестанет работать, пока будет нужного количества
// 	watchOverflow: true,


// 	// Отступ между слайдами
// 	spaceBerween: 20,


// 	// Активный слайдер по центру
// 	// centeredSlides: true,


// 	// Бесконечный слайдер
// 	//loop: true,


// 	// Свободный режим, можно листать в любое положение
// 	//freeMode:true,

// 	// Брейк поинты, работают по принципу мобайл ферст, срабатывают н аширине больще указанной
// 	// Этим способом нельзя координально измеить логику слайдера, например поменять горизонтальный скролл на вертикальный
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 		},
// 		1150: {
// 			slidesPerView: 2,
// 			keyboard: {
// 				enabled: false,
// 			},
// 			mousewheel: {
// 				enabled: false,
// 			},
// 		}
// 	}
// });


//перемещение лейбла у тегов форм
const formText = document.querySelector('.form-contacts__text'); //Блок, внутри котрого инпут и лэйбл, надо прописать стил при получении класса _active (типо лейбл уменьшаеьтся и перемещается выше)
if (formText != null) {
	addAnEvent(formText);
}

//Медиа запросы в js
const mediaQuery = window.matchMedia('(min-width: 768px)') //здесь пишем медиа запрос
function handleTabletChange(e) {
	if (e.matches) {
		console.log('Media Query Matched!')//здесь то, что должно выполниться при выполнении запроса
	}
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

//Меню бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu != null) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.icon-menu')) {
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			bodyLock();
			if (!menuBody.classList.contains('_active')) {
				bodyUnLock();
			}
		}
		if (!e.target.closest('.icon-menu') && !e.target.closest('._popup-link') && !e.target.closest('.popup__content') && !e.target.closest(".menu__arrow")) {
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			bodyUnLock();
		}
	});
};

//спойлеры
// const iconQuestions = document.querySelectorAll('.question');
// //const iconsQuestions = document.querySelectorAll('.question__icon');
// if (iconQuestions.length > 0) {
// 	spollers(iconQuestions);
// };
// function spollers(iconQuestions) {
// 	iconQuestions.forEach(iconQuestion => {
// 		iconQuestionBody(iconQuestion);
// 		iconQuestion.addEventListener('click', setSpollersAction)
// 	});
// }
// function iconQuestionBody(iconQuestion) {
// 	if (!iconQuestion.classList.contains('_active')) {
// 		iconQuestion.lastElementChild.hidden = true;
// 	}
// }
// function setSpollersAction(e) {
// 	const el = e.target;
// 	const spollerBlock = el.closest('.question');
// 	if (!spollerBlock.querySelectorAll('._slide').length) {
// 		if (el.classList.contains('question__icon')) {
// 			el.classList.toggle('_active');
// 			el.parentNode.classList.toggle('_active');
// 			spollerBlock.firstElementChild.classList.remove('_active');
// 			_slideToggle(spollerBlock.lastElementChild, 500);
// 		} if (el.classList.contains('question__title')) {
// 			spollerBlock.firstElementChild.classList.toggle('_active');
// 			el.parentNode.classList.toggle('_active');
// 			_slideToggle(spollerBlock.lastElementChild, 500);
// 		} if (el.classList.contains('question__text')) {
// 			el.parentNode.classList.remove('_active');
// 			el.previousElementSibling.classList.remove('_active');
// 			spollerBlock.firstElementChild.classList.remove('_active');
// 			_slideToggle(spollerBlock.lastElementChild, 500);
// 		} else {
// 			el.classList.toggle('_active');
// 			spollerBlock.firstElementChild.nextElementSibling.classList.toggle('_active');
// 			if (el.firstElementChild != null) {
// 				el.firstElementChild.classList.toggle('_active');
// 			}
// 			_slideToggle(spollerBlock.lastElementChild, 500);
// 		}
// 	}
// 	// e.preventDefault();
// }
// // function hideSpollerBody(spollerBlock) {
// // 	const spollerActiveTitle = spollerBlock.querySelector('.question__title._active');
// // 	if (spollerActiveTitle) {
// // 		spollerActiveTitle.classList.remove('_active');
// // 		_slideUp(spollerActiveTitle.nextElementSibling, 500);
// // 	}
// // }
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
// Другие спойлеры
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
//рейтинг звезд (на 5 звезд), при нажатии добавляется класс и ко всем следующим(блок надо перевернуть флексом, чтобы добавлялось к "предыдущим"), при повторном наведении сбрасывается, при уходе возвращается к предыдущему выбору.Каждой звезде надо задать id в обычном порядке, в одном рейтинге id 1.1, 1.2, 1.3 и т.д, в другом с другой цифры начинается
const stars = document.querySelectorAll('.star-rating');
let starActiv = new Array(5); //В этой переменной кол-во рейтингов + 1 (starActiv[0]) и сколько звезд в каком рейтинге выбрано
if (stars.length > 0) {
	for (let i = 0; i < stars.length; i++) {
		stars[i].addEventListener('click', function (e) {
			stars[i].classList.add('_active');
			let d = Number(e.target.id);
			starActiv[Math.floor(d)] = Math.round((Number(`${Math.floor(d)}.5`) - d) * 10);
			for (let j = 1; j <= 5; j++) {
				let newD = d + Number(`0.${j}`);
				if (newD == `${Math.floor(newD)}.6`) break;
				let elem = document.getElementById(newD.toFixed(1));
				if (elem != null) {
					elem.classList.add('_active');
				}
			};
		});
		stars[i].addEventListener('mouseover', function (e) {
			stars[i].classList.remove('_active');
			let d = Number(e.target.id);
			for (let j = 1; j <= 5; j++) {
				let newD = Number(`${Math.floor(d)}.${j}`);
				document.getElementById(newD.toFixed(1)).classList.remove('_active');
			};
		});
		stars[i].addEventListener('mouseout', function (e) {
			let d = Number(e.target.id);
			for (let j = 0; j <= starActiv[Math.floor(d)]; j++) {
				let newD = Number(`${Math.floor(d)}.5`) - Number(`0.${j}`);
				document.getElementById(newD).classList.add('_active');
			}
		});
	};
};
//Прокрутка к началу строници
const scrollToTop = document.querySelectorAll('.scroll-to-top');
if (scrollToTop.length > 0) {
	for (let index = 0; index < questionsX.length; index++) {
		scrollToTop[index].addEventListener('click', scrollTop());
	}
}
//прокрутка к блоку
const questions = document.querySelector('.questions');
const questionsX = document.querySelectorAll('.questions_scroll');
if (questionsX.length > 0) {
	for (let index = 0; index < questionsX.length; index++) {
		questionsX[index].addEventListener('click', () => scrollToBlock(questions));
	}
};
//анимация при скролле
const animItems = document.querySelectorAll('._anim-items');//этот класс добавляется к анимируемым объектам
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight; //высота объекта
			const animItemoffset = offset(animItem).top; //позиция объекта относительно верха
			const animStart = 4; //регулирует момент старта анимации, в данном случае при скролле 1/4 от высоты объекта

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > animItemoffset - animItemPoint) && scrollY < (animItemoffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) { //этот класс для того, чтобы не запускать анимацию повторно и не убирать класс _active
					animItem.classList.remove('_active');
				}
			}
		}
	}
	setTimeout(() => { //Если есть анимации на верхнем блоке, она покакжется без скролла через 0.3 сек
		animOnScroll();
	}, 300);
}
//Popups
//у попапа должен быть id с его названием, а у кнопки, по которой он открывается href='#{название поп-апа}'
let popupLink = document.querySelectorAll('._popup-link'); //этот класс добавляется ко всем кнопкам, на которых открывается поп-ап
const lockPadding = document.querySelectorAll('.lock-padding'); //Этот класс добавляется к фиксированным объектам, например к шапке
if (popupLink.length > 0) {
	for (let index = 0; index < popupLink.length; index++) {
		const el = popupLink[index];
		el.addEventListener('click', function (e) {
			let popupName = el.getAttribute('href').replace('#', '');
			let curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}
let popupCloseIcon = document.querySelectorAll('.popup__close');//этот класс добавляется для крестика, по которому поп-ап закрывается
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			if (menuBody.classList.contains('_active')) {
				popupClose(el.closest('.popup'), false);
			} else {
				popupClose(el.closest('.popup'));
			}
			e.preventDefault();
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		const popupActive = document.querySelector('.popup._active');
		if (menuBody.classList.contains('_active')) {
			popupClose(popupActive, false);
		} else {
			popupClose(popupActive);
		}
	}
});

//*< Функции>==========================================================================================
//Закрывает меню бургер
function menu_close() {
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
	bodyUnLock();
}
// Убирает переданный класс у переданного элемента
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
// Функция возвращает устройство на котором открыт сайт   isMobile.any()    вернет true, если сайт открыт на устройстве с тачскрином
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
// Функции для перемещения лейблов у тегов форм 
function addAnEvent(elem) {
	elem.firstElementChild.addEventListener('focus', function () {
		formAddClass(elem)
	});
	elem.firstElementChild.addEventListener('blur', function () {
		formRemoveClass(elem)
	});
}
function formAddClass(elem) {
	elem.classList.add('_active');
}
function formRemoveClass(elem) {
	const elemChildValue = elem.firstElementChild.value;
	if (elemChildValue == '') {
		elem.classList.remove('_active');
	}
}
//Прокрутка к началу строници
function scrollTop(e) {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
};
function scrollToBlock(block) { //в скобки передаем блок, до которого надо докрутить
	let getTop = block.getBoundingClientRect().top;
	let getTopDocument = getTop + window.scrollY;
	window.scrollTo({
		top: getTopDocument,
		left: 0,
		behavior: "smooth",
	});
};
//эта функция точно узнает местоположение объекта.Можно получить значение сверху и слева
function offset(el) { //в скобках объект, чье местоположение нужно
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//Открывает поп-ап
function popupOpen(curentPopup) { //В скобках попап, который надо открыть (найти его можно по айди)
	if (curentPopup && unlock) {
		let activePopup = document.querySelector('.popup._active');
		if (activePopup) {
			popupClose(activePopup, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('_active');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				e.stopPropagation();
				if (menuBody.classList.contains('_active')) {
					popupClose(e.target.closest('.popup'), false);
				} else {
					popupClose(e.target.closest('.popup'));
				}
			}
		});
	}
}
//Закрывает поп-ап
function popupClose(item, doUnlock = true) { //в скобках поп-ап, который надо закрыть и надо ли разблокировать прокрутку
	if (unlock) {
		item.classList.remove('_active');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
//Блокирует прокрутку
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock')

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Разблокировывает прокрутку
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock')
	}, 200);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Ставит картинку как фон
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();
//*</ Функции>==========================================================================================