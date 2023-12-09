import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { NotFoundError } from '../errors';

export const findUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const result = await userRepository.find();
  if (result.length === 0) {
    throw new NotFoundError('User not found');
  }

  return result.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname
  }));
};
