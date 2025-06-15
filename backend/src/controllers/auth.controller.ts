import { Request, Response } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { Types, Document } from 'mongoose';
import { User } from '../models/user.model';
import { LoginCredentials, RegisterCredentials } from '../types/user';
import { errorResponse, successResponse } from '../utils/response.utils';

const generateToken = (id: Types.ObjectId) => {


  const jwtSecret: Secret = process.env.JWT_SECRET!;
  const options: SignOptions = {
    expiresIn: '8h'
  };

  return jwt.sign({ id: id.toString() }, jwtSecret, options);
};

interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword }: RegisterCredentials = req.body;

    if (password !== confirmPassword) {

      return errorResponse(res, 'Passwords do not match')
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists')

    }

    const user = await User.create({
      email,
      password,
    }) as IUserDocument;

    const token = generateToken(user._id);

    return successResponse(res, 'registeration successfull', {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    })

    
  } catch (error: any) {

    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginCredentials = req.body;



    const user = await User.findOne({ email }) as IUserDocument | null;
    if (!user) {
      return errorResponse(res, 'Invalid credentials')

    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials')

    }

    const token = generateToken(user._id);

    return successResponse(res, 'Login successfull', {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    })


  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 