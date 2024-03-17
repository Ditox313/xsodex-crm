const Partner = require('../../models/partners/Partner.js');
const Client = require('../../models/clients/clientsFiz/ClientFiz.js');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');






// Контроллер для remove
module.exports.delete_file = async function (req, res) {
    try {
        // Если удаляем из Партнеров
        if (req.body.typePost === 'partner') {
            const partner = await Partner.findOne({ _id: req.body.postId });

            // Находим индекс картинки в массиве files
            const index = partner.files.findIndex(file => file === req.body.src);

            // Если индекс найден, удаляем картинку из массива files и с диска
            if (index !== -1) {
                partner.files.splice(index, 1);

                // Удаляем файл с диска
                fs.unlink(req.body.src, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                    }
                });
            }

            // Сохраняем обновленного партнера
            await partner.save();
            res.status(200).json('Удаление прошло успешно');
        }


        // Если удаляем из Физических клиентов
        if (req.body.typePost === 'clientFiz') {
            const client = await Client.findOne({ _id: req.body.postId });

            // Находим индекс картинки в массиве files
            const index = client.files.findIndex(file => file === req.body.src);

            // Если индекс найден, удаляем картинку из массива files и с диска
            if (index !== -1) {
                client.files.splice(index, 1);

                // Удаляем файл с диска
                fs.unlink(req.body.src, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                    }
                });
            }

            // Сохраняем обновленного партнера
            await client.save();
            res.status(200).json('Удаление прошло успешно');
        }
        

    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





