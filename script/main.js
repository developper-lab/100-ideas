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
        default:
            return L.icon({
                iconUrl: 'default-icon.png', // Укажите путь к иконке по умолчанию
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
    }
}

// Создание содержимого всплывающего окна с кнопкой удаления
// Создание содержимого всплывающего окна с кнопкой удаления
function createPopupContent(markerData, index) {
    let infoHtml = markerData.info ? `<br>${markerData.info}` : ''; // Добавьте это

    // Убираем кнопку удаления, если маркер добавлен вручную
    let deleteButtonHtml = markerData.isPreset ? '' : `<br><button class='image-btn' onclick="deleteMarker(${index})">Удалить маркер</button>`;
    
    // Проверяем, определено ли имя маркера
    let nameHtml = markerData.name ? `<b>${markerData.name}</b> <br>` : ''; // Здесь 'Без названия' — текст по умолчанию

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
                type: selectedType
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
function addPresetMarkers() {
    var places = [
        //GYM
        { lat: 52.4052, lon: 30.9215, name: 'Адреналин', address: 'улица Гагарина 65,', type: 'gym' },
        { lat: 52.4248, lon: 31.0105, name: 'Фитнес-клуб Кенгуру', address: 'пр-т. Ленина 3', type: 'gym' },
        { lat: 52.4093, lon: 30.9484, name: 'Тренажерный зал "Maximus"', address: 'Волгоградская ул. 5,', type: 'gym' },
        { lat: 52.4024, lon: 30.9202, name: 'Фитнес-клуб "Joker Gym" тренажерный зал', address: 'ул. 70 лет БССР дом 2а', type: 'gym', info:`'Телефон: +375298213193 <br> Режим работы: пон-пят 8:30.00-21.00 <br> суб 9:30.00-17.00 вс ВЫХОДНОЙ' `},
        { lat: 52.4228, lon: 31.0012, name: 'Атлет фитнес-центр', address: 'улица Гагарина 57', type: 'gym'},
        { lat: 52.4259, lon: 31.0133, name: 'Фитнес-клуб DMFITNESS', address: 'ул. Трудовая 3а', type: 'gym' },
        { lat: 52.4252, lon: 31.0083, name: 'ФИТНЕС INGRAVITY', address: 'пр-т. Ленина 10', type: 'gym' },

        //CLUB
        { lat: 52.4123, lon: 30.9542, name: 'стейк бар ATLANTA', address: 'Речицкий просп. 24', type: 'club' },
        { lat: 52.4041, lon: 30.9605, name: 'Чисто Пивной Ресторанчик', address: 'улица Братьев Лизюковых 4А', type: 'club',},
        { lat: 52.4245, lon: 31.0044, name: 'Black Bar', address: 'улица Катунина 14', type: 'club' },
        { lat: 52.4502, lon: 31.0227, name: 'Спорт Бар в Гомеле', address: 'улица Мазурова 30', type: 'club' },
        { lat: 52.4505, lon: 31.0229, name: 'Victory', address: 'улица Мазурова 30', type: 'club' },
        { lat: 52.4272, lon: 31.0200, name: 'Бар Квартирник', address: 'Билецкий спуск 1', type: 'club' },
        { lat: 52.4265, lon: 31.0094, name: 'Бар Первый', address: 'ул. Кирова д. 1', type: 'club' },

        //REST
        { lat: 52.4097, lon: 30.9505, name: 'Ресторан Вилла Грилла', address: 'Волгоградская ул. 45', type: 'rest' },
        { lat: 52.4273, lon: 31.0036, name: 'Сябры', address: 'пр-т. Ленина 33', type: 'rest' },
        { lat: 52.4284, lon: 31.0135, name: 'Старое время', address: 'Krest`yanskaya 14', type: 'rest' },
        { lat: 52.4242, lon: 31.0075, name: 'Бацькі', address: 'Internatsional`naya 3', type: 'rest' },
        { lat: 52.4090, lon: 30.9325, name: 'Ресторан Речицкий', address: 'Междугородняя ул. 2', type: 'rest' },

        //KARAOKE
        { lat: 52.4278, lon: 31.0084, name: 'Караоке клуб хХх', address: 'ул. Кирова 9', type: 'karaoke' },
        { lat: 52.4295, lon: 31.0115, name: 'San Remo', address: 'ул. Советская 26а', type: 'karaoke' },
        { lat: 52.3868, lon: 31.0225, name: 'JAGGER karaoke project', address: 'вуліца Дастаеўскага 1-1', type: 'karaoke' },
        { lat: 52.4230, lon: 31.0140, name: 'Nota', address: 'пл. Ленина 2', type: 'karaoke' },
        { lat: 52.4274, lon: 31.0145, name: 'Новое Время', address: 'ул. Ланге 17', type: 'karaoke' }



    ];

    places.forEach(function (place) {
        const markerData = {
            lat: place.lat,
            lon: place.lon,
            address: place.address,
            name: place.name,
            type: place.type,
            info: place.info || '', // Обязательно передайте info, если она есть
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

// function addPresetMarkers() {
//     var places = [
//         //GYM
//         { lat: 52.4052, lon: 30.9215, name: 'Адреналин', address: 'улица Гагарина 65,', type: 'gym' },
//         { lat: 52.4248, lon: 31.0105, name: 'Фитнес-клуб Кенгуру', address: 'пр-т. Ленина 3', type: 'gym' },
//         { lat: 52.4093, lon: 30.9484, name: 'Тренажерный зал "Maximus"', address: 'Волгоградская ул. 5,', type: 'gym' },
//         { lat: 52.4024, lon: 30.9202, name: 'Фитнес-клуб "Joker Gym" тренажерный зал', address: 'ул. 70 лет БССР дом 2а', type: 'gym', info:`'Телефон: +375298213193 <br> Режим работы: пон-пят 8:30.00-21.00 <br> суб 9:30.00-17.00 вс ВЫХОДНОЙ' `},
//         { lat: 52.4228, lon: 31.0012, name: 'Атлет фитнес-центр', address: 'улица Гагарина 57', type: 'gym'},
//         { lat: 52.4259, lon: 31.0133, name: 'Фитнес-клуб DMFITNESS', address: 'ул. Трудовая 3а', type: 'gym' },
//         { lat: 52.4252, lon: 31.0083, name: 'ФИТНЕС INGRAVITY', address: 'пр-т. Ленина 10', type: 'gym' },

//         //CLUB
//         { lat: 52.4123, lon: 30.9542, name: 'стейк бар ATLANTA', address: 'Речицкий просп. 24', type: 'club' },
//         { lat: 52.4041, lon: 30.9605, name: 'Чисто Пивной Ресторанчик', address: 'улица Братьев Лизюковых 4А', type: 'club',},
//         { lat: 52.4245, lon: 31.0044, name: 'Black Bar', address: 'улица Катунина 14', type: 'club' },
//         { lat: 52.4502, lon: 31.0227, name: 'Спорт Бар в Гомеле', address: 'улица Мазурова 30', type: 'club' },
//         { lat: 52.4505, lon: 31.0229, name: 'Victory', address: 'улица Мазурова 30', type: 'club' },
//         { lat: 52.4272, lon: 31.0200, name: 'Бар Квартирник', address: 'Билецкий спуск 1', type: 'club' },
//         { lat: 52.4265, lon: 31.0094, name: 'Бар Первый', address: 'ул. Кирова д. 1', type: 'club' },

//         //REST
//         { lat: 52.4097, lon: 30.9505, name: 'Ресторан Вилла Грилла', address: 'Волгоградская ул. 45', type: 'rest' },
//         { lat: 52.4273, lon: 31.0036, name: 'Сябры', address: 'пр-т. Ленина 33', type: 'rest' },
//         { lat: 52.4284, lon: 31.0135, name: 'Старое время', address: 'Krest`yanskaya 14', type: 'rest' },
//         { lat: 52.4242, lon: 31.0075, name: 'Бацькі', address: 'Internatsional`naya 3', type: 'rest' },
//         { lat: 52.4090, lon: 30.9325, name: 'Ресторан Речицкий', address: 'Междугородняя ул. 2', type: 'rest' },

//         //KARAOKE
//         { lat: 52.4278, lon: 31.0084, name: 'Караоке клуб хХх', address: 'ул. Кирова 9', type: 'karaoke' },
//         { lat: 52.4295, lon: 31.0115, name: 'San Remo', address: 'ул. Советская 26а', type: 'karaoke' },
//         { lat: 52.3868, lon: 31.0225, name: 'JAGGER karaoke project', address: 'вуліца Дастаеўскага 1-1', type: 'karaoke' },
//         { lat: 52.4230, lon: 31.0140, name: 'Nota', address: 'пл. Ленина 2', type: 'karaoke' },
//         { lat: 52.4274, lon: 31.0145, name: 'Новое Время', address: 'ул. Ланге 17', type: 'karaoke' }



//     ];

//     // Добавляем места в массив markers для фильтрации
//     places.forEach(function (place) {
//         markers.push({
//             lat: place.lat,
//             lon: place.lon,
//             address: place.address,
//             name: place.name,
//             type: place.type
//         });
//     });

//     // Отображаем все маркеры при начальной загрузке
//     filterMarkers('all');
// }



// Загрузка всех маркеров при запуске страницы
loadMarkers();
addPresetMarkers();