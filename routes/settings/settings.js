const express = require('express');
const router = express.Router();
const controller = require('../../controllers/settings/settings.js');
const passport = require('passport');
const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create
router.post('/create_setting_avtopark', passport.authenticate('jwt', { session: false }), controller.create_setting_avtopark);


// Роут на Получение всех настроект автопарка
router.get('/settings-avtopark-list', passport.authenticate('jwt', { session: false }), controller.getAllSettingsAvtopark);


// Роут на Получение всех партнеров без параметров
// router.get('/partners-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllPartnersNoParams);


//Роут на удаление настройки автопарка
router.delete('/setting-avtopark-remove/:id', passport.authenticate('jwt', { session: false }), controller.removeSettingAvtopark);


// Роут на получение настройки автопарка по Id
router.get('/get-settings-avtopark/:id', passport.authenticate('jwt', { session: false }), controller.getByIdSettingsAvtopark);


// Роут на обновление настроек автопарка
router.patch('/update-settings-avtopark/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.updateSettingsAvtopark);





module.exports = router;