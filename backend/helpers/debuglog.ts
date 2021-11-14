/**
 * @fileoverview debuglog.ts
 * This file contains a function for consistent console logging. 
 */

/**
 * @function debuglog : function to help with consistent console logging
 * @param {string} type : type of message, either LOG or DEBUG or ERROR
 * @param {string} func : function information to help identify where the log is coming from
 * @param {string} message : console log message
 */
function debuglog(type: String, func: String, message: String){
    console.log(`[${type}] :: ${func} :: ${message} :: ` + new Date());
}

export {
    debuglog
};