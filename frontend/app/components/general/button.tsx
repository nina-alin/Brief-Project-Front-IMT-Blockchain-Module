interface ButtonProps {
  title: string | React.ReactNode;
  primary?: boolean;
  big?: boolean;
  onClick?: () => void;
}

const Button = ({ title, primary, big, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white ${
        big && "text-4xl max-w-96 py-6 self-center"
      } rounded-xl px-4 py-2 shadow-lg bg-sky-800 shadow-sky-800/50 hover:bg-sky-900 hover:shadow-sky-900/50 font-semibold`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
