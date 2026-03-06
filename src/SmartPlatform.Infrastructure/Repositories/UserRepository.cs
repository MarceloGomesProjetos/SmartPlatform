using System;
using System.Collections.Generic;
using SmartPlatform.Infrastructure.Data;
using SmartPlatform.Domain.Entities;
using SmartPlatform.Domain.Interfaces;

namespace SmartPlatform.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetById(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task Add(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
}
