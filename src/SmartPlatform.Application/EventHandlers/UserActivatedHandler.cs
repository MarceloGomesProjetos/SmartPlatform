using MediatR;
using SmartPlatform.Domain.Events;

namespace SmartPlatform.Application.EventHandlers;

public class UserActivatedHandler : INotificationHandler<UserActivatedEvent>
{
    public Task Handle(UserActivatedEvent notification, CancellationToken cancellationToken)
    {
        Console.WriteLine($"User activated: {notification.UserId}");

        return Task.CompletedTask;
    }
}