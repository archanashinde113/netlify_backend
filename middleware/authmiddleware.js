const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
      
        const token = req.header('Authorization').replace('Bearer ', '');

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });

        
        if (!user) {
            throw new Error('User not found');
        }

        
        req.token = token;
        req.user = user;

        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
