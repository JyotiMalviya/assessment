const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const UserModel = db.User;

module.exports = {
    register,
    login
};

//register user
async function register(req, res) {
    var userParam = req.body;
    if (Object.keys(userParam).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    // validate
    if (await UserModel.findOne({ username: userParam.username })) {
        return res.status(400).send(`Username ${userParam.username} is already taken`);
    }

    const user = new UserModel(userParam);

    // hash password
    if (userParam.password) {
        user.hash_password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save()
    .then((doc) => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send({"message" : "User Registered successfully!!!", "data" : doc});
    }
    )
    .catch(err => {
        res.status(500).json(err);
    });
}


// login
async function login(req, res) {
    const postData = req.body;

    //validate inputs
    if (Object.keys(postData).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    if(!postData.username) {
        return res.status(422).json({
          errors: {
            username: 'is required',
          },
        });
      }

      if(!postData.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }

    //get user
    const user = await UserModel.findOne({ username: postData.username });

    //authenticate user
    if (user && bcrypt.compareSync(postData.password, user.hash_password)) {
        const token = jwt.sign({ sub: user.id }, config.secret, {expiresIn : config.tokenLife});
        const refreshToken = jwt.sign({ sub: user.id }, config.refreshTokenSecret, {expiresIn : config.refreshTokenLife});
        const response = {
            "status" : "LoggedIn",
            "token" : token,
            "refreshToken" : refreshToken
        }
        res.status(200).json(response);
    } else {
        res.status(500).json("UserName or Password is incorrect!!!!");
    }
}