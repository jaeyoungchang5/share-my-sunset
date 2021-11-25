/**
 * @fileoverview debuglog.ts
 * This file contains a function for consistent console logging. 
 */

/**
 * @description Helper function to help with consistent logging
 * @param {string} type Type of message, either LOG or DEBUG or ERROR
 * @param {string} func Name of controller/function
 * @param {string} message Message
 */
function debuglog(type: String, func: String, message: String){
    console.log(`[${type}] :: ${func} :: ${message} :: ` + new Date());
}

export {
    debuglog
};