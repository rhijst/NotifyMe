const mockAssertExchange = jest.fn().mockResolvedValue({});
const mockPublish = jest.fn();

jest.mock('../src/config/rabbit', () => ({
  getChannel: () => ({ assertExchange: mockAssertExchange, publish: mockPublish }),
}));

const { publishEvent } = require('../src/services/rabbitService');

test('publishEvent publishes a serialized payload to the correct exchange and routing key', async () => {
  await publishEvent('events', 'user.created', { userId: 'abc', email: 'user@example.com' });

  expect(mockAssertExchange).toHaveBeenCalledWith('events', 'topic', { durable: true });
  expect(mockPublish).toHaveBeenCalledWith(
    'events',
    'user.created',
    Buffer.from(JSON.stringify({ userId: 'abc', email: 'user@example.com' })),
    { persistent: true }
  );
});
