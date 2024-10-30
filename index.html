<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Карта Гомеля - Найдите интересные места в городе</title>
    <meta name="description"
        content="Интерактивная карта Гомеля. Узнайте, где находятся клубы, рестораны, фитнес-залы и другие интересные места.">
    <meta name="keywords" content="Карта Гомеля, Гомель карта, клубы, рестораны, фитнес, Беларусь">
    <meta name="author" content="Cigano">
    <meta name="yandex-verification" content="9c933581aff4e162" />
    <meta name="google-site-verification" content="0OXfA3Yy7MqFiYPLibXC4C2jabpUeZumSorxYtom6oE" />
    <meta name="google-site-verification" content="0OXfA3Yy7MqFiYPLibXC4C2jabpUeZumSorxYtom6oE" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="icon" href="image/location.png" type="image/png">
    <link rel="stylesheet" href="style/style.css">
    <script src="script/main.js" defer></script>
    <script src="https://accounts.google.com/gsi/client" async defer></script>

</head>

<body>




    <!-- Форма для ввода адреса и сообщения -->

    <div id="overlay"></div>


    <header>
        <div class="button-container">
            <div id="user-menu" class="user-menu" style="display: none;">
                <span id="username-display"></span>
                <div id="user-men">
                    <span id="user-name"></span> <!-- Здесь будет имя пользователя -->
                </div>
                <div class="dropdown">
                    <button class="dropbtn">▼</button>
                    <div class="dropdown-content">
                        <a href="my-account.html">Мой кабинет</a>
                        <a href="#" id="logout-button">Выход</a>
                    </div>
                </div>
            </div>
            <a id="registration-button" href="dist/registration.html" class="button register"
                style="display: block;">Регистрация</a>
        </div>
    </header>
    <!-- Кнопка открытия формы -->


    <!-- Форма для ввода адреса и сообщения -->
    <div id="address-form-container">
        <div class="g_id_signin" data-type="standard"></div>
        <label for="address">Введите адрес в Гомеле:</label>
        <input type="text" id="address" placeholder="Например, ул. Советская, 5" required>
        <br><br>
        <label for="message">Введите сообщение:</label>
        <input type="text" id="message" placeholder="Сегодня выступаю тут" required>
        <br><br>
        <button id="findAddressButton" onclick="findAddress()" class="btn">Найти адрес</button>

        <!-- Кнопки с изображениями -->
        <div class="flex">
            <button class="btn-image" data-type="basketball" title="Баскетбол"><img src="image/basketball.png"
                    alt=""></button>
            <button class="btn-image" data-type="football" title="Футбол"><img src="image/football.png" alt=""></button>
            <button class="btn-image" data-type="voleyball" title="Волейбол"><img src="image/voleyball.png"
                    alt=""></button>
            <button class="btn-image" data-type="cinema" title="Фильм"><img src="image/cinema.png" alt=""></button>
            <button class="btn-image" data-type="club" title="Клуб"><img src="image/night-club.png" alt=""></button>
            <button class="btn-image" data-type="karaoke" title="Караоке"><img src="image/singer.png" alt=""></button>
            <button class="btn-image" data-type="gym" title="Зал"><img src="image/gym.png" alt=""></button>
            <button class="btn-image" data-type="theater" title="Театр"><img src="image/theater.png" alt=""></button>
            <button class="btn-image" data-type="rest" title="Ресторан"><img src="image/restaurant.png" alt=""></button>
            <button class="btn-image" data-type="music" title="Музыка"><img src="image/music.png" alt=""></button>
        </div>
    </div>
    <h1 class="title">Фильтрация</h1>

    <div class="sort">
        <button class="btn-image btn-image-sort" data-type="all" title="Все" onclick="filterMarkers('all')"><img
                src="image/all.png" alt="Все"></button>
        <button class="btn-image btn-image-sort" data-type="basketball" title="Баскетбол"
            onclick="filterMarkers('basketball')"><img src="image/basketball.png" alt="Баскетбол"></button>
        <button class="btn-image btn-image-sort" data-type="football" title="Футбол"
            onclick="filterMarkers('football')"><img src="image/football.png" alt="Футбол"></button>
        <button class="btn-image btn-image-sort" data-type="voleyball" title="Волейбол"
            onclick="filterMarkers('voleyball')"><img src="image/voleyball.png" alt="Волейбол"></button>
        <button class="btn-image btn-image-sort" data-type="cinema" title="Фильм" onclick="filterMarkers('cinema')"><img
                src="image/cinema.png" alt="Фильм"></button>
        <button class="btn-image btn-image-sort" data-type="club" title="Клуб" onclick="filterMarkers('club')"><img
                src="image/night-club.png" alt="Клуб"></button>
        <button class="btn-image btn-image-sort" data-type="karaoke" title="Караоке"
            onclick="filterMarkers('karaoke')"><img src="image/singer.png" alt="Караоке"></button>
        <button class="btn-image btn-image-sort" data-type="gym" title="Зал" onclick="filterMarkers('gym')"><img
                src="image/gym.png" alt="Зал"></button>
        <button class="btn-image btn-image-sort" data-type="theater" title="Театр"
            onclick="filterMarkers('theater')"><img src="image/theater.png" alt="Театр"></button>
        <button class="btn-image btn-image-sort" data-type="rest" title="Ресторан" onclick="filterMarkers('rest')"><img
                src="image/restaurant.png" alt="Ресторан"></button>
        <button class="btn-image btn-image-sort" data-type="music" title="Музыка" onclick="filterMarkers('music')"><img
                src="image/music.png" alt="Музыка"></button>
    </div>


    <div id="map">
        <button id="open-form-button" onclick="toggleForm()">+</button>

    </div>
    <script src="https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

    <script type="module">
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
        import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js';
        import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

        // Ваши настройки Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyDaEEyvxI6ukPznu1BpeO2qZ9vy_8jCDyo",
            authDomain: "databise-aab06.firebaseapp.com",
            projectId: "databise-aab06",
            storageBucket: "databise-aab06.appspot.com",
            messagingSenderId: "687844886764",
            appId: "1:687844886764:web:20596d94b0e25298063dc9"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const database = getDatabase(app);

        // Проверка статуса авторизации
        // auth.onAuthStateChanged((user) => {
        //     const registrationButton = document.getElementById('registration-button');
        //     const userMenu = document.getElementById('user-menu');
        //     const usernameDisplay = document.getElementById('username-display');

        //     if (user) {
        //         registrationButton.style.display = 'none'; // Скрыть кнопку регистрации
        //         userMenu.style.display = 'block'; // Показать меню пользователя
        //         usernameDisplay.innerText = user.displayName || user.email; // Отображение имени пользователя
        //     } else {
        //         registrationButton.style.display = 'block'; // Показать кнопку регистрации
        //         userMenu.style.display = 'none'; // Скрыть меню пользователя
        //     }
        // });

        // Логика выхода из аккаунта
        document.getElementById('logout-button').addEventListener('click', () => {
            auth.signOut().then(() => {
                alert('Вы вышли из аккаунта');
            }).catch((error) => {
                console.error('Ошибка выхода:', error);
            });
        });
    </script>
</body>

</html>