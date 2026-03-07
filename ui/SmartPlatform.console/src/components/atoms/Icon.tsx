
import React from 'react';
import type { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  as: React.ElementType;
}

export const Icon: React.FC<IconProps> = ({ as: IconComponent, ...props }) => {
  return <IconComponent {...props} />;
};
