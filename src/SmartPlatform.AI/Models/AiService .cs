using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmartPlatform.AI.Interfaces;

namespace SmartPlatform.AI.Models
{
    public class AiService : IAiService
    {
        public async Task<string> AskAsync(string question)
        {
            // Simulate an AI response with a delay
            return $"AI Response to: {question}";
        }
    }
}