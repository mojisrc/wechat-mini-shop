function genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

module.exports = {
    genID: genID,
}
