using SmartPlatform.Domain.Entities;

namespace SmartPlatform.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetById(Guid id);

    Task Add(User user);
}