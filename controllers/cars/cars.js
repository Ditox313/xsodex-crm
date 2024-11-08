const Car = require('../../models/cars/Car');
const errorHandler = require('../../Utils/errorHendler.js');
const fs = require('fs');
const path = require('path');




// Контроллер для create
module.exports.create = async function (req, res) {
    try {
        const car = await new Car({
            marka: req.body.marka,
            model: req.body.model,
            number: req.body.number,
            probeg: req.body.probeg,
            transmission: req.body.transmission,
            start_arenda: req.body.start_arenda,
            end_arenda: req.body.end_arenda,
            vladelec: req.body.vladelec,
            category: req.body.category,
            status: req.body.status,
            sts_seria: req.body.sts_seria,
            sts_number: req.body.sts_number,
            sts_date: req.body.sts_date,
            osago_seria: req.body.osago_seria,
            osago_number: req.body.osago_number,
            osago_date_finish: req.body.osago_date_finish,
            vin: req.body.vin,
            kuzov_number: req.body.kuzov_number,
            color: req.body.color,
            year_production: req.body.year_production,
            price_ocenka: req.body.price_ocenka,
            to_date: req.body.to_date,
            to_probeg_prev: req.body.to_probeg_prev,
            to_probeg_next: req.body.to_probeg_next,
            to_interval: req.body.to_interval,
            oil_name: req.body.oil_name,
            stoa_name: req.body.stoa_name,
            stoa_phone: req.body.stoa_phone,
            stoa_phone: req.body.stoa_phone,
            custome_wash: req.body.custome_wash,
            tarif_gorod: JSON.parse(req.body.tarif_gorod),
            tarif_mejgorod: JSON.parse(req.body.tarif_mejgorod),
            tarif_russia: JSON.parse(req.body.tarif_russia),
            komplekt: JSON.parse(req.body.komplekt),
            user: req.user._id,
            // avatar: '', 
            avatar: req.file ? req.file.path : '', //Если файл загружен то задаем путь до файла
        })

        // if (req.file) {
        //     const imageBuffer = fs.readFileSync(req.file.path);
        //     const base64Image = imageBuffer.toString('base64');
        //     car.avatar = `data:${req.file.mimetype};base64,${base64Image}`;
        // }
      
        await car.save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(car);
    } catch (e) {
        errorHandler(res, e);
    }
};







module.exports.getAllCars = async function (req, res) {
    try {

        const carsList = await Car.find({}).sort({ date: -1 })
            .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
            .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        // Возвращаем пользователю позиции 
        res.status(200).json(carsList);
    } catch (e) {
        errorHandler(res, e);
    }
};





// Контроллер для remove
module.exports.remove = async function (req, res) {
    try {

        // Находим нужный автомобиль и удаляем аватарку автомобиля
        const car = await Car.findOne({ _id: req.params.id });
        fs.unlink(car.avatar, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });


        // Удаляем автомобиль
        const result = await Car.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).json(req.params.id);
        } else {
            return error
        }


    } catch (e) {
        errorHandler(res, e);
    }
};










// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const car = await Car.findById(req.params.id); //Ищем категорию по id из переданных параметров

        // Проверяем, что car.avatar является путем к файлу
        if (!car.avatar.startsWith('http')) {
            const filePath = path.join(__dirname, '../../', car.avatar);

            // Читаем файл
            const fileBuffer = fs.readFileSync(filePath);

            // Конвертируем файл в base64
            const base64Image = fileBuffer.toString('base64');
            const fileExtension = path.extname(filePath).slice(1);
            car.avatar = `data:image/${fileExtension};base64,${base64Image}`;
        }


        res.status(200).json(car);
    } catch (e) {
        errorHandler(res, e);
    }
};







// Контроллер для update
module.exports.update = async function (req, res) {
    try {
      const updated = req.body;
      updated.tarif_gorod = JSON.parse(req.body.tarif_gorod);
      updated.tarif_mejgorod = JSON.parse(req.body.tarif_mejgorod);
      updated.tarif_russia = JSON.parse(req.body.tarif_russia);
      updated.komplekt = JSON.parse(req.body.komplekt);

  
      // Если объект file есть,то заполняем параметр путем фала
      if (req.file) {
        // Находим нужный автомобиль и удаляем аватарку автомобиля
        const car = await Car.findOne({ _id: req.body._id });
        fs.unlink(car.avatar, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Ошибка при удалении картинки' });
            }
        });

        updated.avatar = req.file.path;
    }

  
      // Находим и обновляем позицию
      const carUpdate = await Car.findOneAndUpdate(
        { _id: updated._id },
        { $set: updated },
        { new: true }
      );
  
      // Возвращаем пользователю обновленную позицию
      res.status(200).json(carUpdate);
    } catch (e) {
      errorHandler(res, e);
    }
  };


