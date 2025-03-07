declare namespace Express {
  interface Request {
    user?: { id: string; token: string; iat: number; exp: number };
  }
}
