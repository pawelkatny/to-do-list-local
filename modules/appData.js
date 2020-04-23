const colors = ['blue', 'cream', 'green', 'red', 'pink', 'purple'];

exports.getDate = () => {
    const date = new Date();
    const options = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
    let dateString = date.toLocaleDateString('en-US', options);
    
    return dateString;
}

exports.newList = (body, listID) => {
    const newList = {
        ID: listID,
        title: body.title,
        items: [], 
        color: colors[Math.floor(Math.random() * colors.length)]
    }

    return newList;
}   

exports.newItem = (body, itemID) => {
    const newItem = {
        ID: itemID,
        value: body.newItem,
        done: false
    }

    return newItem;
}

exports.getID = (array) => {
    let ID;
    if (!Array.isArray(array) || !array.length) {
        ID = 0;
    } else {
        ID = array[array.length - 1].ID + 1;
    }

    return ID;
}

exports.findID = (array, listID) => {
    const listIndex = array.findIndex(ele => ele.ID === Number(listID));
 
    return listIndex;
}

// s