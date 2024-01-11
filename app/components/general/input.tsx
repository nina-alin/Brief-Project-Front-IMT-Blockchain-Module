interface InputProps {
  label: string;
}

const Input = ({ label }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{label}</p>
      <input className="border border-gray-400 rounded-md p-2" />
    </div>
  );
};

export default Input;
