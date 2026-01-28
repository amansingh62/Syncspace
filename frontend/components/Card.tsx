interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const Card = ({ icon, title, description, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-3xl border border-gray-200 p-6 ${className}`}>
      <div className="flex justify-center mb-8">
        {icon}
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};