export interface CreateBug {
  user: number;
  project: number;
  description: string;
}

export interface IQueryObject {
  projectId?: number;
  userId?: number;
  startDate?: Date;
  endDate?: Date;
}
