/**
 * @fileoverview time.ts
 * This file contains a function to help with time calculations. 
 */

/**
 * @description Helper function to help with time elapsed calculation
 * @param {Date} date UTC time
 */
function calculateTimeElapsed(date: Date) {
    let millisecondsElapsed = new Date().getTime() - new Date(date).getTime();
    let seconds = Math.floor(millisecondsElapsed / 1000);
    let minutes = Math.floor(millisecondsElapsed / (1000 * 60));
    let hours = Math.floor(millisecondsElapsed / (1000 * 60 * 60));
    let days = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24));
    let months = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24 * 30));
    let years = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24 * 365));
    if (seconds < 60) return `Seconds ago`;
    else if (minutes < 60) return (minutes == 1) ? `One minute ago` : `${minutes} minutes ago`;
    else if (hours < 24) return (hours == 1) ? `One hour ago` : `${hours} hours ago`;
    else if (days < 30) return (days == 1) ? `One day ago` : `${days} days ago`;
    else if (months < 12) return (months == 1) ? `One month ago` : `${months} months ago`;
    else return (years == 1) ? `One year ago` : `${years} years ago`;
}

export {
    calculateTimeElapsed
};