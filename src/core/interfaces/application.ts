import { IHistory } from "./history";
import { ISkill } from "./skill";

export interface IApplication {
  id?: number;
  link: string;
  title: string;
  company: string;
  applicationDate: Date;
  contractType: string | null;
  workStyle: string | null;
  compensation: number;
  anotations: string | null;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  userId: string;

  history?: IHistory[];
  skills?: ISkill[];
}
