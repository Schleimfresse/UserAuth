import * as config from "../config/auth.config.js"
import * as lib from "../Lib/lib.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const signup = (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: req.body.roles
    };
    lib.database.insert(user, (err, data) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.send({message: "User was registered successfully!"});
    });
    lib.loadDatastore;
};
const signin = (req, res) => {
    console.log("body on signin", req.body)
    lib.database.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            res.status(500).send({message: err});

        }

        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        console.log("Password", passwordIsValid)
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null, message: "Invalid Password!"
            });
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        console.log("trigger");
        res.status(200).send(
            {message: {id: user._id, username: user.username, email: user.email, roles: authorities, accessToken: token}}
        );
    });
};

export {
    signup, signin,
}