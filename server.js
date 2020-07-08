import express from 'express';
import cors from 'cors';
import path from 'path';

const port = 3000;
const app = express();

app.use(cors());

// serve static file
app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
