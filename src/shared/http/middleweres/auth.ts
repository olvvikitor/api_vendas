import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export const SECRET_KEY: Secret = 'eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNDExMjE3MCwiaWF0IjoxNzI0MTEyMTcwfQ.4kEvFID0DO40_y7MKKnKtMzjQACp6ud99Uu-gbmzR9UAw68H-HpP-Q7iwMoTUtEYUFadiaOmAQf2sbT4j42-tA'



export interface CustomRequest{
 iat:number;
 exp: number;
 sub: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new AppError("Usuario não autenticado/Sessão expirada", 401);
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   const {sub} = decoded as CustomRequest
   req.user = {
     id: sub,
   };
 
   next();
 } catch (err) {
   throw new AppError("Token inválido", 401);
 }
};
