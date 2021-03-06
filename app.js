import express from 'express';
import morgan from 'morgan';
import { errors } from 'celebrate';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(errors());

app.use((req, res, next) => {
    const error = new Error('Route not found');
    const status = error.status || 500;
    next(error);
});

app.use((error, req, res) => {

    return res.status(status).json({
        status,
        message: error.message || 'Server error'
    })
});

export default app;