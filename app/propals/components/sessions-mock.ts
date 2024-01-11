import { STATUS } from "../../components/types/enums";

export interface Session {
  id: string;
  title: string;
  status: STATUS;
}

export const sessions: Session[] = [
  {
    id: "1",
    title: "Stop killing the planet",
    status: STATUS.OPEN,
  },
  {
    id: "2",
    title: "How to make a good pizza?",
    status: STATUS.VOTING,
  },
  {
    id: "3",
    title: "What is the best programming language?",
    status: STATUS.CLOSED,
  },
];
