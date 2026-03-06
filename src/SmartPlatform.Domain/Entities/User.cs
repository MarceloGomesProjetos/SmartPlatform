using SmartPlatform.Domain.Common;
using SmartPlatform.Domain.Events;

namespace SmartPlatform.Domain.Entities;

public class User : AggregateRoot
{
    public Guid Id { get; private set; }

    public string Name { get; private set; } = null!;

    public string Email { get; private set; } = null!;

    public static User Create(string name, string email)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = name,
            Email = email
        };

        user.AddDomainEvent(new UserRegisteredEvent(user.Id, email));

        return user;
    }
}