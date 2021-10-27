import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const {Pool} = pg;
const __DIR__ = path.resolve();
const app = express();
app.use(cors());
const pool = new Pool({
  user: 'jyepzeky', 
  host: 'fanny.db.elephantsql.com', 
  password: 'WinWYu-yD3OFVJVD5sHKjRy-HglJhqII', 
  database: 'jyepzeky', 
  port: 5432
});

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
    console.log('Nodemon funzt');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({storage}).single('file');

app.get('/', (req, res) => {
  console.log('Dies ist die root route');
})

app.get('/recipes', (req, res) => {
  pool.query('SELECT * FROM recipes ORDER BY id;')
  .then(data => res.json(data.rows))
  .catch(err => res.sendStatus(500));
});

app.get('/recipes/:recipe', (req, res) => {
  pool.query('SELECT * FROM recipes WHERE id = $1;', [req.params.recipe])
      .then(data => res.json(data.rows))
      .catch(err => res.sendStatus(500));
});

let recipeCounter = '';

const getRowCount = async () => {
  const rowCount = await pool.query(`SELECT COUNT(id) FROM recipes`)
  .then(res => console.log('Promised: ', res.rows[0].count))
  .then(recipeCounter = res.rows[0].count)
}

// console.log(recipeCounter, 'fsdafnpskdjfhbipsdfbsj');

app.post('/post', (req, res) => {
  console.log(getRowCount(), 'Promise');
  const id  = 15;
  const image  = 'http://skeel.de/img/flammkuchen.jpg';
  const { name, ingredients, steps, difficult, cookingtime, calories }  = req.body;
  pool.query(`INSERT INTO recipes (id, name, ingredients, image, steps, difficult, cookingtime, calories) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, 
              [id, name, ingredients, image, steps, difficult, cookingtime, calories])
      .then(data => res.status(201).json(data))
      .catch(err => res.sendStatus(404))
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM recipes WHERE id = $1`, [id])
      .then(res.send(200)).json(data)
      .catch(console.log('Läuft nicht!'))
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});