import express from 'express';
import history from 'express-history-api-fallback';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const PORT = 3000;
const app = express();

app.use(express.static('dist'));

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use(history('index.html', { root: path.resolve(__dirname, 'dist') }));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
