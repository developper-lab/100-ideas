//Javascriptpro_
let label = document.querySelectorAll('.container .input label');

label.forEach((label => {
  label.innerHTML = label.textContent.split('').map((letters, i) => `<span style="transition-delay:${i * 50}ms">${letters}</span>`).join('')
}))
document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  const type = passwordField.type === 'password' ? 'text' : 'password'; // Переключаем тип поля
  passwordField.type = type;
  
  // Меняем иконку
  if (type === 'password') {
      this.innerHTML = '&#128065;';  // Глазик закрыт
  } else {
      this.innerHTML = '&#128064;';  // Глазик открыт
  }
});
