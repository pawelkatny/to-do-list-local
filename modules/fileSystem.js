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

exports.saveList = (listID, data) => {
    let file = dataPath + listID + '.txt';
    let buffer = JSON.stringify(data);

    fs.open(file, 'w', (err, fd) => {
        if (err) {
            throw 'Could not create file. ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, (err) => {
            if (err) throw 'Error writing file: ' + err;
            fs.close(fd, () => {
                console.log('File written successfully.');
            })
        })
    })
}

exports.updateFile = (list) => {
    console.log(list)
    let file = dataPath + list.ID + '.txt';
    let buffer = JSON.stringify(list);

    fs.writeFile(file, buffer, (err) => {
        if (err) throw 'Error updating file: ' + err;
        console.log('File saved successfully.');
    })
}