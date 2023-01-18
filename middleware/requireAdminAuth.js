const jwt = require('jsonwebtoken');

const requireAdminAuth = (req, res, next) => {

    // Verify authentication
    const {authorization} = req.headers;
    // If no JWT found
    if (!authorization){
        return res.status(401).json({ error: "No authentication token found! Please login again" });
    }
    
    const token = authorization.split(' ')[1];

    try{
        const { _id, email, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);
        // Verify OK
        req.adminUser = email;
        next();
    }
    catch(e){
        console.log(e.message);
        return res.status(401).json({ error: "Unauthorized: User verify failed" });
    }

}

module.exports = requireAdminAuth;