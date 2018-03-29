module.exports.FindByCssQuery  = async(dom, cssQuery) => {
    try {
        return await dom.querySelector(cssQuery);
    } catch (err) {
        console.log('Error trying to find element by css selector = ' + cssQuery, err);
    }

};

