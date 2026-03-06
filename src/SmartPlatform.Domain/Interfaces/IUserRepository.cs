using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmartPlatform.Domain.Entities;

namespace SmartPlatform.Domain.Interfaces;

    public interface IUserRepository
    {
        Task<User?> GetById(Guid id);
        Task Add(User user);
    }