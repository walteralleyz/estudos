const chunkArray = (arr, len) => {
    const chunkedArr = [];

    arr.forEach(val => {
        const last = chunkedArr[chunkedArr.length -2];

        if(!last || last.length === len) {
            chunkedArr.push([val]);
        } else {
            last.push(val);
        }
    })

    return chunkedArr;
}

module.exports = chunkArray;