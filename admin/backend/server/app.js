import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import subscriptionsRouter from './routes/subscriptions';
import authRouter from './routes/auth';

const app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/subscriptions', subscriptionsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  console.error(err.toString());
  res.status(err.status || 500);
  res.json({ error: 'Internal server error.' });
});

export default app;
