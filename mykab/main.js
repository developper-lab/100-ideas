var map = L.map('map', {
    zoomControl: false // Disable zoom controls
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
    iconUrl: '../image/gym.png', // Укажите путь к иконке спортзала
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var clubIcon = L.icon({
    iconUrl: '../image/night-club.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var restIcon = L.icon({
    iconUrl: '../image/restaurant.png', // Укажите путь к иконке бара
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var karaokeIcon = L.icon({
    iconUrl: '../image/singer.png', // Укажите путь к иконке караоке
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var musicIcon = L.icon({
    iconUrl: '../image/music.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var basketballIcon = L.icon({
    iconUrl: '../image/basketball.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var cinemaIcon = L.icon({
    iconUrl: '../image/cinema.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var footballIcon = L.icon({
    iconUrl: '../image/football.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var voleyballIcon = L.icon({
    iconUrl: '../image/voleyball.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var theaterIcon = L.icon({
    iconUrl: '../image/theater.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var fitnessIcon = L.icon({
    iconUrl: '../image/fitness.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var eventsIcon = L.icon({
    iconUrl: '../image/events.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var shopIcon = L.icon({
    iconUrl: '../image/shop.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var brsmIcon = L.icon({
    iconUrl: '../image/brsm.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
var studiesIcon = L.icon({
    iconUrl: '../image/studies.png', // Укажите путь к иконке клуба
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});
// Сохранение маркеров в localStorage
function saveMarkers() {
    localStorage.setItem('markers', JSON.stringify(markers));
}

// Загрузка маркеров из localStorage
// Загрузка маркеров из localStorage
function loadMarkers() {
    localStorage.removeItem('marker'); // Удаление старого ключа, если он есть

    var savedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (savedMarkers) {
        // Фильтрация: оставляем только пользовательские маркеры
        markers = savedMarkers.filter(markerData => !markerData.isPreset);

        // Сохраняем отфильтрованные маркеры обратно в localStorage
        saveMarkers();

        // Перерисовка маркеров на карте
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

document.getElementById("btn-link").addEventListener("click",function(){
    window.location.href = '../index.html'
});
// Загрузка всех маркеров при запуске страницы
loadMarkers();