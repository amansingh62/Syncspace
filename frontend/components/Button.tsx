interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ text, onClick, className = '' }: ButtonProps) => {
  return (
    <div>
      <button 
        onClick={onClick}
        className={`aesthetic-3 uppercase border text-gray-900 border-gray-300 p-2 px-4 rounded-xl ${className}`}
      >
        {text}
      </button>
    </div>
  );
};