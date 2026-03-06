using Microsoft.EntityFrameworkCore;
using SmartPlatform.Domain.Entities;
using SmartPlatform.Infrastructure.Data.EventStore;
using SmartPlatform.Infrastructure.Data.Timeline;
using SmartPlatform.Infrastructure.Messaging.Outbox;

namespace SmartPlatform.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();

    public DbSet<StoredEvent> StoredEvents => Set<StoredEvent>();

    public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();

    public DbSet<SystemTimelineEvent> TimelineEvents => Set<SystemTimelineEvent>();

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}