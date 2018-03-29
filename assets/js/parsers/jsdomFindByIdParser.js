module.exports.FindById = async(dom, targetElementId)=>{
    try {
        return await dom.getElementById(targetElementId);
    } catch (err) {
        console.log('Error trying to find element by id', err);
    }
};




