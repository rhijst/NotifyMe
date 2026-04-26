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

async function handleUserCreated(payload) {
    if (!payload.email) throw new Error("Missing email");

    await sendMail(
        payload.email,
        'Welcome to NotifyMe!',
        `Hi there,\n\nWelcome to NotifyMe! Your account has been created successfully.\n\nYou can now log in and start managing your tasks.\n\nBest regards,\nThe NotifyMe Team`
    );
}

module.exports = {
    handleDeadlineReminder,
    handleUserCreated,
};