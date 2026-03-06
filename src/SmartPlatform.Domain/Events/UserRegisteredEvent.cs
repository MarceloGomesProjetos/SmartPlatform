using SmartPlatform.Domain.Common;

namespace SmartPlatform.Domain.Events;

public class UserRegisteredEvent : IDomainEvent
{
    public Guid UserId { get; }

    public string Email { get; }

    public DateTime OccurredOn { get; } = DateTime.UtcNow;

    public UserRegisteredEvent(Guid userId, string email)
    {
        UserId = userId;
        Email = email;
    }
}