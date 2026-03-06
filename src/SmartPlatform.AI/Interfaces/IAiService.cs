using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartPlatform.AI.Interfaces
{
    public interface IAiService
    {
        Task<string> AskAsync(string question);   
    }
}