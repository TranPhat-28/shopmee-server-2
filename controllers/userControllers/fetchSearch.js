const Product = require("../../models/product");

const fetchSearch = (req, res) => {
    // Product name
    const queryName = req.query.name;
    const queryMin = req.query.min;
    const queryMax = req.query.max;
    const queryCategory = req.query.category;

    // Check missing product query name
    if (queryName && queryName !== ''){
        const name = queryName.replaceAll('+', ' ');
        //console.log(name);

        // Query ojb
        // Query products whose name contains name param
        let queryObj = {
            productName: { "$regex": name, "$options": "i" }
        }
        // If min and max are both set
        if (queryMin && queryMax){
            queryObj.price = { $gte :  queryMin, $lte: queryMax }
        }
        //If only min OR max is set
        else if (queryMin){
            queryObj.price = { $gte :  queryMin}
        }
        else if (queryMax){
            queryObj.price = { $lte :  queryMax}
        }
        // If category is set
        if (queryCategory) {
            queryObj.category = queryCategory
        }

        // Page number
        const page = req.body.pagenumber;
        const resultPerPage = 5;
        // Show 10 per page
        //let resultPromise = await Product.find(queryObj).skip((page - 1) * 10).limit(10).catch(e => {
        //    console.log(e.message)
        //})


        Product.find(queryObj).skip(page * resultPerPage).limit(resultPerPage).then(data => {
            //console.log(data)
            res.json(data);
        }).catch(e => {
            console.log(e.message);
            res.status(500).json(e.message);
        })   
    }
}

module.exports = fetchSearch;