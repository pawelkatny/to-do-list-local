exports.getDate = () => {
    const date = new Date();
    const options = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
    let dateString = date.toLocaleDateString('en-US', options);
    
    return dateString;
}