export interface IHistory {
  id?: string;
  status: string;
  anotation?: string | null;

  createdAt?: Date | null;
  updatedAt?: Date | null;

  applicationId?: number;
}
