import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking, BookingsParamsFetch } from '../../types/bookings.interfaces';
import { bookingsListSelector, isLoadingSelector, noMoreBookingsList } from '../../store/selectors';
import { bookingDeleteAction, bookingsListAction, bookingsListResetAction, noMoreBookingsListFalseAction, noMoreBookingsListTrueAction } from '../../store/actions/bookings.action';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';
import { PrimeNGConfig } from 'primeng/api';

// Интерфейс для клиента
interface ClientOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit, OnDestroy {
  @ViewChild('bookingsListBtns') bookingsListBtns: ElementRef<any> | undefined;

  // Базовые параметры
  STEP = 4;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Брони';

  // Селекторы и подписки
  isLoadingSelector!: Observable<boolean | null>;
  noMoreBookingsList!: Observable<boolean | null>;
  bookingsListSelector!: Observable<Booking[] | null | undefined>;
  bookingsListSub$!: Subscription;
  currentSmemaSelector!: Observable<Smena | null | undefined>;
  currentSmemaSub$!: Subscription;

  // Данные
  bookingsList: Booking[] | null | undefined = [];
  bookingsListSort: Booking[] | null | undefined = [];
  originalBookingsList: Booking[] | null | undefined = []; // Оригинальный список для фильтрации
  currentSmema!: Smena | null | undefined;

  // Параметры фильтрации
  dateRange: Date[] = [];
  selectedCar: any = null;
  clientSearch: ClientOption | null = null;
  filteredClients: ClientOption[] = [];
  carOptions: any[] = [];

  constructor(
    private store: Store,
    private el: ElementRef,
    private renderer: Renderer2,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.initValues();
    this.getBookingsList();
    this.primeNgConfig();
  }

  ngOnDestroy(): void {
    if (this.bookingsListSub$) {
      this.bookingsListSub$.unsubscribe();
    }
    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe();
    }
    this.store.dispatch(bookingsListResetAction());
  }

  initValues() {
    // Очищаем состояние
    this.store.dispatch(bookingsListResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector));

    // Получаем селектор noMoreBookingsList
    this.noMoreBookingsList = this.store.pipe(select(noMoreBookingsList));

    // Подписываемся на список броней
    this.bookingsListSelector = this.store.pipe(select(bookingsListSelector));
    this.bookingsListSub$ = this.bookingsListSelector.subscribe({
      next: (bookingsList) => {
        if (bookingsList) {
          this.bookingsList = bookingsList;
          this.bookingsListSort = bookingsList;
          this.originalBookingsList = bookingsList; // Сохраняем оригинальный список

          if (this.bookingsList.length >= this.STEP) {
            this.store.dispatch(noMoreBookingsListFalseAction());
          } else {
            this.store.dispatch(noMoreBookingsListTrueAction());
          }

          this.initializeFilters(); // Инициализируем фильтры
          this.applyFilters(); // Применяем фильтры после загрузки данных
        }
      }
    });

    // Получаем текущую смену
    this.currentSmemaSelector = this.store.pipe(select(isOpenedSmenaSelector));
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena;
      }
    });
  }

  // Инициализация фильтров
  initializeFilters(): void {
    if (this.bookingsList) {
      // Инициализируем список автомобилей
      const uniqueCars = new Set(
        this.bookingsList.map(booking => 
          `${booking.car.marka} ${booking.car.model} (${booking.car.number})`
        )
      );
      this.carOptions = Array.from(uniqueCars).map(car => ({
        label: car,
        value: car
      }));
    }
  }

  // Применение всех фильтров
  applyFilters(): void {
    let filteredList = this.originalBookingsList;

    // Фильтрация по дате
    if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
      const startDate = new Date(this.dateRange[0]);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(this.dateRange[1]);
      endDate.setHours(23, 59, 59, 999);

      filteredList = filteredList?.filter(booking => {
        const bookingStartDate = new Date(booking.booking_start);
        bookingStartDate.setHours(0, 0, 0, 0);
        return bookingStartDate >= startDate && bookingStartDate <= endDate;
      });
    }

    // Фильтрация по автомобилю
    if (this.selectedCar) {
      filteredList = filteredList?.filter(booking =>
        `${booking.car.marka} ${booking.car.model} (${booking.car.number})` === this.selectedCar.value
      );
    }

    // Фильтрация по клиенту
    if (this.clientSearch) {
      filteredList = filteredList?.filter(booking =>
        booking.client._id === this.clientSearch?.value
      );
    }

    // Сохраняем отфильтрованный список
    this.bookingsList = filteredList;
  }

  // Фильтрация по дате
  onDateFilter(): void {
    this.applyFilters();
  }

  // Фильтрация по автомобилю
  onCarFilter(): void {
    this.applyFilters();
  }

  // Фильтрация по клиенту
  onClientFilter(): void {
    this.applyFilters();
  }

  // Сброс фильтров
  resetFilters(): void {
    this.dateRange = [];
    this.selectedCar = null;
    this.clientSearch = null;
    this.applyFilters();
  }

  // Сортировка броней
  sortBookings(e: any, type: string) {
    const sortElements = this.bookingsListBtns?.nativeElement.querySelectorAll('.sort');

    sortElements.forEach((element: HTMLElement) => {
      this.renderer.removeClass(element, 'active_sort');
    });

    this.renderer.addClass(e.target.closest('.sort'), 'active_sort');

    if (type === 'sort_wait') {
      this.bookingsList = this.bookingsListSort?.filter(booking => booking.status === 'В ожидании');
    } else if (type === 'sort_all') {
      this.bookingsList = this.bookingsListSort;
    } else if (type === 'sort_arenda') {
      this.bookingsList = this.bookingsListSort?.filter(booking => booking.status === 'В аренде');
    } else if (type === 'sort_close') {
      this.bookingsList = this.bookingsListSort?.filter(booking => booking.status === 'Закрыта');
    }
  }

  // Получение списка броней
  getBookingsList() {
    const params: BookingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };
    this.store.dispatch(bookingsListAction({ params: params }));
  }

  // Загрузка дополнительных броней
  loadmore() {
    this.offset += this.STEP;
    this.getBookingsList();
  }

  // Удаление брони
  onDeleteBooking(event: Event, booking: Booking) {
    event.stopPropagation();
    const decision = window.confirm(`Удалить Бронь?`);

    if (decision) {
      this.store.dispatch(bookingDeleteAction({ id: booking._id }));
    }
  }

  // Настройка календаря
  primeNgConfig() {
    this.primengConfig.setTranslation({
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
      ],
      monthNamesShort: [
        "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
        "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
      ],
      today: 'Сегодня',
      clear: 'Очистить',
    });
  }

  // Метод для фильтрации клиентов
  filterClients(event: any): void {
    if (!this.originalBookingsList) return;

    const query = event.query.toLowerCase();
    const uniqueClients = new Map();

    this.originalBookingsList.forEach(booking => {
      const clientName = booking.client.surname ? 
        `${booking.client.surname} ${booking.client.name} ${booking.client.lastname || ''}` :
        `${booking.client.short_name} ${booking.client.name}`;

      if (!uniqueClients.has(booking.client._id)) {
        uniqueClients.set(booking.client._id, {
          label: clientName,
          value: booking.client._id
        });
      }
    });

    this.filteredClients = Array.from(uniqueClients.values())
      .filter(client => client.label.toLowerCase().includes(query));
  }
}