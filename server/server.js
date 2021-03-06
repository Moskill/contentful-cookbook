import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const {Pool} = pg;
const __DIR__ = path.resolve();
const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  ],
};

app.use(cors(corsOpts));

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
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({storage}).single('file');

// DIe Upload Route - führt direkt in den Zielordner -> (./upload)
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      return res.status(500).json(err)
    }
    fs.readFile(__DIR__ + req.file.originalname, (err, content) => {
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(content)
    })
  })
});

// Die Route um Bilder zu laden
app.get('/upload/:pic', (req, res) =>{
  fs.readFile(`upload/${req.params.pic}`,  (err, data) => {
    res.send(data)
  });
});

// Die root-Route ohne richtige Funktion
app.get('/', (req, res) => {
  console.log('Dies ist die root route');
})

// Die Route, über die alle Recipes geladen werden
app.get('/recipes', (req, res) => {
  pool.query('SELECT * FROM recipes ORDER BY id;')
      .then(data => res.json(data.rows))
      .catch(err => res.sendStatus(500));
});

// Route um ein einzelnes Recipe an Hand der ID zu laden
app.get('/recipes/:recipe', (req, res) => {
  pool.query('SELECT * FROM recipes WHERE id = $1;', [req.params.recipe])
      .then(data => res.json(data.rows))
      .catch(err => res.sendStatus(500));
});

// Die Post-Route
app.post('/post', (req, res) => {
  if(req.body.name === '') {
    return;
  }

  const image  = `http://localhost:8000/upload/${req.body.image}`;
  const { id, name, ingredients, steps, difficult, cookingtime, calories }  = req.body;
  pool.query(`INSERT INTO recipes (id, name, ingredients, image, steps, difficult, cookingtime, calories) 
              VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, 
              [id, name, ingredients, image, steps, difficult, cookingtime, calories])
      .then(data => res.status(201).json(data))
      .catch(err => res.sendStatus(404))
});

// Die Route zum Löschen von Recipes
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM recipes WHERE id = $1`, [id])
      .then(data => res.sendStatus(200).json(data))
      .catch(console.log('Läuft nicht!'))
});

// Die Route zum Editieren von Recipes
app.put('/edit/:id', (req, res) => {
  console.log(req.body, 'Z. 105')
  const id = req.params.id;
  const { name, ingredients, steps, difficult, cookingtime, calories }  = req.body;
  pool.query(`UPDATE recipes SET name = $1, ingredients = $2, steps = $3, difficult = $4, cookingtime = $5, calories = $6 WHERE id = $7` , 
             [name, ingredients, steps, difficult, cookingtime, calories, id ])
      .then(data => res.sendStatus(200).json(data))
      .catch(console.log('Läuft nicht!'))
})

// Der Server auf Port 8000
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});