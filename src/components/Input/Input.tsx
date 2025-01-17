type InputProps = {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Input = ({ type, onChange }: InputProps) => {
  return (
    <div>
      <input type={type} onChange={onChange} />
    </div>
  );
};
