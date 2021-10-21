import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.get('/', (req, res) => {
  res.send();
});

app.post('/', (req, res) => {
  res.send('POST rockt!')
})

app.put('/', (req, res) => {
  res.send('Got a PUT request at /user');
});