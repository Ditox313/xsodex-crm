import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../../store/selectors';
import { Store, select } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking, BookingData } from '../../types/bookings.interfaces';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {
  title: string = 'Добавить бронь'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  
  booking: BookingData = {
    booking_start: '',
    booking_end: '',
    booking_days: 0,
    dop_hours: 0,
  }

  

  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      booking_start: new FormControl('', [Validators.required]),
      booking_end: new FormControl('', [Validators.required]),
      // car: new FormControl('', [Validators.required]),
      // client: new FormControl('', [Validators.required]),
      // place_start: new FormControl('Офис', [Validators.required]),
      // place_end: new FormControl('Офис', [Validators.required]),
      // tariff: new FormControl('', [Validators.required]),
      // comment: new FormControl(''),
      // isCustomeZalogControl: new FormControl(''),
      // isCustomePlaceStartControl: new FormControl(''),
      // isCustomePlaceStartControlPrice: new FormControl(''),
      // isCustomePlaceInputControl: new FormControl(''),
      // isCustomePlaceInputControlPrice: new FormControl(''),
      // search_fiz: new FormControl(''),
      // search_law: new FormControl(''),
      // additional_services_chair: new FormControl(''),
      // additional_services_buster: new FormControl(''),
      // additional_services_videoregister: new FormControl(''),
      // additional_services_battery_charger: new FormControl(''),
      // additional_services_antiradar: new FormControl(''),
      // additional_services_moyka: new FormControl(''),
      // isCustomePlaceStartControlclick: new FormControl(''),
      // isCustomePlaceInputControlclick: new FormControl(''),
      // isCustomeZalogControlclick: new FormControl(''),
      // tarif_mixed_gorod: new FormControl(''),
      // tarif_mixed_gorod_days: new FormControl(''),
      // tarif_mixed_mezjgorod: new FormControl(''),
      // tarif_mixed_mezjgorod_days: new FormControl(''),
      // tarif_mixed_russia: new FormControl(''),
      // tarif_mixed_russia_days: new FormControl(''),
    });
  }

  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  // При выборе даты старта брони
  checkedStartBookingDate(e: any) {
    // Получаем и устанавливаем  начало  аренды
    this.booking.booking_start = e.target.value
    


    // Если у нас выбрана дата старта и дата окончания
    if (this.booking.booking_start !== '' && this.booking.booking_end !== '')
    {
      this.isBookingdays()   
    }
     
  }


  // При выборе даты окончания брони
  checkedEndBookingDate(e: any) {
    // Получаем и устанавливаем  окончание  аренды
    this.booking.booking_end = e.target.value


    // Если у нас выбрана дата старта и дата окончания
    if (this.booking.booking_start !== '' && this.booking.booking_end !== '') {
      this.isBookingdays()
    }
  }

  isBookingdays()
  {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    this.booking.booking_days = Math.round((booking_end - booking_start) / (1000 * 60 * 60 * 24));

    this.isDopHour()
    console.log(this.booking);
    return this.booking.booking_days
  }



  isDopHour()
  {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    // Считаем дополнительные часы
    const booking_days = (booking_end - booking_start) / (1000 * 60 * 60 * 24);


    // Если есть доп часы(booking_days не целое)
    if (!Number.isInteger(booking_days)) {
      this.booking.dop_hours = Math.floor(((booking_end - booking_start) / (1000 * 60 * 60)) % 24);
      return this.booking.dop_hours
    }
    else {
      this.booking.dop_hours = 0
      return 0
    } 
  }





















  onSubmit() {
  }
}
