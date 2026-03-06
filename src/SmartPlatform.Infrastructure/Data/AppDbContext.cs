using System.Text.Json;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartPlatform.Domain.Common;
using SmartPlatform.Domain.Entities;
using SmartPlatform.Infrastructure.Messaging.Outbox;

namespace SmartPlatform.Infrastructure.Data;

public class AppDbContext : DbContext
{
    private readonly IMediator _mediator;

    public DbSet<User> Users => Set<User>();

    public AppDbContext(
        DbContextOptions<AppDbContext> options,
        IMediator mediator) : base(options)
    {
        _mediator = mediator;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var domainEvents = ChangeTracker
            .Entries<BaseEntity>()
            .SelectMany(x => x.Entity.DomainEvents)
            .ToList();

        var result = await base.SaveChangesAsync(cancellationToken);

        if (domainEvents.Any())
        {
            var outboxMessages = domainEvents.Select(domainEvent => new OutboxMessage
            {
                Id = Guid.NewGuid(),
                OccurredOn = DateTime.UtcNow,
                Type = domainEvent.GetType().Name,
                Content = JsonSerializer.Serialize(domainEvent)
            });

            await OutboxMessages.AddRangeAsync(outboxMessages, cancellationToken);

            await base.SaveChangesAsync(cancellationToken);
        }

        return result;
    }

    private async Task DispatchDomainEvents()
    {
        var entities = ChangeTracker
            .Entries<BaseEntity>()
            .Where(x => x.Entity.DomainEvents.Any())
            .Select(x => x.Entity);

        var domainEvents = entities
            .SelectMany(x => x.DomainEvents)
            .ToList();

        foreach (var entity in entities)
            entity.ClearDomainEvents();

        foreach (var domainEvent in domainEvents)
            await _mediator.Publish(domainEvent);
    }

    public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();
}