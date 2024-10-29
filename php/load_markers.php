<?php
$servername = "localhost"; // Имя сервера
$username = "root"; // Ваше имя пользователя
$password = ""; // Ваш пароль
$dbname = "marker_db";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Выполняем запрос на получение маркеров
$sql = "SELECT latitude, longitude, type, address FROM markers";
$result = $conn->query($sql);

$markers = array();

if ($result->num_rows > 0) {
    // Извлекаем данные из результата
    while($row = $result->fetch_assoc()) {
        $markers[] = $row;
    }
}

// Возвращаем данные в формате JSON
header('Content-Type: application/json');
echo json_encode($markers);

$conn->close();
?>
