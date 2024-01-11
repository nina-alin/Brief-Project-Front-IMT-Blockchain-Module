import { IoMdClose } from "react-icons/io";
import Input from "../../components/general/input";
import Button from "../../components/general/button";

interface AddModalProps {
  onCloseModal: () => void;
}

const AddModal = ({ onCloseModal }: AddModalProps) => {
  return (
    <div className="flex flex-col divide-y gap-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-xl">Add a new propal</h2>
        <div className="hover:cursor-pointer" onClick={onCloseModal}>
          <IoMdClose />
        </div>
      </div>
      <Input label="Title" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Peoples</p>
        {/* TODO: add name of people that are able to vote */}
        {/* TODO: style this */}
        <select multiple className="w-full">
          <option value="1">Adress 1</option>
          <option value="2">Adress 2</option>
        </select>
      </div>
      <div className="flex text-center justify-end text-white">
        <Button title="Create" />
      </div>
    </div>
  );
};

export default AddModal;
