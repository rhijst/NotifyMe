const {
    handleDeadlineReminder,
    handleUserCreated,
} = require('./mailHandlers');

module.exports = {
    'deadline.reminder': handleDeadlineReminder,
    'user.created': handleUserCreated,
};