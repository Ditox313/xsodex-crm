const bcrypt = require('bcryptjs');
const User = require('../../models/account/User.js');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');



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






// Контроллер для update
module.exports.updateUser = async function (req, res) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const updated = req.body;
      const actualUser = await User.findOne({ _id: req.user._id });
  
      if (req.body.password === null || req.body.password === '') {
        updated.password = actualUser.password;
      } else {
        updated.password = bcrypt.hashSync(req.body.password, salt);
      }
  
      if (req.file && actualUser) {
        fs.unlink(actualUser.avatar, (err) => {
          if (err) {
            console.error('Ошибка при удалении картинки:', err);
            // Здесь можно отправить ответ с ошибкой, если это необходимо
            // return res.status(500).json({ error: 'Ошибка при удалении картинки' });
          }
        });
        updated.avatar = req.file.path;
      }
  
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updated },
        { new: true }
      );
  
      res.status(200).json(updateUser);
    } catch (e) {
      errorHandler(res, e);
      // Убедитесь, что функция errorHandler отправляет ответ и завершает выполнение
      return;
    }
  };





