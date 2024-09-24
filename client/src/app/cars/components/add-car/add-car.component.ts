import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../types/cars.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addCarAction } from '../../store/actions/cars.action';
import { Observable, Subscription } from 'rxjs';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { isLoadingSelector } from '../../store/selectors';
import { Partner } from 'src/app/partners/types/partners.interfaces';
import { partnersListSelector } from 'src/app/partners/store/selectors';
import { partnersListAction, partnersListNoParamsAction, partnersListNoParamsResetAction } from 'src/app/partners/store/actions/partners.action';
import { clientsFizListAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { SettingSklad, SettingsParamsFetch } from 'src/app/settings/types/settings.interfaces';
import { settingsSkladListAction, settingsSkladListResetAction } from 'src/app/settings/store/actions/settings.action';
import { settingsSkladListSelector } from 'src/app/settings/store/selectors';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Добавить автомобиль'
  form!: FormGroup;
  uploadFile!: File
  avatar: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  @ViewChild('upload') upload!: ElementRef;
  value!: string;
  isLoadingSelector$!: Observable<boolean | null>
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined
  currentUserSub$!: Subscription

  partnersListSelector!: Observable<Partner[] | null | undefined>
  partnersListSub$!: Subscription
  partnersList: Partner[] | null | undefined = [];


  settingsSkladListSelector!: Observable<SettingSklad[] | null | undefined>
  settingsSkladListSub$!: Subscription
  settingsSkladList: SettingSklad[] | null | undefined = [];


  constructor(public datePipe: DatePipe, private store: Store,) { }

  ngOnInit(): void {
    this.initForm()
    this.initValues()
    this.getSettingsSkladList()
  }

  
  ngOnDestroy(): void {
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe()
    }
    if (this.partnersListSub$) {
      this.partnersListSub$.unsubscribe()
    }

    if (this.settingsSkladListSub$) {
      this.settingsSkladListSub$.unsubscribe()
    }

    // Отчищаем состояние currentpartnersListNoParams
    this.store.dispatch(partnersListNoParamsResetAction());

    // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsSkladListResetAction());
  }

  initForm() {
    this.form = new FormGroup({
      marka: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      probeg: new FormControl('', [Validators.required]),
      transmission: new FormControl('',),
      start_arenda: new FormControl('', [Validators.required]),
      end_arenda: new FormControl('', [Validators.required]),
      vladelec: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      sts_seria: new FormControl('', [Validators.required]),
      sts_number: new FormControl('', [Validators.required]),
      sts_date: new FormControl('', [Validators.required]),
      osago_seria: new FormControl('', [Validators.required]),
      osago_number: new FormControl('', [Validators.required]),
      osago_date_finish: new FormControl('', [Validators.required]),
      vin: new FormControl('', [Validators.required]),
      kuzov_number: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      year_production: new FormControl('', [Validators.required]),
      price_ocenka: new FormControl('', [Validators.required]),
      to_date: new FormControl('', [Validators.required]),
      to_probeg_prev: new FormControl('', [Validators.required]),
      to_probeg_next: new FormControl('', [Validators.required]),
      to_interval: new FormControl('', [Validators.required]),
      oil_name: new FormControl('', [Validators.required]),
      stoa_name: new FormControl('', [Validators.required]),
      stoa_phone: new FormControl('', [Validators.required]),

      gorod_name_1: new FormControl('',),
      gorod_value_1: new FormControl('',),
      gorod_name_2: new FormControl('',),
      gorod_value_2: new FormControl('',),
      gorod_name_3: new FormControl('',),
      gorod_value_3: new FormControl('',),
      gorod_name_4: new FormControl('',),
      gorod_value_4: new FormControl('',),
      gorod_name_5: new FormControl('',),
      gorod_value_5: new FormControl('',),
      gorod_name_6: new FormControl('',),
      gorod_value_6: new FormControl('',),
      gorod_name_7: new FormControl('',),
      gorod_value_7: new FormControl('',),
      gorod_name_8: new FormControl('',),
      gorod_value_8: new FormControl('',),
      gorod_name_9: new FormControl('',),
      gorod_value_9: new FormControl('',),
      gorod_name_10: new FormControl('',),
      gorod_value_10: new FormControl('',),
      gorod_value_zalog: new FormControl('',),
      gorod_value_dop_hour: new FormControl('',),

      mejgorod_name_1: new FormControl('',),
      mejgorod_value_1: new FormControl('',),
      mejgorod_name_2: new FormControl('',),
      mejgorod_value_2: new FormControl('',),
      mejgorod_name_3: new FormControl('',),
      mejgorod_value_3: new FormControl('',),
      mejgorod_name_4: new FormControl('',),
      mejgorod_value_4: new FormControl('',),
      mejgorod_name_5: new FormControl('',),
      mejgorod_value_5: new FormControl('',),
      mejgorod_name_6: new FormControl('',),
      mejgorod_value_6: new FormControl('',),
      mejgorod_name_7: new FormControl('',),
      mejgorod_value_7: new FormControl('',),
      mejgorod_name_8: new FormControl('',),
      mejgorod_value_8: new FormControl('',),
      mejgorod_name_9: new FormControl('',),
      mejgorod_value_9: new FormControl('',),
      mejgorod_name_10: new FormControl('',),
      mejgorod_value_10: new FormControl('',),
      mejgorod_value_zalog: new FormControl('',),
      mejgorod_value_dop_hour: new FormControl('',),

      russia_name_1: new FormControl('',),
      russia_value_1: new FormControl('',),
      russia_name_2: new FormControl('',),
      russia_value_2: new FormControl('',),
      russia_name_3: new FormControl('',),
      russia_value_3: new FormControl('',),
      russia_name_4: new FormControl('',),
      russia_value_4: new FormControl('',),
      russia_name_5: new FormControl('',),
      russia_value_5: new FormControl('',),
      russia_name_6: new FormControl('',),
      russia_value_6: new FormControl('',),
      russia_name_7: new FormControl('',),
      russia_value_7: new FormControl('',),
      russia_name_8: new FormControl('',),
      russia_value_8: new FormControl('',),
      russia_name_9: new FormControl('',),
      russia_value_9: new FormControl('',),
      russia_name_10: new FormControl('',),
      russia_value_10: new FormControl('',),
      russia_value_zalog: new FormControl('',),
      russia_value_dop_hour: new FormControl('',),


      sklad_name_1: new FormControl('',),
      sklad_name_1_check: new FormControl('',),
      sklad_name_2: new FormControl('',),
      sklad_name_2_check: new FormControl('',),
      sklad_name_3: new FormControl('',),
      sklad_name_3_check: new FormControl('',),
      sklad_name_4: new FormControl('',),
      sklad_name_4_check: new FormControl('',),
      sklad_name_5: new FormControl('',),
      sklad_name_5_check: new FormControl('',),
      sklad_name_6: new FormControl('',),
      sklad_name_6_check: new FormControl('',),
      sklad_name_7: new FormControl('',),
      sklad_name_7_check: new FormControl('',),
      sklad_name_8: new FormControl('',),
      sklad_name_8_check: new FormControl('',),
      sklad_name_9: new FormControl('',),
      sklad_name_9_check: new FormControl('',),
      sklad_name_10: new FormControl('',),
      sklad_name_10_check: new FormControl('',),
      sklad_name_11: new FormControl('',),
      sklad_name_11_check: new FormControl('',),
      sklad_name_12: new FormControl('',),
      sklad_name_12_check: new FormControl('',),
      sklad_name_13: new FormControl('',),
      sklad_name_13_check: new FormControl('',),
      sklad_name_14: new FormControl('',),
      sklad_name_14_check: new FormControl('',),
      sklad_name_15: new FormControl('',),
      sklad_name_15_check: new FormControl('',),


    });
  }



  initValues() {
    // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsSkladListResetAction());

    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector$.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))



    // Отправляем запрос на получения списка физлиц без параметров
    this.store.dispatch(partnersListNoParamsAction());
    
    // Получаем селектор на получение списка партнеров и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.partnersListSelector = this.store.pipe(select(partnersListSelector))
    this.partnersListSub$ = this.partnersListSelector.subscribe({
      next: (partnersList) => {
        if (partnersList) {
          this.partnersList = partnersList;
        }
      }
    });



      // Получаем селектор на получение списка settingsSkladList и подписываемся на него.
      this.settingsSkladListSelector = this.store.pipe(select(settingsSkladListSelector))
      this.settingsSkladListSub$ = this.settingsSkladListSelector.subscribe({
        next: (settingsSkladList) => {
          if (settingsSkladList) {
            this.settingsSkladList = settingsSkladList;

            console.log('222', this.settingsSkladList);
            
  
          }
        }
      });
  }


  // Получаем настройки склада
  getSettingsSkladList() {
    const params: SettingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

     // Отправляем запрос на получения списка настроек склада
     this.store.dispatch(settingsSkladListAction({ params: params }));
  }





  // Обрабатываем загрузку картинок
  onFileUploadAvatar(event: any) {
    const file = event.target.files['0'];
    this.uploadFile = file;
    // Подключаем ридер для считывания картинки
    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.avatar = reader.result;
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClickForUploadAvatar() {
    this.upload.nativeElement.click();
  }


  // Подгатавливаем массив с комплектацией для сохранения.исключаем пустые элементы и не отмеченные чекбоксом
  prepareKomplektArray() {
    const komplekt = [
      [this.settingsSkladList?.[0]?.sklad_name_1, this.form.value.sklad_name_1, this.form.value.sklad_name_1_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_2, this.form.value.sklad_name_2, this.form.value.sklad_name_2_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_3, this.form.value.sklad_name_3, this.form.value.sklad_name_3_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_4, this.form.value.sklad_name_4, this.form.value.sklad_name_4_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_5, this.form.value.sklad_name_5, this.form.value.sklad_name_5_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_6, this.form.value.sklad_name_6, this.form.value.sklad_name_6_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_7, this.form.value.sklad_name_7, this.form.value.sklad_name_7_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_8, this.form.value.sklad_name_8, this.form.value.sklad_name_8_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_9, this.form.value.sklad_name_9, this.form.value.sklad_name_9_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_10, this.form.value.sklad_name_10, this.form.value.sklad_name_10_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_11, this.form.value.sklad_name_11, this.form.value.sklad_name_11_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_12, this.form.value.sklad_name_12, this.form.value.sklad_name_12_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_13, this.form.value.sklad_name_13, this.form.value.sklad_name_13_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_14, this.form.value.sklad_name_14, this.form.value.sklad_name_14_check[0] || false],
      [this.settingsSkladList?.[0]?.sklad_name_15, this.form.value.sklad_name_15, this.form.value.sklad_name_15_check[0] || false],
    ];
  
    const filteredKomplekt = komplekt.filter(subArray => 
      subArray.every(element => element !== '' && element !== false)
    );
  
    return filteredKomplekt;
  }



  onSubmit() {

    // const test = this.form
    const komplekt = this.prepareKomplektArray()


    const car: Car = {
      marka: this.form.value.marka,
      model: this.form.value.model,
      number: this.form.value.number,
      probeg: this.form.value.probeg,
      transmission: this.form.value.transmission,
      start_arenda: this.form.value.start_arenda,
      end_arenda: this.form.value.end_arenda,
      vladelec: this.form.value.vladelec,
      category: this.form.value.category,
      status: this.form.value.status,
      sts_seria: this.form.value.sts_seria,
      sts_number: this.form.value.sts_number,
      sts_date: this.form.value.sts_date,
      osago_seria: this.form.value.osago_seria,
      osago_number: this.form.value.osago_number,
      osago_date_finish: this.form.value.osago_date_finish,
      vin: this.form.value.vin,
      kuzov_number: this.form.value.kuzov_number,
      color: this.form.value.color,
      year_production: this.form.value.year_production,
      price_ocenka: this.form.value.price_ocenka,
      to_date: this.form.value.to_date,
      to_probeg_prev: this.form.value.to_probeg_prev,
      to_probeg_next: this.form.value.to_probeg_next,
      to_interval: this.form.value.to_interval,
      oil_name: this.form.value.oil_name,
      stoa_name: this.form.value.stoa_name,
      stoa_phone: this.form.value.stoa_phone,
      userId: this.currentUser?._id,
      tarif_gorod: [
        [this.form.value.gorod_name_1, this.form.value.gorod_value_1],
        [this.form.value.gorod_name_2, this.form.value.gorod_value_2],
        [this.form.value.gorod_name_3, this.form.value.gorod_value_3],
        [this.form.value.gorod_name_4, this.form.value.gorod_value_4],
        [this.form.value.gorod_name_5, this.form.value.gorod_value_5],
        [this.form.value.gorod_name_6, this.form.value.gorod_value_6],
        [this.form.value.gorod_name_7, this.form.value.gorod_value_7],
        [this.form.value.gorod_name_8, this.form.value.gorod_value_8],
        [this.form.value.gorod_name_9, this.form.value.gorod_value_9],
        [this.form.value.gorod_name_10, this.form.value.gorod_value_10],
        ['zalog', this.form.value.gorod_value_zalog],
        ['dop_hour', this.form.value.gorod_value_dop_hour],
      ],
      tarif_mejgorod: [
        [this.form.value.mejgorod_name_1, this.form.value.mejgorod_value_1],
        [this.form.value.mejgorod_name_2, this.form.value.mejgorod_value_2],
        [this.form.value.mejgorod_name_3, this.form.value.mejgorod_value_3],
        [this.form.value.mejgorod_name_4, this.form.value.mejgorod_value_4],
        [this.form.value.mejgorod_name_5, this.form.value.mejgorod_value_5],
        [this.form.value.mejgorod_name_6, this.form.value.mejgorod_value_6],
        [this.form.value.mejgorod_name_7, this.form.value.mejgorod_value_7],
        [this.form.value.mejgorod_name_8, this.form.value.mejgorod_value_8],
        [this.form.value.mejgorod_name_9, this.form.value.mejgorod_value_9],
        [this.form.value.mejgorod_name_10, this.form.value.mejgorod_value_10],
        ['zalog', this.form.value.mejgorod_value_zalog],
        ['dop_hour', this.form.value.mejgorod_value_dop_hour],
      ],
      tarif_russia: [
        [this.form.value.russia_name_1, this.form.value.russia_value_1],
        [this.form.value.russia_name_2, this.form.value.russia_value_2],
        [this.form.value.russia_name_3, this.form.value.russia_value_3],
        [this.form.value.russia_name_4, this.form.value.russia_value_4],
        [this.form.value.russia_name_5, this.form.value.russia_value_5],
        [this.form.value.russia_name_6, this.form.value.russia_value_6],
        [this.form.value.russia_name_7, this.form.value.russia_value_7],
        [this.form.value.russia_name_8, this.form.value.russia_value_8],
        [this.form.value.russia_name_9, this.form.value.russia_value_9],
        [this.form.value.russia_name_10, this.form.value.russia_value_10],
        ['zalog', this.form.value.russia_value_zalog],
        ['dop_hour', this.form.value.russia_value_dop_hour],
      ],
      komplekt
    }
    
    
    this.store.dispatch(addCarAction({ car: car, avatar: this.uploadFile }))
  }
}
