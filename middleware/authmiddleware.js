const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the token using the JWT_SECRET environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });

        // If no user is found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Attach the token and user to the request object for further use
        req.token = token;
        req.user = user;

        // Call the next middleware in the chain
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        // Handle errors related to authentication failure
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
