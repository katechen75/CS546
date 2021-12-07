function validString(strng) {
    if (!strng || typeof strng !== 'string' || !strng.trim()) return false;
    return true;
}

function validBoolean(bool) {
    if (typeof bool !== 'boolean') return false;
    return true;
}

function convertId(doc) {
    doc._id = doc._id.toString();
    return doc;
}

/*function validAge(age){
    if (!age || typeof age != 'number' || !Number.isInteger(age) || age < 1) return false;
    return true;
}

function validRating(num){
    if (!num || (typeof num != 'number') || !Number.isInteger(num) || num < 1 || num > 5) return false;
    return true;
}*/

function validEmail(email) {
    if (!validString(email)) return false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validMetrics(metrics) {
    if ((!metrics || typeof(metrics)!=='object') || (!validBoolean(metrics.distancedTables)) ||
        (!validBoolean(metrics.maskedEmployees)) || (!validBoolean(metrics.noTouchPayment))  ||
        (!validBoolean(metrics.outdoorSeating))  || (!validRating(metrics.price)) ||
        (!validRating(metrics.rating))) return false;

    return true;
}

function validLink(link) {
    if (!validString(link)) return false;
    const re = /^https:\/\/www\.yelp\.com\/biz\/((\w+)-)*\w+/;
    return re.test(String(link).toLowerCase());
}

function generateList(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

module.exports = {
    validString,
    convertId,
    //validAge,
    //validEmail,
    validBoolean,
    //validRating,
    validMetrics,
    validLink,
    generateList
};
