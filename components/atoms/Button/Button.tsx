import { MouseEventHandler } from 'react';
import { Loading } from '@/components/atoms';

interface Props {
  className: 'success' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
  inactive?: boolean;
  isLoading?: boolean;
  text: string;
  type: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  className,
  inactive,
  isLoading,
  text,
  type,
  onClick
}: Props) => {
  return (
    <>
      <button
        type={type}
        disabled={inactive}
        className={`btn btn-${className}`}
        onClick={onClick}
      >
        {isLoading ? <Loading /> : text}
      </button>
    </>
  );
};

export default Button;
