module.exports = (obj, evt) => {
    for (var i in obj) {
        evt(obj[i], i);
    }
};
