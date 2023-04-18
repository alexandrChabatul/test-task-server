import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middleware/error-middleware';
import db from './sequelize/models';
import authRouter from './routers/AuthRouter';
import usersRouter from './routers/UsersRouter';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT,
  })
);
app.use(morgan('combined'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use(errorMiddleware);

async function start() {
  try {
    db.sequelize.sync().then(() => {
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    });
  } catch (e) {
    console.error(e);
  }
}

start();
