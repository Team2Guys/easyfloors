import { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={ `max-w-[95%] lg:max-w-[92%] min-w-[95%] lg:min-w-[92%]  mx-auto   ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
