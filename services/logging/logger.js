const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const logsDirectory = path.join(__dirname, "..", "..", "logs");

const logFormat = printf(({ level, message, timestamp }) => {
	return `[${timestamp}] [${level}]: ${message}`;
});

const logLevels = ["error", "warn", "info", "verbose", "debug", "silly"];
const loggers = logLevels.reduce((allLoggers, level) => {
	allLoggers[level] = createLogger({
		format: combine(timestamp(), logFormat),
		transports: [
			(process.env.NODE_ENV !== "production") ? new transports.Console({
				format: format.simple(),
			}) : null,
			new DailyRotateFile({
				level: `${level}`,
				dirname: path.join(logsDirectory, `${level}`),
				filename: `${level}-%DATE%.log`,
				datePattern: "YYYY-MM-DD",
				zippedArchive: true,
				maxSize: "20m",
				maxFiles: "14d",
			}),
		],
	});
	return allLoggers;
}, {});

const appLogger = (level, message) => {
	loggers[level].log(level, message);
};

module.exports = appLogger;
