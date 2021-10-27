import express from 'express';
import pg from 'pg';
import cors from 'cors';
const {Pool} = pg;

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

app.post('/post', (req, res) => {
  const  id  = 15;
  const  image  = 'http://skeel.de/img/flammkuchen.jpg';
  const { name, ingredients, steps, difficult, cookingtime, calories }  = req.body;
  pool.query(`INSERT INTO recipes (id, name, ingredients, image, steps, difficult, cookingtime, calories) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, 
              [id, name, ingredients, image, steps, difficult, cookingtime, calories])
      .then(data => res.status(201).json(data))
      .catch(err => res.sendStatus('404'))
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
})

// app.post('/recipes', (req, res) => {
//   console.log(req.body);

//   res.send({
//             title: req.body.title, 
//             text: req.body.text, 
//             id: '23'
//           })
// })

// app.put('/recipes/:id', (req, res) => {
//   res.send('Got a PUT request at /user');
// });

// app.get('/recipes', (req, res) => {
//   res.json({calories: 'tesCalories'});
// })

