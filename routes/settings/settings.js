const express = require('express');
const router = express.Router();
const controller = require('../../controllers/settings/settings.js');
const passport = require('passport');
const upload = require('../../middleware/upload-partner-docs.js');



// Роут на create setting avtopark
router.post('/create_setting_avtopark', passport.authenticate('jwt', { session: false }), controller.create_setting_avtopark);


// Роут на create setting sklad
router.post('/create_setting_sklad', passport.authenticate('jwt', { session: false }), controller.create_setting_sklad);


// Роут на Получение всех настроект автопарка
router.get('/settings-avtopark-list', passport.authenticate('jwt', { session: false }), controller.getAllSettingsAvtopark);


// Роут на Получение всех настроект склада
router.get('/settings-sklad-list', passport.authenticate('jwt', { session: false }), controller.getAllSettingsSklad);


// Роут на Получение всех партнеров без параметров
// router.get('/partners-list-no-params', passport.authenticate('jwt', { session: false }), controller.getAllPartnersNoParams);


//Роут на удаление настройки автопарка
router.delete('/setting-avtopark-remove/:id', passport.authenticate('jwt', { session: false }), controller.removeSettingAvtopark);


//Роут на удаление настройки склада
router.delete('/setting-sklad-remove/:id', passport.authenticate('jwt', { session: false }), controller.removeSettingSklad);


// Роут на получение настройки автопарка по Id
router.get('/get-settings-avtopark/:id', passport.authenticate('jwt', { session: false }), controller.getByIdSettingsAvtopark);


// Роут на получение настройки склада по Id
router.get('/get-settings-sklad/:id', passport.authenticate('jwt', { session: false }), controller.getByIdSettingsSklad);


// Роут на обновление настроек автопарка
router.patch('/update-settings-avtopark/:id', passport.authenticate('jwt', { session: false }), upload.fields([{ name: 'file_1' }, { name: 'file_2' }]), controller.updateSettingsAvtopark);


// Роут на обновление настроек склада
router.patch('/update-settings-sklad/:id', passport.authenticate('jwt', { session: false }), controller.updateSettingsSklad);




module.exports = router;