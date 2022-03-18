"use strict"
//*< Общие переменные>==========================================================================================
const body = document.querySelector('body');
let unlock = true;
// Функция возвращает устройство на котором открыт сайт   isMobile.any()    вернет true, если сайт открыт на устройстве с тачскрином
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
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
		// Показ дополнительных блоков товаров
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains('actions-product__button')) {
			// В эту переменную получается уникальный дата атрибут, указанный у родителя кнопки
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		// Открытие корзины по нажатию на нее
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			// если в корзине ничего нет, она не откроется
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle("_active");
			}
			e.preventDefault();
			// Закрываем при нажатии на любое другое место, кроме кнопки дбавления в корзину
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove("_active")
		}
		// Удаление товара из корзины
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
	}
}
// слайдер
if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		//Навигация
		pagination: {
			el: '.controls-slider-main__dotts',
			// Буллеты
			//тип по умолчанию
			type: 'bullets',
			//можно ли на него нажимать
			clickable: true,
		},
		// Количество слайдов для показа, можно указывать не целые числа, можно 'auto'-колво слайдеров выводится автоматически, в зависимости от контента или заданной ширины
		slidesPerView: 1,
		// Если слайдов меньше чем нужно, слайдер полностью перестанет работать, пока не будет нужного количества
		watchOverflow: true,
		// Отступ между слайдами
		spaceBetween: 32,
		// Бесконечный слайдер
		loop: true,


		loopAdditionalSlides: 5,


		// Arrows
		navigation: {
			nextEl: ".slider-main .slider-arrow_next",
			prevEl: ".slider-main .slider-arrow_prev",
		},
		observer: true,
		observeParents: true,
		// Скорость
		speed: 800,
		preloadImages: false,
		// Парралакс эффект
		parallax: true,
	});
}
if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		//Навигация
		pagination: {
			el: '.slider-rooms__dotts',
			// Буллеты
			//тип по умолчанию
			type: 'bullets',
			//можно ли на него нажимать
			clickable: true,
		},
		// Количество слайдов для показа, можно указывать не целые числа, можно 'auto'-колво слайдеров выводится автоматически, в зависимости от контента или заданной ширины
		slidesPerView: 'auto',
		// Если слайдов меньше чем нужно, слайдер полностью перестанет работать, пока не будет нужного количества
		watchOverflow: true,
		// Отступ между слайдами
		spaceBetween: 24,
		// Бесконечный слайдер
		loop: true,

		loopAdditionalSlides: 5,


		// Arrows
		navigation: {
			nextEl: ".slider-rooms .slider-arrow_next",
			prevEl: ".slider-rooms .slider-arrow_prev",
		},
		observer: true,
		observeParents: true,
		// Скорость
		speed: 800,
		preloadImages: false,
		// Парралакс эффект
		parallax: true,
	});
}
if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		//Навигация
		pagination: {
			el: '.slider-tips__dotts',
			// Буллеты
			//тип по умолчанию
			type: 'bullets',
			//можно ли на него нажимать
			clickable: true,
		},
		// Количество слайдов для показа, можно указывать не целые числа, можно 'auto'-колво слайдеров выводится автоматически, в зависимости от контента или заданной ширины
		//slidesPerView: 3,
		// Если слайдов меньше чем нужно, слайдер полностью перестанет работать, пока не будет нужного количества
		watchOverflow: true,
		// Отступ между слайдами
		// spaceBetween: 32,
		// Бесконечный слайдер
		loop: true,

		loopAdditionalSlides: 5,


		// Arrows
		navigation: {
			nextEl: ".slider-tips .slider-arrow_next",
			prevEl: ".slider-tips .slider-arrow_prev",
		},
		observer: true,
		observeParents: true,
		// Скорость
		speed: 800,
		preloadImages: false,
		// Парралакс эффект
		parallax: true,
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15
			},
			600: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		},
	});
}
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
// header при скролле
const headerElement = document.querySelector(".header");
const callback = function (entries, observer) {
	if (entries[0].isIntersecting) {
		headerElement.classList.remove("_scroll")
	} else {
		headerElement.classList.add("_scroll")
	}
}
const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);
//спойлеры
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
		const spoller_activeTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spoller_activeTitle) {
			spoller_activeTitle.classList.remove('_active');
			_slideUp(spoller_activeTitle.nextElementSibling, 500);
		}
	}
}

