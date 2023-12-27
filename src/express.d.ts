import { User } from './users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
