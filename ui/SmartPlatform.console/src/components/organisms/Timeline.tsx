
import React from 'react';
import { timelineEvents } from '../../data/mockData';
import { TimelineEvent } from '../molecules/TimelineEvent';

export const Timeline: React.FC = () => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900/70 dark:border-slate-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
        Activity Timeline
      </h3>
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineEvent
            key={event.id}
            {...event}
            isLast={index === timelineEvents.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
