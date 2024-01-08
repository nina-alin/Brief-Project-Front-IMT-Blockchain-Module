import Button from "../components/general/button";
import Navbar from "../components/navbar/navbar";
import { IoIosCheckmark } from "react-icons/io";
import { MdHowToVote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

enum STATUS {
  OPEN = "open",
  VOTING = "voting",
  CLOSED = "closed",
}

interface Session {
  id: string;
  title: string;
  status: STATUS;
}

const sessions: Session[] = [
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

const Icon = ({ status }: { status: STATUS }) => {
  switch (status) {
    case STATUS.OPEN:
      return <IoIosCheckmark className={"text-green-500 text-2xl"} />;
    case STATUS.VOTING:
      return <MdHowToVote className={"text-blue-300 text-2xl"} />;
    case STATUS.CLOSED:
      return <IoMdClose className={"text-red-600 text-2xl"} />;
  }
};

const PropalsPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-8 mt-10 text-white flex flex-col gap-10">
        <div className="flex align-middle justify-between">
          <p className="text-2xl">Welcome, Admin!</p>{" "}
          {/* TODO: add name of the admin */}
          <Button title="Create a new propal" />
        </div>
        <table className="border-2 border-white w-full">
          <th className="p-6 w-full border-b-white border-2">
            <td>Title</td>
            <td>Status</td>
          </th>
          {sessions.map((session) => (
            <tr
              className="hover:cursor-pointer hover:bg-blue-900"
              key={session.id}
            >
              <Link href={`/propals/${session.id}`}>
                <td className="px-6 py-2 hover:underline">{session.title}</td>
                <td className="px-20 py-2">
                  <Icon status={session.status} />
                </td>
              </Link>
            </tr>
          ))}
        </table>
      </main>
    </>
  );
};

export default PropalsPage;
