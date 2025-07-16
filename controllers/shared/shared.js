const Partner = require('../../models/partners/Partner.js');
const ClientFiz = require('../../models/clients/clientsFiz/ClientFiz.js');
const ClientLaw = require('../../models/clients/clientsLaw/ClientLaw.js');
const TrustedPersone = require('../../models/clients/clientsLaw/TrustedPersone.js');
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
            const client = await ClientFiz.findOne({ _id: req.body.postId });

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


        // Если удаляем из Юридических клиентов
        if (req.body.typePost === 'clientLaw') {
            const client = await ClientLaw.findOne({ _id: req.body.postId });

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



        // Если удаляем из доверенных лиц
        if (req.body.typePost === 'trustedPersone') {
            const trustedPersone = await TrustedPersone.findOne({ _id: req.body.postId });

            // Находим индекс картинки в массиве files
            const index = trustedPersone.files.findIndex(file => file === req.body.src);

            // Если индекс найден, удаляем картинку из массива files и с диска
            if (index !== -1) {
                trustedPersone.files.splice(index, 1);

                // Удаляем файл с диска
                fs.unlink(req.body.src, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Ошибка при удалении картинки' });
                    }
                });
            }

            // Сохраняем обновленного партнера
            await trustedPersone.save();
            res.status(200).json('Удаление прошло успешно');
        }
        

    } catch (e) {
        errorHandler(res, e);
        return;
    }
};





