jest.mock('resend');
const { Resend } = require('resend');

const mockSend = jest.fn().mockResolvedValue({});
Resend.mockImplementation(() => ({ emails: { send: mockSend } }));

const { sendMail } = require('../src/services/mailService');

test('sendMail sends an email with the correct parameters', async () => {
  await sendMail('test@example.com', 'Hello', 'Body text');

  expect(mockSend).toHaveBeenCalledWith({
    from: 'NotifyMe <onboarding@resend.dev>',
    to: ['test@example.com'],
    subject: 'Hello',
    text: 'Body text',
  });
});
