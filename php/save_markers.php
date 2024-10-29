<?php
$servername = "localhost"; // Имя сервера
$username = "root"; // Ваше имя пользователя
$password = ""; // Ваш пароль
$dbname = "marker_db"; // Имя вашей базы данных

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получаем данные из POST-запроса
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$type = $_POST['type'];
$address = $_POST['address'];

// Подготавливаем и выполняем запрос
$stmt = $conn->prepare("INSERT INTO markers (latitude, longitude, type, address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ddss", $latitude, $longitude, $type, $address);

if ($stmt->execute()) {
    echo "Marker saved successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
