const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async function(req, res, next) {
    try {
        // validate user with token
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);

        const decoded = jwt.verify(token, 'thisismynewstudy');// if verification is success, jwt returns the payload.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token });
        if (!user) {
            throw new Error();
        }

        req.token = token;// we are doing this because when we are logging out, user can be have multiple sessions opened(ex: mobile, tablet, work system, personal laptop) when he logs out we don't want user to log out from all devices, we want him to log out from the specific device he tried to logout.
        req.user = user;
        next();
    } catch (err) {
        res.status(404).send({error: 'Please authenticate.'})
    }
}

module.exports = auth;