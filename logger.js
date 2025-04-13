const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ 
            format: 'YYYY-MM-DD HH:mm:ss' 
        }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'application.log' }) // Logs will be written to application.log
    ]
})


function logInfo(message, obj = null) {
    if (obj) {
        logger.log('info', `${message} - ${JSON.stringify(obj)}`);
    } else {
        logger.log('info', message);
    }
}

function logError(message, obj = null) {
    if (obj) {
        logger.log('error', `${message} - ${JSON.stringify(obj)}`);
    } else {
        logger.log('error', message);
    }
}

function logWarning(message, obj = null) {
    if (obj) {
        logger.log('warn', `${message} - ${JSON.stringify(obj)}`);
    } else {
        logger.log('warn', message);
    }
}

module.exports = {
    logInfo,
    logError,
    logWarning
};