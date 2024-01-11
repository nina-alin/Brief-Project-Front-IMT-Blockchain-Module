import { IoMdClose } from "react-icons/io";

interface ParticipantsModalProps {
  onClose: () => void;
}

const ParticipantsModal = ({ onClose }: ParticipantsModalProps) => {
  // TODO: get the participants

  return (
    <div className="flex flex-col divide-y gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-xl">Participants</h2>
        <div className="hover:cursor-pointer" onClick={onClose}>
          <IoMdClose />
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
