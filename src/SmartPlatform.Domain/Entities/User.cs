using SmartPlatform.Domain.Common;
using SmartPlatform.Domain.Events;

namespace SmartPlatform.Domain.Entities;

public class User : BaseEntity
{
    public Guid Id { get; set; }

    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public void Activate()
    {
        AddDomainEvent(new UserActivatedEvent(Id));
    }
}