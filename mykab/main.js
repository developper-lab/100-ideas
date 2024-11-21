
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
    zoomControl: false // Disable zoom controls
}).setView([52.4345, 30.9754], 13);

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
        default:
            return L.icon({
                iconUrl: 'default-icon.png', // Укажите путь к иконке по умолчанию
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
    }
}



// function createImageSlider(images) {
//     if (!images || images.length === 0) return '';

//     let imageSliderHtml = `<div class="image-slider">`;
//     images.forEach((imgSrc, index) => {
//         imageSliderHtml += `<div class="slide" style="display: ${index === 0 ? 'block' : 'none'};">
//                                 <img src="${imgSrc}">
//                             </div>`;
//     });
//     imageSliderHtml += `
//         <button class="prev" onclick="changeSlide(-1)">❮</button>
//         <button class="next" onclick="changeSlide(1)">❯</button>
//     </div>`;
//     return imageSliderHtml;
// }

// Переключение слайдов
// let currentSlideIndex = 0;
// function changeSlide(sliderIndex, n) {
//     let slider = document.getElementById(`slider-${sliderIndex}`);
//     let slides = slider.getElementsByClassName('slide');
//     let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

//     // Убираем класс active с текущего слайда
//     slides[currentIndex].classList.remove('active');

//     // Вычисляем следующий слайд и добавляем ему класс active
//     let nextIndex = (currentIndex + n + slides.length) % slides.length;
//     slides[nextIndex].classList.add('active');
// }
// Создание содержимого всплывающего окна с кнопкой удаления
// Создание содержимого всплывающего окна с кнопкой удаления
function createPopupContent(markerData, index) {
    let infoHtml = markerData.info ? `<br>${markerData.info}` : '';
    let nameHtml = markerData.name ? `<b>${markerData.name}</b> <br>` : '';
    let deleteButtonHtml = markerData.isPreset ? '' : `<br><button class='image-btn' onclick="deleteMarker(${index})">Удалить маркер</button>`;

    // // Генерация слайдера изображений
    // let imageHtml = '';
    // if (Array.isArray(markerData.image) && markerData.image.length > 0) {
    //     imageHtml += `<div class="slider" id="slider-${index}">`;
    //     markerData.image.forEach((img, imgIndex) => {
    //         imageHtml += `
    //             <div class="slide ${imgIndex === 0 ? 'active' : ''}">
    //                 <img class="image-slide" src="${img}">
    //             </div>`;
    //     });
    //     imageHtml += `
    //         <button class="prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
    //         <button class="next" onclick="changeSlide(${index}, 1)">&#10095;</button>
    //     </div>`;
    // }

    return `${nameHtml}${markerData.address}${infoHtml}${deleteButtonHtml}`;
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
function getCoordinates(address) {
    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address + ', Гомель, Беларусь');

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                return { lat: lat, lon: lon };
            } else {
                alert('Адрес не найден');
                return null;
            }
        })
        .catch(error => console.error('Ошибка геокодирования:', error));
}

// Проверка, находятся ли координаты в пределах Гомеля
function isWithinGomel(lat, lon) {
    var minLat = 52.3500;
    var maxLat = 52.5000;
    var minLon = 30.8500;
    var maxLon = 31.0500;

    return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
}


// Функция для поиска адреса и добавления маркера
function findAddress() {
    const address = document.getElementById('address').value;
    const message = document.getElementById('message').value;

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
                type: selectedType,
                // image: img || [] 
            };

            const iconType = chooseIcon(selectedType);

            // Добавляем новый маркер с сообщением и выбранной иконкой
            const marker = L.marker([coords.lat, coords.lon], { icon: iconType }).addTo(map);
            const index = markers.length; // Индекс нового маркера
            marker.bindPopup(createPopupContent(markerData, index)).openPopup();
            markerObjects[index] = marker;

            markers.push(markerData); // Сохраняем данные о маркере
            saveMarkers(); // Сохраняем маркеры в localStorage
            // Перемещаем карту к маркеру
            map.setView([coords.lat, coords.lon], 15);

            // Закрываем форму
            toggleForm();
        } else {
            alert('Адрес не находится в пределах Гомеля.');
        }
    });
}

let selectedType = null; // Переменная для хранения выбранного типа места

const imageButtons = document.querySelectorAll('.btn-image');

// Обрабатываем клики по кнопкам
imageButtons.forEach((button) => {
    button.addEventListener('click', function() {
        // Снимаем выделение со всех кнопок
        imageButtons.forEach(btn => btn.classList.remove('selected'));

        // Добавляем класс 'selected' к нажатой кнопке и сохраняем тип
        this.classList.add('selected');
        selectedType = this.getAttribute('data-type'); // Сохраняем тип места
    });
});


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
document.getElementById("btn-link").addEventListener("click",function(){
    window.location.href = '../index.html'
});
// Загрузка всех маркеров при запуске страницы
loadMarkers();