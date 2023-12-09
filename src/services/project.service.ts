import { AppDataSource } from '../config/data-source';
import { Project } from '../entities/project.entity';
import { NotFoundError } from '../errors';

export const findProjects = async () => {
  const projectRepository = AppDataSource.getRepository(Project);

  const result = await projectRepository.find();
  if (result.length === 0) {
    throw new NotFoundError('Project not found');
  }

  return result.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description
  }));
};