// Галлерея
const furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
	console.log('hi');
	// Получаем двигающийся объект
	const furnitureItems = document.querySelector('.furniture__items');
	// Получаем все солонки, чтобы высчитать актуальную ширину контента
	const furnitureColumn = document.querySelectorAll('.furniture__column');
	// Скорость анимации, получаем из дата атрибута furniture__body
	const speed = furniture.dataset.speed;
	let positionX = 0;
	let coordXprocent = 0;

	function setMouseGalleryStyle() {
		// Перебираем все колонки, чтобы узнать актуальный размер галлереи
		let furnitureItemsWidth = 0;
		furnitureColumn.forEach(element => {
			furnitureItemsWidth += element.offsetWidth;
		});
		// Получаем разницу ширин всего контента и видимой части
		const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
		// В этой константе смещение положения
		const distX = Math.floor(coordXprocent - positionX);
		// Вычисляем позицию относительно разницы шиирин
		positionX = positionX + (distX * speed);
		let position = furnitureDifferent / 200 * positionX;

		furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`
		// Cледующий код будет работать, только если есть что двигать, благодаря условию
		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setMouseGalleryStyle);
		} else {
			furniture.classList.remove('_init');
		}
	}
	furniture.addEventListener('mousemove', function (e) {
		// получаем видимую ширину
		const furnitureWidth = furniture.offsetWidth;
		// Ноль, когда курсор по середине
		const coordX = e.pageX - furnitureWidth / 2;
		coordXprocent = coordX / furnitureWidth * 200;
		if (!furniture.classList.contains('_init')) {
			requestAnimationFrame(setMouseGalleryStyle);
			furniture.classList.add('_init');
		}
	})
}
//*< Функции>==========================================================================================
// Убирает переданный класс у переданного элемента
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
// Показ дополнительных блоков товаров
// Асинхронная функция (async), потому что будем использовать технологию айджекс с помощью fetch
async function getProducts(button) {
	if (!button.classList.contains("_hold")) {
		// Этот класс нужен,чтобы избежать повторных нажатий, если бы запрос шол на бэкэнд и занимал бы время
		button.classList.add("_hold");
		// прописываем путь к файлу json
		const file = "json/products.json";
		// GET запрос этого к этому пути
		let response = await fetch(file, {
			method: "GET"
		});
		// Если файл найден и все ок, идем дальше
		if (response.ok) {
			// Подгружаем в переменную содержание указанного выше файла в формате json
			let result = await response.json();
			loadProducts(result);
			button.classList.remove("_hold");
			// Удаляем саму кнопку, чтобы не нажать на нее повторно (Если бы это был реальный проект, то все подружалось бы с бекэнда и кнопку удалять не пришлось бы)
			button.remove();
		} else {//Если с файлом какие-то проблемы, просто выводим сообщение
			alert("Ошибка");
		}
	}
}
function loadProducts(data) {
	const productsItems = document.querySelector(".products__items");
	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productTitle = item.title;
		const productText = item.text;
		const productLabels = item.labels;
		const productImage = item.image;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productShareUrl = item.shareUrl;
		const productLikeUrl = item.likeUrl;

		let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
		let productTemplateEnd = `</article>`;

		let productTemplateLabels = '';
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="item-product__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
			});
			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;

		}

		let productTemplateImage = `
	<a href="${productUrl}" class="item-product__image _ibg">
		<img src="img/products/${productImage}" alt="${productTitle}">
	</a>
		`;

		let productTemplateBodyStart = `<div class="item-product__body">`;
		let productTemplateBodyEnd = `</div>`;
		let productTemplateBodyContent = `
	<div class="item-product__content">
		<h5 class="item-product__title">${productTitle}</h5>
		<div class="item-product__text">${productText}</div>
	</div>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="item-product__prices">`;
		let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
		let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productPriceOld}</div>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices = productTemplatePricesStart;
		productTemplatePrices += productTemplatePricesCurrent;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateActions = `
	<div class="item-product__actions actions-product">
		<div class="actions-product__body">
			<a href="" class="actions-product__button btn btn_white">Add to cart</a>
			<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
			<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
		</div>
	</div>
		`;

		let productTemplateBody = "";
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateBodyContent;
		productTemplateBody += productTemplatePrices;
		productTemplateBody += productTemplateActions;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate = productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
		_ibg();
	})
}
// Функция анимации добавления товара к корзину
function addToCart(productButton, productId) {
	// Проверка на наличие класса холд, чтобы избежать кучи нажатий
	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold');
		productButton.classList.add('_fly');

		// Получаем иконку корзины, айди товара, на который нажали и картинку этого товара
		const cart = document.querySelector('.cart-header__icon');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const productImage = product.querySelector('.item-product__image');
		// Клонируем картинку товара, чтобы клон "улетел"
		const productImageFly = productImage.cloneNode(true);
		// Получаем размеры и положение оригинальной картинки
		const productImageFlyWidth = productImage.offsetWidth;
		const productImageFlyHeight = productImage.offsetHeight;
		const productImageFlyTop = productImage.getBoundingClientRect().top;
		const productImageFlyLeft = productImage.getBoundingClientRect().left;
		// Меняем класс у клона 
		productImageFly.setAttribute('class', '_flyImage _ibg');
		// Добавляем эти размеры и положение к клону
		productImageFly.style.cssText = `
			left:${productImageFlyLeft}px;
			top:${productImageFlyTop}px;
			width:${productImageFlyWidth}px;
			height:${productImageFlyHeight}px;`;
		// Добавляем клон в самый конец тега боди
		document.body.append(productImageFly);
		// отправляем клон в корзину, получая перед этим ее позицию
		const cartFlyLeft = cart.getBoundingClientRect().left;
		const cartFlyTop = cart.getBoundingClientRect().top;
		productImageFly.style.cssText = `
			left:${cartFlyLeft}px;
			top:${cartFlyTop}px;
			width:0px;
			height:0px;
			opacity: 0;`;
		_ibg();
		productImageFly.addEventListener('transitionend', function () {
			if (productButton.classList.contains('_fly')) {
				productImageFly.remove();
				updateCart(productButton, productId)
				productButton.classList.remove('_fly');
			}
		})
	}
}
// Добавляет/удаляет товары в корзину
// При удалении в выхове функции надо 3 параметром указать false
function updateCart(productButton, productId, productAdd = true) {
	const cart = document.querySelector('.cart-header');
	const cartIcon = cart.querySelector('.cart-header__icon');
	const cartQuantity = cartIcon.querySelector('span');
	const cartProduct = document.querySelector(`[data-cart-pid='${productId}']`);
	const cartList = document.querySelector('.cart-list');
	// Добавление товара
	if (productAdd) {
		// Если спан существует, мы увеличиваем его значение на единицу
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;
		} else { //Если спана нет, добавляем его со значением 1
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
		}
		// Если в карзине нет товара, на котрый мы нажимаем товара, мы добавляем его, используя контент оригинального товара
		if (!cartProduct) {
			const product = document.querySelector(`[data-pid='${productId}']`);
			const cartProductImage = product.querySelector('.item-product__image').innerHTML;
			const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
			// Пишем HTML код внутренностей карточки товара
			const cartProductContent = `
		<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
		<div class="cart-list__body">
			<a href="" class="cart-list__title">${cartProductTitle}</a>
			<div class="cart-list__quantity">Quantity: <span>1</span></div>
			<a href="" class="cart-list__delete">Delete</a>
		</div>`;
			// Добавляем в конец списка пункт, внутри которого предыдущий HTML код
			cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`);
			_ibg();
		} else {
			// Если в корзине уже есть добавляемый товар, тогда увеличиваем значение в спане
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
		}
		// После всех действий отбираем класс холд у кнопки добавления в корзину, чтобы можно было еще добавить этот в корзину
		productButton.classList.remove('_hold');
	} else {
		const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
		cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
		if (!parseInt(cartProductQuantity.innerHTML)) {
			cartProduct.remove();
		}
		const cartQuantityValue = --cartQuantity.innerHTML;

		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue;
		} else {
			cartQuantity.remove();
			cart.classList.remove('_active');
		}
	}
}
//эта функция точно узнает местоположение объекта.Можно получить значение сверху и слева
function offset(el) { //в скобках объект, чье местоположение нужно
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//Блокирует прокрутку
var lockPadding = document.querySelectorAll('.lock-padding');
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
function _ibg() {
	let _ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < _ibg.length; i++) {
		if (_ibg[i].querySelector('img')) {
			_ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
_ibg();
//*</ Функции>==========================================================================================