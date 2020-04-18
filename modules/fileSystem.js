const fs = require('fs');
const dataPath = './data/lists/';

exports.loadLists = () => {
    const lists = []
    const fileList = fs.readdirSync(dataPath);

    fileList.forEach(file => {
        let dataJSON = JSON.parse(fs.readFileSync(dataPath + file));
        lists.push(dataJSON);
    })

    return lists;
}
