import { validate, isEmpty, isNumber } from 'class-validator';
import { type FindManyOptions, Between } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { Bug } from '../entities/bug.entity';
import { NotFoundError, BadRequestError } from '../errors';
import { type IQueryObject } from '../types/types';

export const saveBug = async (
  userId: number,
  projectId: number,
  description: string
) => {
  if (isEmpty(userId) || isEmpty(projectId) || isEmpty(description.trim())) {
    throw new BadRequestError('User, Project and Description are required');
  }
  if (!isNumber(userId) || !isNumber(projectId)) {
    throw new BadRequestError('user and project must be number');
  }
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (user === null) {
    throw new NotFoundError('User not found');
  }

  const projectRepository = AppDataSource.getRepository(Project);
  const project = await projectRepository.findOneBy({ id: projectId });
  if (project === null) {
    throw new NotFoundError('Project not found');
  }

  const bugRepository = AppDataSource.getRepository(Bug);
  const bug = new Bug();
  bug.description = description;
  bug.project = project;
  bug.user = user;

  const errors = await validate(bug);
  if (errors.length > 0) {
    throw new BadRequestError(
      `Must provide a valid value for ${errors[0].property}`
    );
  }

  return await bugRepository.save(bug);
};

export const findBugs = async (queryObject: IQueryObject) => {
  if (
    queryObject.startDate !== undefined &&
    queryObject.endDate === undefined
  ) {
    throw new BadRequestError(
      'If start_date provided then must provide end_date'
    );
  }
  if (
    queryObject.endDate !== undefined &&
    queryObject.startDate === undefined
  ) {
    throw new BadRequestError(
      'If end_date provided then must provide start_date'
    );
  }

  const bugRepository = AppDataSource.getRepository(Bug);
  const queryOptions: FindManyOptions<Bug> = {};

  queryOptions.relations = { project: true, user: true };
  if (queryObject.projectId !== undefined) {
    queryOptions.where = { project: { id: queryObject.projectId } };
  }
  if (queryObject.userId !== undefined) {
    queryOptions.where = {
      ...queryOptions.where,
      user: { id: queryObject.userId }
    };
  }

  if (
    queryObject.startDate !== undefined &&
    queryObject.endDate !== undefined
  ) {
    queryOptions.where = {
      ...queryOptions.where,
      creationDate: Between(queryObject.startDate, queryObject.endDate)
    };
  }

  const result = await bugRepository.find(queryOptions);
  if (result.length === 0) {
    throw new NotFoundError('Bug not found');
  }

  return result.map((bug) => ({
    id: bug.id,
    description: bug.description,
    creationDate: bug.creationDate,
    username: bug.user.name,
    project: bug.project.name
  }));
};
