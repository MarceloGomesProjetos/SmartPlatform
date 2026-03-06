using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using SmartPlatform.Domain.Common;
using SmartPlatform.Infrastructure.Data.EventStore;
using SmartPlatform.Infrastructure.Messaging.Outbox;
using SmartPlatform.Infrastructure.Data.Timeline;
using System.Text.Json;

namespace SmartPlatform.Infrastructure.Data.Interceptors;

public class DomainEventsInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;

        if (context == null)
            return base.SavingChangesAsync(eventData, result, cancellationToken);

        var aggregates = context.ChangeTracker
            .Entries<AggregateRoot>()
            .Where(x => x.Entity.DomainEvents.Any())
            .Select(x => x.Entity);

        foreach (var aggregate in aggregates)
        {
            foreach (var domainEvent in aggregate.DomainEvents)
            {
                var eventDataJson = JsonSerializer.Serialize(domainEvent);

                // Event Store
                context.Set<StoredEvent>().Add(new StoredEvent
                {
                    Id = Guid.NewGuid(),
                    AggregateType = aggregate.GetType().Name,
                    AggregateId = (Guid)aggregate.GetType().GetProperty("Id")!.GetValue(aggregate)!,
                    EventType = domainEvent.GetType().Name,
                    EventData = eventDataJson,
                    OccurredOn = (DateTime)domainEvent.GetType().GetProperty("OccurredOn")!.GetValue(domainEvent)!
                });

                // Outbox
                context.Set<OutboxMessage>().Add(new OutboxMessage
                {
                    Id = Guid.NewGuid(),
                    Type = domainEvent.GetType().Name,
                    Payload = eventDataJson,
                    OccurredOn = (DateTime)domainEvent.GetType().GetProperty("OccurredOn")!.GetValue(domainEvent)!
                });

                // Timeline
                context.Set<SystemTimelineEvent>().Add(new SystemTimelineEvent
                {
                    Id = Guid.NewGuid(),
                    EventType = domainEvent.GetType().Name,
                    Description = $"{domainEvent.GetType().Name} ocorreu no sistema",
                    CreatedAt = DateTime.UtcNow
                });
            }

            aggregate.ClearDomainEvents();
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}