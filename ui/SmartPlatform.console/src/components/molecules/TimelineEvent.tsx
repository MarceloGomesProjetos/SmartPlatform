
import React from 'react';
import { Icon } from '../atoms/Icon';
import { type LucideProps } from 'lucide-react';

interface TimelineEventProps {
  isLast?: boolean;
  icon: React.ElementType;
  iconBgColor: string;
  time: string;
  title: string;
  description: string;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  isLast = false,
  icon,
  iconBgColor,
  time,
  title,
  description,
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}>
            <Icon as={icon} className="h-5 w-5 text-white" />
          </div>
        </div>
        {!isLast && <div className="w-px h-full bg-slate-300 dark:bg-slate-700" />}
      </div>
      <div className="pb-8">
        <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">{time}</p>
        <p className="font-semibold text-slate-900 dark:text-slate-50">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
};
