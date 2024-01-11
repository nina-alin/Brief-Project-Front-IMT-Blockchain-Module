import { STATUS } from "../../components/types/enums";
import { IoIosCheckmark } from "react-icons/io";
import { MdHowToVote } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Icon = ({ status }: { status: STATUS }) => {
  switch (status) {
    case STATUS.OPEN:
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400 flex items-center gap-1">
          <IoIosCheckmark />
          Open
        </span>
      );
    case STATUS.VOTING:
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400 flex items-center gap-1">
          <MdHowToVote />
          Voting
        </span>
      );
    case STATUS.CLOSED:
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-red-400 flex items-center gap-1">
          <IoMdClose />
          Closed
        </span>
      );
  }
};

export default Icon;
