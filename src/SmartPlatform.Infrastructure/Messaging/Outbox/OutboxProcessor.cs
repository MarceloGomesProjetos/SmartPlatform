using Microsoft.EntityFrameworkCore;
using SmartPlatform.Infrastructure.Data;
using System.Text.Json;

namespace SmartPlatform.Infrastructure.Messaging.Outbox;

public class OutboxProcessor
{
    private readonly AppDbContext _context;

    public OutboxProcessor(AppDbContext context)
    {
        _context = context;
    }

    public async Task ProcessAsync()
    {
        var messages = await _context.OutboxMessages
            .Where(x => x.ProcessedOn == null)
            .ToListAsync();

        foreach (var message in messages)
        {
            try
            {
                Console.WriteLine($"Publishing event {message.Type}");

                // aqui entraria Kafka, RabbitMQ, etc

                message.ProcessedOn = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                message.Error = ex.Message;
            }
        }

        await _context.SaveChangesAsync();
    }
}