const logger = require("./logger");

const logError = (error) => {
	logger("error", error.stack || error.message);
};

const logInfo = (infoMsg) => {
	logger("info", infoMsg);
};

const logVerbose = (verboseMsg) => {
	logger("verbose", verboseMsg);
};

const logWarn = (warnMsg) => {
	logger("warn", warnMsg);
};

const logDebug = (debugMsg) => {
	logger("debug", debugMsg);
};

const logSilly = (sillyMsg) => {
	logger("silly", sillyMsg);
};

module.exports = { logError, logInfo, logVerbose, logWarn, logSilly, logDebug };
