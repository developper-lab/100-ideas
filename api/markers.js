const { Pool } = require('pg');

const pool = new Pool({
  user: 'developper-lab', // Имя пользователя из Supabase
  host: 'db.developper-lab Project.co', // Хост базы данных
  database: 'postgres', // Имя базы данных
  password: '11223344mochi', // Пароль
  port: 5432, // Порт (обычно 5432)
});

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { latitude, longitude, type, description, images, user_id } = req.body;

    // Проверка на наличие всех обязательных данных
    if (
      latitude === undefined ||
      longitude === undefined ||
      type === undefined ||
      description === undefined ||
      !Array.isArray(images) ||
      user_id === undefined
    ) {
      return res.status(400).json({ error: 'Некорректные данные для маркера' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO markers (latitude, longitude, type, description, images, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [latitude, longitude, type, description, JSON.stringify(images), user_id]
      );

      console.log('Маркер успешно сохранён:', result.rows[0]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Ошибка при сохранении маркера:', error);
      res.status(500).json({ error: 'Ошибка сохранения маркера' });
    }
  } else if (method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM markers');

      if (result.rows.length === 0) {
        return res.status(200).json({ message: 'Маркеры отсутствуют' });
      }

      console.log('Маркеры успешно загружены:', result.rows);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Ошибка при загрузке маркеров:', error);
      res.status(500).json({ error: 'Ошибка загрузки маркеров' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Метод ${method} не поддерживается`);
  }
}
