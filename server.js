import express from 'express';
import { join } from 'path';
import { config } from 'dotenv';

config();
const app = express();

app.use(express.static(join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  process.stdout.write(`App is running on port ${PORT}`);
});
