function toggleForm() {
    const overlay = document.getElementById("overlay");
    const formContainer = document.getElementById("address-form-container");
    const isFormVisible = overlay.style.display === "block";
    const openformbutton = document.getElementById("open-form-button")
    openformbutton.style.display = "none"

    overlay.style.display = isFormVisible ? "none" : "block";
    formContainer.style.display = isFormVisible ? "none" : "block";
    openformbutton.style.display = isFormVisible ? "block" : "none";
}

// Закрытие формы при клике на затемненный фон
document.getElementById("overlay").addEventListener("click", toggleForm);
var map = L.map('map', {

    zoomControl: true // Disable zoom controls
}).setView([52.4345, 30.9754], 13);
map.attributionControl.remove();
// Добавление тайлов OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(map);

var markers = []; // Массив для хранения данных о маркерах
var markerObjects = {}; // Объекты маркеров на карте

// Определяем иконки для каждого типа места
var gymIcon = L.icon({
    iconUrl: 'image/gym.png', // Укажите путь к иконке спортзала
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var clubIcon = L.icon({
    iconUrl: 'image/night-club.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var restIcon = L.icon({
    iconUrl: 'image/restaurant.png', // Укажите путь к иконке бара
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var karaokeIcon = L.icon({
    iconUrl: 'image/singer.png', // Укажите путь к иконке караоке
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var musicIcon = L.icon({
    iconUrl: 'image/music.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var basketballIcon = L.icon({
    iconUrl: 'image/basketball.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var cinemaIcon = L.icon({
    iconUrl: 'image/cinema.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var footballIcon = L.icon({
    iconUrl: 'image/football.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var voleyballIcon = L.icon({
    iconUrl: 'image/voleyball.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var theaterIcon = L.icon({
    iconUrl: 'image/theater.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var fitnessIcon = L.icon({
    iconUrl: 'image/fitness.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var eventsIcon = L.icon({
    iconUrl: 'image/events.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var shopIcon = L.icon({
    iconUrl: 'image/shop.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var brsmIcon = L.icon({
    iconUrl: 'image/brsm.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var studiesIcon = L.icon({
    iconUrl: 'image/studies.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
// Сохранение маркеров в localStorage
function saveMarkers() {
    localStorage.setItem('markers', JSON.stringify(markers));
}

// Загрузка маркеров из localStorage
function loadMarkers() {

    var savedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (savedMarkers) {
        markers = savedMarkers;
        markers.forEach(function (markerData, index) {
            var iconType = chooseIcon(markerData.type);
            var marker = L.marker([markerData.lat, markerData.lon], { icon: iconType }).addTo(map);
            marker.bindPopup(createPopupContent(markerData, index));
            markerObjects[index] = marker; // Сохраняем объект маркера для дальнейшего доступа
        });
    }
}



// Выбор иконки в зависимости от типа места
function chooseIcon(type) {
    switch (type) {
        case 'gym':
            return gymIcon;
        case 'club':
            return clubIcon;
        case 'rest':
            return restIcon;
        case 'karaoke':
            return karaokeIcon;
        case 'music':
            return musicIcon;
        case 'basketball':
            return basketballIcon;
        case 'cinema':
            return cinemaIcon;
        case 'football':
            return footballIcon;
        case 'voleyball':
            return voleyballIcon;
        case 'theater':
            return theaterIcon;
        case 'fitness':
            return fitnessIcon;
        case 'shop':
            return shopIcon;
        case 'brsm':
            return brsmIcon;
        case 'studies':
            return studiesIcon;
        case 'events':
            return eventsIcon;

        default:
            return L.icon({
                iconUrl: 'default-icon.png', // Укажите путь к иконке по умолчанию
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
    }
}



function createImageSlider(images) {
    if (!images || images.length === 0) return '';

    let imageSliderHtml = `<div class="image-slider">`;
    images.forEach((imgSrc, index) => {
        imageSliderHtml += `<div class="slide" style="display: ${index === 0 ? 'block' : 'none'};">
                                <img src="${imgSrc}">
                            </div>`;
    });
    imageSliderHtml += `
        <button class="prev" onclick="changeSlide(-1)">❮</button>
        <button class="next" onclick="changeSlide(1)">❯</button>
    </div>`;
    return imageSliderHtml;
}

// Переключение слайдов
let currentSlideIndex = 0;
function changeSlide(sliderIndex, n) {
    let slider = document.getElementById(`slider-${sliderIndex}`);
    let slides = slider.getElementsByClassName('slide');
    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    // Убираем класс active с текущего слайда
    slides[currentIndex].classList.remove('active');

    // Вычисляем следующий слайд и добавляем ему класс active
    let nextIndex = (currentIndex + n + slides.length) % slides.length;
    slides[nextIndex].classList.add('active');
}
// Создание содержимого всплывающего окна с кнопкой удаления
// Создание содержимого всплывающего окна с кнопкой удаления
function createPopupContent(markerData, index) {
    let infoHtml = markerData.info
        ? `<div class="info-container"><br>${markerData.info}</div>`
        : '';
    let infolink = markerData.link ? `${markerData.link}` : ''
    let nameHtml = markerData.name
        ? `<b>${markerData.name}</b> <br>`
        : '';
    let deleteButtonHtml = markerData.isPreset
        ? ''
        : `<br><button class='image-btn' onclick="deleteMarker(${index})">Удалить маркер</button>`;
    // // Генерация слайдера изображений
    let imageHtml = '';
    if (Array.isArray(markerData.image) && markerData.image.length > 0) {
        imageHtml += `<div class="slider" id="slider-${index}">`;
        markerData.image.forEach((img, imgIndex) => {
            imageHtml += `
            <div class="slide ${imgIndex === 0 ? 'active' : ''}">
                <img class="image-slide" src="${img}">
            </div>`;
        });
        imageHtml += `
        <button class="prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
        <button class="next" onclick="changeSlide(${index}, 1)">&#10095;</button>
    </div>`;
    }
    let type = markerData.markerType? `<div class="infoocontainer">${markerData.markerType}</div>` : '';
    return `${nameHtml}${markerData.address}${infoHtml}${imageHtml}${type}${infolink}${deleteButtonHtml}`;
}






// Функция для удаления маркера
function deleteMarker(index) {
    // Проверка, является ли маркер предустановленным
    if (markers[index].isPreset) {
        alert('Предустановленные маркеры нельзя удалить.');
        return;
    }

    // Удаляем маркер с карты
    map.removeLayer(markerObjects[index]);
    delete markerObjects[index];

    // Удаляем данные маркера из массива и обновляем localStorage
    markers.splice(index, 1);
    saveMarkers();

    // Обновляем индексы маркеров
    updateMarkers();
}

// Обновление маркеров после удаления
function updateMarkers() {
    // Очищаем все маркеры с карты
    for (var key in markerObjects) {
        map.removeLayer(markerObjects[key]);
    }
    markerObjects = {};

    // Перерисовываем маркеры с обновленными индексами
    markers.forEach(function (markerData, index) {
        var iconType = chooseIcon(markerData.type);
        var marker = L.marker([markerData.lat, markerData.lon], { icon: iconType }).addTo(map);
        marker.bindPopup(createPopupContent(markerData, index));
        markerObjects[index] = marker;
    });

}


// Функция для геокодирования адреса с помощью Nominatim
async function getCoordinates(address) {
    if (!address || address.trim().length < 3) {
        alert('Введите корректный адрес (не менее 3 символов).');
        return null;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Гомель, Беларусь')}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            alert('Ошибка сети. Попробуйте позже.');
            console.error('Ошибка ответа от сервера:', response.status);
            return null;
        }

        const data = await response.json();

        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            if (isNaN(lat) || isNaN(lon)) {
                alert('Получены некорректные координаты. Проверьте адрес.');
                return null;
            }

            return { lat, lon };
        } else {
            alert('Адрес не найден. Уточните ваш запрос.');
            return null;
        }
    } catch (error) {
        alert('Произошла ошибка при обработке запроса. Проверьте соединение с интернетом.');
        console.error('Ошибка геокодирования:', error);
        return null;
    }
}

// Проверка, находятся ли координаты в пределах Гомеля
function isWithinGomel(lat, lon) {
    var minLat = 52.3500;
    var maxLat = 52.5000;
    var minLon = 30.8500;
    var maxLon = 31.0500;

    return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
}

// Функция для добавления фона только новым маркерам
function background(marker, markerData) {
    const markerElement = marker._icon; // Доступ к HTML-элементу маркера
    if (markerElement && !markerData.active) { // Проверяем, что маркер неактивен
        markerElement.classList.add('marker-with-background'); // Добавляем фон

        // Добавляем обработчик клика для изменения активности и удаления фона
        markerElement.addEventListener('click', () => {
            if (!markerData.active) {
                markerData.active = true; // Устанавливаем активность маркера
                markerElement.classList.remove('marker-with-background'); // Убираем фон
            }
        }, { once: true }); // Обработчик срабатывает только один раз
    }
}

// Обновленная функция findAddress
function findAddress() {
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;
    const markerType = document.getElementById('marker-type').value;

    if (!selectedType) {
        alert('Пожалуйста, выберите тип места перед добавлением маркера.');
        return;
    }

    if (address.trim() === "") {
        alert('Введите адрес.');
        return;
    }

    getCoordinates(address).then(coords => {
        if (coords && isWithinGomel(coords.lat, coords.lon)) {
            const markerData = {
                lat: coords.lat,
                lon: coords.lon,
                address: address,
                info: message,
                markerType: markerType,
                type: selectedType,
                active: false, // Новый маркер неактивен
                // image: img || [] 
            };

            const iconType = chooseIcon(selectedType);

            // Добавляем новый маркер с сообщением и выбранной иконкой
            const marker = L.marker([coords.lat, coords.lon], { icon: iconType }).addTo(map);
            const index = markers.length; // Индекс нового маркера
            marker.bindPopup(createPopupContent(markerData, index));
            markerObjects[index] = marker;

            markers.push(markerData); // Сохраняем данные о маркере
            saveMarkers(); // Сохраняем маркеры в localStorage
            // Перемещаем карту к маркеру
            map.setView([coords.lat, coords.lon], 13);
            background(marker, markerData); // Устанавливаем фон только для нового маркера
            // Закрываем форму
            toggleForm();
        } else {
            alert('Адрес не находится в пределах Гомеля.');
        }
    });
}




let selectedType = null; // Переменная для хранения выбранного типа места

const imageButtons = document.querySelectorAll('.btn-image, .btn-image-sort');

// Обрабатываем клики по кнопкам
imageButtons.forEach((button) => {
    button.addEventListener('click', function () {
        // Снимаем выделение со всех кнопок
        imageButtons.forEach(btn => btn.classList.remove('selected'));

        // Добавляем класс 'selected' к нажатой кнопке и сохраняем тип
        this.classList.add('selected');
        selectedType = this.getAttribute('data-type'); // Сохраняем тип места
    });
});
document.getElementById('address').addEventListener('input', async function () {
    const query = this.value.trim();

    if (query.length < 3) {
        clearSuggestions(); // Убираем подсказки, если ввод короткий
        return;
    }

    const suggestions = await getSuggestions(query);

    if (suggestions.length > 0) {
        showSuggestions(suggestions);
    } else {
        clearSuggestions(); // Если ничего не найдено
    }
});


// Получение подсказок с помощью Nominatim
async function getSuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Гомель')}&format=json&addressdetails=1&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const uniqueSuggestions = new Set(); // Уникальные адреса
        const results = data
            .map((item) => {
                const address = item.address;

                // Извлекаем только нужные части адреса
                const road = address.road || ''; // Улица
                const houseNumber = address.house_number || ''; // Номер дома

                // Формируем строку адреса (только улица, дом и город)
                let suggestion = `${road}${houseNumber ? ',' + houseNumber : ''}`;
                
                return suggestion.trim(); // Убираем лишние пробелы
            })
            .filter((suggestion) => {
                if (!uniqueSuggestions.has(suggestion) && suggestion) {
                    uniqueSuggestions.add(suggestion);
                    return true;
                }
                return false;
            });

        return results; // Возвращаем уникальные результаты
    } catch (error) {
        console.error('Ошибка получения подсказок:', error);
        return [];
    }
}


// Отображение подсказок
function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = suggestions
        .map((suggestion) => `<div class="suggestion-item">${suggestion}</div>`)
        .join('');

    // Добавляем обработчики для выбора подсказки
    document.querySelectorAll('.suggestion-item').forEach((item) => {
        item.addEventListener('click', function () {
            document.getElementById('address').value = this.textContent;
            clearSuggestions();
        });
    });

    // Показываем контейнер
    suggestionsContainer.style.display = 'block';
}

// Очистка подсказок
function clearSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
}

// Убедись, что контейнер для подсказок добавлен
if (!document.getElementById('suggestions')) {
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestions';
    suggestionsContainer.className = 'suggestions-container';
    document.body.appendChild(suggestionsContainer);
}


// Добавляем предустановленные маркеры
function filterMarkers(type) {
    console.log(`Selected type: ${type}`);

    // Удаляем все существующие маркеры с карты
    for (let key in markerObjects) {
        map.removeLayer(markerObjects[key]);
    }
    markerObjects = {}; // Очищаем объект для отслеживания маркеров на карте

    // Отображаем маркеры по типу
    markers.forEach((markerData, index) => {
        if (type === "all" || markerData.type === type) {
            const iconType = chooseIcon(markerData.type);
            const marker = L.marker([markerData.lat, markerData.lon], { icon: iconType }).addTo(map);
            marker.bindPopup(createPopupContent(markerData, index));
            markerObjects[index] = marker; // Сохраняем объект маркера
        }
    });
}



function addPresetMarkers() {
    var places = [
        //GYM
        { lat: 52.4052, lon: 30.9215, name: 'Адреналин', address: 'улица Гагарина 65,', type: 'gym', info: 'Телефон:+375 (44)512-23-05 <br> Понедельник-пятница: 07.00 — 23.00 <br> Суббота, воскресенье: 09.00 — 21.00 <br>Решили избавиться от лишних килограммов или набрать желаемую массу?А может просто хотите укрепить здоровье?Мы знаем, как помочь вам достичь цели!',image: ['image/adrenalin/razdivalka-adrenalin.jpg','image/adrenalin/reception-adrenalin.jpg','image/adrenalin/zal-adrenalin.jpg','image/adrenalin/zal2-adrenalin.jpg','image/adrenalin/zal3-adrenalin.jpg'],link:"<a href='https://gomel.adrenalin-fitness.by/' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4248, lon: 31.0105, name: 'Фитнес-клуб Кенгуру', address: 'пр-т. Ленина 3', type: 'gym', info: 'Если Вы давно мечтали иметь спортивную фигуру, хорошую растяжку и крепкое здоровье, то фитнес-клуб «Кенгуру» для Вас! Финтес-клуб в самом центре Гомеля Мы создали оптимальную атмосферу, которая способствует занятию фитнесом и силовыми нагрузками. У нас каждый сможет найти полезное увлечение на свой вкус, ведь мы предоставляем множество привлекательных возможностей для формирования идеальной фигуры:<br> 👟 Тренажерный зал <br>👟 Кардио зал <br>👟 Боксерский мешок <br>👟 Зал для групповых занятий <br>👟 Степ аэробика, степ+сила <br>👟 Body sculpt, Body training, Body шейпинг, интервальные тренировки, Табата, Body slim <br>👟 Zumba <br>👟 Cтретчинг <br>👟 Марафон похудения <br>👟 мини-группы в тренажерном зале <br>В «Кенгуру» работают профессиональные тренеры, которые помогут Вам индивидуально определиться с необходимой нагрузкой и расскажут, что представляет собой каждый вид занятий и какую пользу он может принести.После тренировки Вы сможете принять у нас расслабляющий душ в удобных душевых кабинках. В нашем фитнес-клубе отдельные раздевалки с индивидуальными шкафчиками. С нами Ваша фигура станет гибкой и стройной, а мышцы приобретут упругость и силу💪. Вы сможете укрепить свое здоровье и поднять свою выносливость на новый уровень! <br>г.Гомель пр.Ленина 3 <br>Контакты:☎ 29-52-97,📱 8(044)7 21 88 75',image: ['image/kenguru/location.jpg', 'image/kenguru/zal.jpg', 'image/kenguru/zal2.jpg', 'image/kenguru/zal3.jpg'],link:"<a href='https://www.instagram.com/kenguru_gomel?utm_medium=copy_link' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4093, lon: 30.9484, name: 'Тренажерный зал "Maximus"', address: 'Волгоградская ул. 5,', type: 'gym', info: 'Режим работы:<br>Понедельник - Пятница 9:00-22:00 <br>Суббота 10.00-18.00 <br>Воскресенье 10.00-18.00 <br>Для дополнительной информации звоните по телефону +375(29) 193-42-83(Кирилл) <br>СТОИМОСТЬ ЗАНЯТИЙ :<br>1 занятие - 4,5 р <br>8 занятий - 32 р <br>14 занятий - 53 р <br>42 занятия -140 р <br>безлимитный - 60 р <br>1 занятие для учащихся -3,5 р <br>8 занятий для учащихся- 26 р <br>14 занятий для учащихся- 45 р <br>42 занятия для учащихся-120 р <br>безлимитный-50 р <br>Персональная тренировка 12 р <br>Персональная тренировка СПЛИТ 18 р <br>8 персональных тренировок 84 р <br>8 персональных тренировок СПЛИТ 126 р <br>14 персональных тренировок 144 р <br>14 Персональных тренировок СПЛИТ 216 р <br>(Суммы указанные за персональные тренировки без учёта стоимости зала ) <br>Абонементы на 8,14 и 42 действуют пока не отходить все занятия, не зависимо от месяца в течение года , а безлимитный действует в течение месяца с числа по число)',image: ['image/maximus/zal-maximus.jpg', 'image/maximus/zal2-maximus.jpg','image/maximus/ganteli-maximus.jpg'],link:"<a href='https://vk.com/maximusmass' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4024, lon: 30.9202, name: 'Фитнес-клуб "Joker Gym" тренажерный зал', address: 'ул. 70 лет БССР дом 2а', type: 'gym', info: 'Телефон: +375298213193 <br> Режим работы: пон-пят 8:30.00-21.00 <br> суб 9:30.00-17.00 вс ВЫХОДНОЙ', image: ['image/joker/Joker.jpg', 'image/joker/Joker2.jpg'],link:"<a href='https://vk.com/jokergym' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4228, lon: 31.0012, name: 'Атлет фитнес-центр', address: 'улица Гагарина 57', type: 'gym', info: 'Мы работаем, чтобы вы были красивыми и здоровыми! <br>Предлагаем:<br>- оборудованный зал для функциональных и силовых тренировок;<br>- индивидуальные или сплит занятия с опытным тренером;<br>- программу тренировок на 1-6 месяцев с коррекцией по промежуточным результатам;<br>- программу питания на 1-6 месяцев;<br>- спортивное питание.<br>Приходите:<br>- чтобы похудеть;<br>- набрать мышечную массу;<br>- подготовиться к соревнованиям;<br>- укрепить здоровье и иммунитет;<br>- восстановиться посте травмы или болезни;<br>- проработать проблемные участки тела;<br>- заниматься полезным хобби и для разрядки.<br>Мы ценим наших постоянных клиентов и очень рады новым – приходите!<br>ул. Гагарина, 57 ул. Головацкого, 136 <br>тел +375 (29) 1771383, +375 (44) 777-91-55',image: ['image/atlet/carikova-atlet.jpeg', 'image/atlet/carikova2-atlet.jpeg', 'image/atlet/gagarina-atlet.png', 'image/atlet/gagarina2-atlet.png'],link:"<a href='https://atlet-gomel.by/' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4259, lon: 31.0133, name: 'Фитнес-клуб DMFITNESS', address: 'ул. Трудовая 3а', type: 'gym', info: 'Расписание занятий:<br>Понедельник - Воскресенье: 10:00-22:00 <br>Полное расписание тренировок смотрите в мобильном приложении DMFITNESS.BY <br>Стоимость:<br>Пробный месяц занятий -65 руб <br>Разовое посещение - 15 руб <br>4 занятия в месяц - 40 руб <br>8 занятий в месяц - 70 руб/60 руб* <br>12 занятий в месяц - 80 руб <br>Безлимитное посещение 1 месяц - 85 руб/70 руб*<br>Безлимитное посещение 3 месяца - 180 руб <br>Безлимитное посещение 6 месяцев - 300 руб<br>Безлимитное посещение 9 месяцев - 400 руб<br>Безлимитное посещение 12 месяцев - 500 руб<br>Индивидуальная тренировка с тренером - 25 руб<br>Блок из 10 индивидуальных тренеровок с тренером - 250 руб<br>Блок из 20 индивидуальных тренеровок с тренером - 400 руб* <br>- для студентов <br>Телефон:+375 29 134-05-06',image: ['image/dmfitness/grupa.jpg', 'image/dmfitness/grupa2.jpg', 'image/dmfitness/grupa3.jpg'],link:"<a href='https://www.dmfitness.by/' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4252, lon: 31.0083, name: 'ФИТНЕС INGRAVITY', address: 'пр-т. Ленина 10', type: 'gym', info: ' Телефон: +375 (44) 5 439 439 <br> Фитнес Спа Центр INGRAVITY включает в себя три спортивных зала для групповых фитнес тренировок со всем необходим и современным оборудованием, СПА зону, банную зону, зона массажа и релакса, а также кабинет лазерной эпиляции. <br>В Фитнес СПА INGRAVITY к вашим услугам:<br>- Три полностью укомплектованных спортивных зала и профессиональные инструктора с соответствующим образованием;<br>- Фито-парная \"Кедровая бочка\";<br>- Подводный массаж в специализированной ванне с использованием Европейского оборудования, все виды ручного массажа;<br>- Комплексные SPA-программы<br>- Лазерная эпиляция на современном аппарате для удаления волос 2023 года, три отдельные манипулы для каждой зоны, в том числе зоны ушей и носа, мастера с медицинским образованием.<br>INGRAVITY предлагает комплексный подход для любых целей и желаний: хотите ли вы похудеть, укрепить здоровье, избавиться от негатива, расслабиться, побаловать себе SPA уходом и релаксом, или просто желаете провести весело время с пользой для здоровья в крутой тусовке Гомеля - наши двери открыты для всех желающих и ждём вас всех в гости.',image: ['image/ingravity/ABL.jpg', 'image/ingravity/jumping.jpg', 'image/ingravity/trx.jpg'],link:"<a href='https://aeroyoga.by/' target='_blank' class='link'>подробнее...</a>" },

        //CLUB
        { lat: 52.4123, lon: 30.9542, name: 'стейк бар ATLANTA', address: 'Речицкий просп. 24', type: 'club', info: 'Тел.+375 444 888 383 <br>Пт.Сб. пред. и праздничные дни<br>14:00 до 04:00 с Караоке и Дискотекой<br>Вс.14:00 до 23:00/02:00 по предзаказу<br>Ср.Чт. 14:00 до 23:00',image: ['image/atlanta/place.jpg', 'image/atlanta/pathy.jpg', 'image/atlanta/bar.jpg'],link:"<a href='https://vk.com/steakbar_atlanta#' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4041, lon: 30.9605, name: 'Чисто Пивной Ресторанчик', address: 'улица Братьев Лизюковых 4А', type: 'club', info: 'Уютный интерьер, выполненный в деревянном стиле, живая музыка, авторская кухня, и главное – пиво собственного приготовления.<br>Отличная кухня и обилие сортов янтарного напитка порадует даже искушенных ценителей. Главное отличие «Чисто пивного» - собственная Пивоварня.<br>Основное меню дополнено огромным выбором закусок к пиву на любой вкус и кошелек.<br>В нашем ресторане вы сможете насладиться корпоративными праздниками или просто приятно провести время с друзьями за просмотром самых крупных спортивных трансляций.<br>Всегда рады видеть Вас в нашем «Чисто Пивном Ресторанчике»!<br>тел. +375 29 1939393<br>e-mail: restaraunt@4isto.by',image: ['image/pivnoi-restoran/pivnoi.jpg','image/pivnoi-restoran/gitar.jpg','image/pivnoi-restoran/grupa.jpg', 'image/pivnoi-restoran/pathy.jpg'],link:"<a href='https://4isto.by/chisto-pivnoj-restoranchik.html' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4245, lon: 31.0044, name: 'Black Bar', address: 'улица Катунина 14', type: 'club', info: 'The Black Bar" - место ежедневных встреч с друзьями в центре города!<br>• Удобное расположение в центре города<br>• Парковка<br>• Бесплатный Wi-Fi<br>• Основной зал (38 посадочный мест)<br>• Lounge зал (13 посадочных мест)<br>• Летняя терраса (40 посадочных мест)<br>• Приятная фоновая музыка<br>• Европейская , Итальянская, Японская кухня<br>• Обеденное меню (12:00-17:00)<br>• Коктейльная, кофейная, чайная карта<br>• Разливное пиво<br>• Настольные игры<br>• Вежливый персонал<br>• Дымные кальяны<br>• Cashback постоянным посетителям 10%<br>• Скидки 50% на акционные сеты<br>• Фотозона<br><br>Телефон для брони столов:<br>• +375(44)480-80-80<br>Телефон доставки Black Food:<br>• +375(33)325-66-77<br>Время работы бара:<br>• Пн-Чт 12:00-00:00<br>• Пт-Вс 12:00-02:00',image: ['image/black-bar/tiktok.jpg','image/black-bar/bar.jpg','image/black-bar/zal.jpg', 'image/black-bar/zal-plasma.jpg','image/black-bar/zal-drev.jpg'],link:"<a href='http://blackbar.by/menu.html' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4502, lon: 31.0227, name: 'Спорт Бар в Гомеле', address: 'улица Мазурова 30', type: 'club', info: 'Основная идея бара — просмотр спортивных трансляций без пафоса и излишеств. Только спорт и напитки — что еще нужно для приятного и комфортного времяпрепровождения? Телефон:+375 (44) 703-71-97',image: ['image/sport-bar/zal.jpg', 'image/sport-bar/gosti.jpg', 'image/sport-bar/ps.jpg', 'image/sport-bar/plasma.jpg'],link:"<a href='https://vk.com/sport_bar_gomel' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4505, lon: 31.0229, name: 'Victory', address: 'улица Мазурова 30', type: 'club', info: 'Телефон:+375 29 644-11-70 <br>Игровой клуб «Victory» — это место, где действительно рады каждому Гостю. Мы готовы предложить Вам целый спектр развлекательных услуг: современные оригинальные игровые автоматы с разнообразыми играми на любой вкус, рулетку EGT-PR8 с системой глобального джекпота, круглосуточный бар, угощения, шоу-программы и тематические вечеринки!',image: ['image/victory/alko.jpg','image/victory/avtomat.jpg', 'image/victory/ruletka.jpg'],link:"<a href='https://victoryclub.by/?utm_source=google&utm_medium=gmb&utm_campaign=main' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4272, lon: 31.0200, name: 'Бар Квартирник', address: 'Билецкий спуск 1', type: 'club', info: 'Инфа и бронь: +375 (44) 766 02 99<br>Бар высокой культуры и быта — открытое пространство для музыкантов, художников, поэтов, писателей и театралов, в котором царят разнообразие и импровизация. Каждый вечер у нас встречаются друзья для общения, концертов, и, конечно же, для веселья на наших вечеринках.<br>Нам важно, чтобы каждый чувствовал себя непринужденно и комфортно, поэтому для многих «Квартирник» станет местом для отдыха после рабочего дня, для встреч с друзьями и для новых знакомств. Любое общение в «Квартирнике» особенно приятно и вкусно с разнообразными закусками, бокальчиком пива или порцией доброго виски.<br>Для вас всегда найдется свободное место!<br>Пн-Ср 16:00-00.00<br>Чт-Пт 16.00-01.00<br>Сб 14:00-01.00<br>Вс 14.00-00.00',link:"<a href='https://www.instagram.com/bar_kvartirnik' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4265, lon: 31.0094, name: 'Бар Первый', address: 'ул. Кирова д. 1', type: 'club', info: '■ Караоке - лаунж - бар<br>■ Ежедневно с 18:00 до 5:00<br>■ Доставка с 18:00 до 3:00<br>■ Доставка от 40р - бесплатно<br>■ Бронь столов<br>+375-29-143-43-40',image: ['image/bar_pervi/name.jpg','image/bar_pervi/menu.jpg','image/bar_pervi/vhod.jpg','image/bar_pervi/bar.jpg' ],link:"<a href='https://vk.link/bar_perviy' target='_blank' class='link'>подробнее...</a>" },

        //REST
        { lat: 52.4097, lon: 30.9505, name: 'Ресторан Вилла Грилла', address: 'Волгоградская ул. 45', type: 'rest', info: '🍷РЕСТОБАР | 🎶КАРАОКЕ |💃ТАНЦПОЛ<br>РЕЖИМ РАБОТЫ:<br>ПН-ЧТ, ВС - 13:00-23:00<br>ПТ, СБ - 15:00-02:00<br>Бронь столов📲 +375 25 531-92-12',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4273, lon: 31.0036, name: 'Сябры', address: 'пр-т. Ленина 33', type: 'rest', info: '🔸Национальные блюда<br>🔸Белорусский колорит в современном стиле<br>🔸Три просторных зала<br>🕚 11:00 — 23:00<br>📞 +375(29)135-05-15',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4284, lon: 31.0135, name: 'Старое время', address: 'Krest`yanskaya 14', type: 'rest', info: 'Кафе «Старое время» встречает гостей с февраля 2008 года, предлагая атмосферу популярных советских фильмов. Здесь можно окунуться в мир картин «Место встречи изменить нельзя», «Белое солнце пустыни», «Свадьба в Малиновке» и «Вратарь», где каждая деталь интерьера воссоздаёт культовые сцены и фразы.<br>В фойе вы окажетесь на улице с пролетающим советским аэропланом, трамваем «Пятёрочка» и легендарной Чёрной кошкой. В зале «Белое солнце пустыни» ручная лепка и роспись создают атмосферу восточного базара. В зале «Свадьба в Малиновке» вас встретят герои Папандополо и Сметана, а для любителей спорта доступен зал по мотивам фильма «Вратарь».<br>Каждая мелочь интерьера сделает ваш визит незабываемым и заставит вернуться снова.',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4242, lon: 31.0075, name: 'Бацькі', address: 'Internatsional`naya 3', type: 'rest', info: 'Народный ресторан «Бацькі» — это заведение быстрого обслуживания, где можно вкусно и недорого пообедать. Принцип самообслуживания обеспечивает демократичные цены без потери качества.<br>Меню включает блюда белорусской кухни, а также украинский борщ, русскую уху, французское мясо, баварские колбаски и американские стейки. Блюда готовятся на современном оборудовании и подаются горячими. Доступен заказ на вынос в термобоксах.<br>Ресторан вмещает до 240 гостей, включая летнюю террасу. Интерьер выдержан в стиле бывшего ресторана «Сож», а залы организованы так, чтобы гости чувствовали уют. В малых залах можно провести банкеты на 12–50 человек.<br>По вечерам звучит живая музыка, а цены, включая пиво, приятно удивляют.',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        // { lat: 52.4090, lon: 30.9325, name: 'Ресторан Речицкий', address: 'Междугородняя ул. 2', type: 'rest',info:'' },

        //KARAOKE
        { lat: 52.4278, lon: 31.0084, name: 'Караоке клуб хХх', address: 'ул. Кирова 9', type: 'karaoke', info: '🎤Электронный каталог песен<br>🍱Европейская кухня<br>⭐️Luxury VIP зал<br>🍸Большой выбор напитков<br>🎉Дни Рождения, Свадьбы<br>⏰ 18.00 - 04.00',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4295, lon: 31.0115, name: 'San Remo', address: 'ул. Советская 26а', type: 'karaoke', info: '🎙Пн-Вс:18:00-04:00 🎙.<br>🔸Корпоративы.🕺🏼<br>🔸Банкеты.💃🏻<br>🔸Девичники,мальчишники💥<br>🔸Свадьбы.💕<br>🔸Дни рождения 🎉<br>Для именинников бонусы 🎂',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.3868, lon: 31.0225, name: 'JAGGER karaoke project', address: 'вуліца Дастаеўскага 1-1', type: 'karaoke', info: 'Я Джаггер, английский бульдог🐶. И это, мой паб 🍺!<br>Мой паб 🍺 - это 6 составляющих:<br>1. Еда 🍲: сытно, понятно, вкусно.<br>2. Пенное. Специально для моего паба варят отменное крафтовое 🍻🍻🍻!<br>3. Спортивные трансляции 📺: 8 телевизоров, 2 проектора с возможностью раздельного просмотра трансляций и 12 колонок по всем залам!<br>4. Музыка 🎵. В пятницу и субботу танцы под живую музыку.<br>5. Бизнес - ланчи 🍝: быстро, удобно, вкусно, недорого.<br>6. Это я 🐶. Лучший английский бульдог (по версии моего человека).<br>Для любителей петь 🎙 - я сделал Jagger karaoke project.<br>Отдельный зал. Крутой звук. Большие экраны. Бесконечный плей-лист.<br>Не выбирай. Всё в одном месте 🏢. Приходи, приезжай на Достоевского 1-1!<br>Bulldog Pub - Паб🍺, к которому ты привязан!',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4230, lon: 31.0140, name: 'Nota', address: 'пл. Ленина 2', type: 'karaoke', info: '🏅Невероятная атмосфера<br>🎤Качественный звук<br>🍲Вкусная еда<br>💫VIP-зал<br>🍹Шикарная коктейльная карта<br>Кальянная карта<br>☕Чайная карта<br>+37533-6-810-810',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4274, lon: 31.0145, name: 'Новое Время', address: 'ул. Ланге 17', type: 'karaoke', info: '🍸Коктейль-Бар «NEW TIME»<br>🥂Наша коктейльная карта насчитывает более 60 разнообразных коктейлей🍸<br><br>💠В Вашем распоряжении окажутся большой танцпол💃🏼, удобный бар🍷🍸 и уютная летняя площадка под белоснежным шатром!💎<br>📍Мы находимся в самом центре города — ул. Ланге,17, вход в арку с ул. Советская🗺️<br>⏰Режим работы⏰<br>пт, сб — 18:00-4:00<br>вт,ср,чт - 12:00-19:00<br>📞Телефоны☎️<br>8 (044) 785 58 05<br>Будем рады видеть Вас в числе своих гостей!🥂' ,image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>"},

        //Theater
        { lat: 52.4248, lon: 31.0136, name: 'Гомельский областной драматический театр', address: 'площадь Ленина, 1', type: 'theater', info: 'Контакты: <br>Касса театра: +375 (232) 50 90 63 <br>По вопросам сотрудничества: +375 (232) 50 91 97',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4254, lon: 31.0077, name: 'Гомельский городской молодёжный театр', address: 'просп. Ленина, 10', type: 'theater', info: 'Контакты: <br>Касса театра: +375 44 744-35-62 <br>Время работы<br>График<br>Понедельник<br>08:30 – 17:30<br>Вторник<br>08:30 – 17:30<br>Среда<br>11:00 – 19:00<br>Четверг<br>11:00 – 19:00<br>Пятница<br>11:00 – 19:00<br>Суббота<br>11:00 – 19:00<br>Воскресенье<br>11:00 – 19:00 ',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },
        { lat: 52.4318, lon: 31.0123, name: 'Гомельский государственный театр кукол', address: 'ул. Пушкина, 14', type: 'theater', info: 'Касса театра: +375 232 28-25-20 <br>Понедельник Выходной<br>Вторник 11:00 – 18:00<br>Среда 11:00 – 18:00<br>Четверг 11:00 – 18:00<br>Пятница 11:00 – 18:00<br>Суббота 10:00 – 16:00<br>Воскресенье 10:00 – 16:00',image: ['image/entrance-brsm.png', 'image/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>" },

        //БРСМ
        { lat: 52.4389, lon: 31.0044, name: 'Белорусский республиканский союз молодежи', address: 'Советская ул.,58 этаж 1', type: 'brsm', info: 'Мы делимся с Вами актуальными и интересными новостями из молодежной жизни страны!',image: ['image/brsm/entrance-brsm.png', 'image/brsm/dver-brsm.png'],link:"<a href='https://brsm.by/ru' target='_blank' class='link'>подробнее...</a>"},





    ];

    places.forEach(function (place) {
        const markerData = {
            lat: place.lat,
            lon: place.lon,
            address: place.address,
            name: place.name,
            type: place.type,
            info: place.info || '', // Обязательно передайте info, если она есть
            image: place.image || '',
            link: place.link || '',
            isPreset: true // Указываем, что это предустановленный маркер
        };

        const iconType = chooseIcon(place.type);

        // Добавляем новый предустановленный маркер на карту
        const marker = L.marker([place.lat, place.lon], { icon: iconType }).addTo(map);
        marker.bindPopup(createPopupContent(markerData, markers.length));
        markerObjects[markers.length] = marker; // Сохраняем объект маркера

        markers.push(markerData); // Сохраняем данные о маркере


    });

    // Отображаем все маркеры при начальной загрузке
    filterMarkers('all');
}
localStorage.removeItem('marker');

// Загрузка всех маркеров при запуске страницы
loadMarkers();
addPresetMarkers();