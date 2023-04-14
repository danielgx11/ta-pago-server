import { Request, Response } from 'express';
import User from '../../../database/models/user';
import { LoginRequest } from '../../ports/requests';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const crypto = require('crypto');

const login = async (req: Request, res: Response): Promise<Response | void> => {
  const loginAttributes: LoginRequest = {
    email: req.body.email,
    password: req.body.password,
  }

  const current = await User.findOne({
    where: {
      email: loginAttributes.email
    },
  });

  if (!current) {
    return res.status(401).end();
  }

  const hashPassword = crypto.createHmac('SHA256', process.env.PASSWORD_KEY)
    .update(loginAttributes.password)
    .digest('base64');

  if (hashPassword === current.password && process.env.SECRET) {
    const token = jwt.sign({
      userId: current.userId
    }, process.env.SECRET, { expiresIn: 86400 });
    return res.json({ accessToken: token });

  } else {
    res.status(401).end();
  }
}

export { login }
