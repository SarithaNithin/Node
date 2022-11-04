
const validator = (data) => {
    if(!data) {
        console.log(data);
        if(data.dob) {
            checkDateFormat(data.dob);
        }
    }
    

}
const checkDateFormat = (dob) => {
    console.log(typeof dob);
};

module.exports = {
    validator
};