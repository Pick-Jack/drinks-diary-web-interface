

/**
 * Determine the status of a diary using the start and end dates
 * @param {Date} startDate date diary recording commences
 * @param {Date} endDate  date diary recording finishes
 * @returns {String} String representing the status of the diary
 */
export const getStatus = (startDate, endDate) => {
    const currentDate = new Date()

    if (currentDate >= startDate && currentDate <= endDate) {
        return "Active"
    } else if (currentDate < startDate) {
        return "Pending"
    } else {
        return "Complete"
    }
}
