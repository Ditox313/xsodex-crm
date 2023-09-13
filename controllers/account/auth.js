const bcrypt = require('bcryptjs');
const User = require('../../models/account/User.js');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const errorHandler = require('../../Utils/errorHendler.js');



// Контроллер для Авторизации
module.exports.login = async function(req, res) {

    const candidate = await User.findOne({
        email: req.body.email
    });


    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
            const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                },
                keys.jwt, { expiresIn: (60 * 60) * 24 }
            );


            const user = await User.findOne({
                _id: candidate._id
            })


            res.status(200).json({
                token: `Bearer ${token}`,
                currentUser: user
            });
        } else {
            res.status(401).json({
                message: "Ошибка. Пароли не совпадают. Попробуйте еще раз!"
            });
        }
    } else {
        res.status(404).json({
            message: "Пользователя с таким E-mail не найдено!"
        });
    }
};





// Контроллер для Регистрации 
module.exports.register = async function(req, res) {

    // Делаем проверку на наличие пользователя в БД
    const canditate = await User.findOne({
        email: req.body.email
    });

    if (canditate) {
        res.status(409).json({
            message: "Такой Email уже существует в системе. Проверьте правильность введенных данных!"
        });
    } else {
        // Шифрование пароля пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            secondName: req.body.secondName,
            lastName: req.body.lastName,
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }

};
