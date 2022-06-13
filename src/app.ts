import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import daysRouter from './routes/days';
import weekdaysRouter from './routes/weekdays';
import weeksRouter from './routes/weeks';

import { redirectToIndex } from './middleware/errorhandler'

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/days', daysRouter);
app.use('/weekdays', weekdaysRouter);
app.use('/weeks', weeksRouter);

// Handle 404 - rediect to / for instruction
app.use(redirectToIndex);

export default app;
