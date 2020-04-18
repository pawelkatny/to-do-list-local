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
        color: colors[Math.floor(Math.random() * 6)]
    }

    return newList;
}   