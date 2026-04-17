const { sendMail } = require('../services/mailService');

async function handleDeadlineReminder(payload) {
    if (!payload.email) throw new Error("Missing email");

    const deadline = new Date(payload.deadline);
    const hoursLeft = Math.round((deadline - new Date()) / (1000 * 60 * 60));
    const deadlineStr = deadline.toLocaleString('nl-NL', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    await sendMail(
        payload.email,
        'Reminder: There is still time to submit your photo!',
        `You have ${hoursLeft} hours left to submit your photo. The deadline is ${deadlineStr}.`
    );
}

module.exports = {
    handleDeadlineReminder,
};