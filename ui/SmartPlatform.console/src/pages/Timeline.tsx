interface TimelineEvent {
  color: string;
  time: string;
  title: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-4">
      {events.map((event, idx) => (
        <div key={idx} className="mb-8 ml-6 relative">
          <span className={`absolute -left-4 w-4 h-4 rounded-full ${event.color}`}></span>
          <time className="text-gray-500 dark:text-gray-400">{event.time}</time>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{event.title}</p>
        </div>
      ))}
    </div>
  );
}