import { User } from '../dbModels/user.model';

export interface RequestAuth extends Request {
  user: User;
}
