import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menuRoutes';
import path from 'path';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
