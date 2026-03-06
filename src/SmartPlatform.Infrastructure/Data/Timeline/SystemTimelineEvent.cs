namespace SmartPlatform.Infrastructure.Data.Timeline;

public class SystemTimelineEvent
{
    public Guid Id { get; set; }

    public string EventType { get; set; } = null!;

    public string Description { get; set; } = null!;

    public Guid? UserId { get; set; }

    public DateTime CreatedAt { get; set; }
}