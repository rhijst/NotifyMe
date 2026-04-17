const {
    handleDeadlineReminder,
} = require('./mailHandlers');

module.exports = {
    'deadline.reminder': handleDeadlineReminder,
};