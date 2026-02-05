import React from 'react';

interface HeartIconProps {
  fill?: string;
  className?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  fill = 'none',
  className,
}) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 2.5C6 0 2 1 2 5c0 4 6 8 6 8s6-4 6-8c0-4-4-5-6-2.5z"
        strokeWidth="1.5"
        stroke="currentColor"
        fill={fill}
      />
    </svg>
  );
};
