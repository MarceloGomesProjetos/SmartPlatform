namespace SmartPlatform.Infrastructure.Data.EventStore;

public class StoredEvent
{
    public Guid Id { get; set; }

    public string AggregateType { get; set; } = null!;

    public Guid AggregateId { get; set; }

    public string EventType { get; set; } = null!;

    public string EventData { get; set; } = null!;

    public DateTime OccurredOn { get; set; }

    public int Version { get; set; }
}