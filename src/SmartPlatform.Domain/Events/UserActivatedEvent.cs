using MediatR;

namespace SmartPlatform.Domain.Events;

public record UserActivatedEvent(Guid UserId) : INotification;