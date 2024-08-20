import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import cors from 'cors';
import { errors } from 'celebrate';
import {routes} from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
// Middleware
const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof AppError) {
   return res.status(err.statusCode).json({ status: 'error',
      message: err.message,
     }); 
  };
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server'
  })
});
app.listen(5000, ()=>{
  console.log('Server is running on port 5000');
  console.log('http://localhost:5000')
})

