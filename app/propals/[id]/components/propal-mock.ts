import { STATUS } from "../../../components/types/enums";

export interface Propal {
  id: string;
  title: string;
  description: string;
  votes?: {
    id: string;
    user: string;
  }[];
}

export interface Session {
  id: string;
  title: string;
  status: STATUS;
  propals: Propal[];
}

export const session: Session = {
  id: "1",
  title: "Stop killing the planet",
  status: STATUS.OPEN,
  propals: [
    {
      id: "1",
      title: "Stop using plastic",
      description: "Plastic is bad for the planet",
      votes: [
        {
          id: "1",
          user: "0x123456789",
        },
      ],
    },
    {
      id: "2",
      title: "Stop using cars",
      description: "Cars are bad for the planet",
      votes: [
        {
          id: "1",
          user: "0x123456789",
        },
        {
          id: "2",
          user: "0x987654321",
        },
      ],
    },
    {
      id: "3",
      title: "Stop using planes",
      description: "Planes are bad for the planet",
      votes: [
        {
          id: "1",
          user: "0x123456789",
        },
        {
          id: "2",
          user: "0x987654321",
        },
        {
          id: "3",
          user: "0x123456789",
        },
      ],
    },
  ],
};
