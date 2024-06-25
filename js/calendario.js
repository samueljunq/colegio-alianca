const isLeapYear = (year) => {
  // Função para verificar se o ano é bissexto
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  // Função para obter os dias de fevereiro, considerando ano bissexto
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
  // Exibir lista de meses ao clicar no seletor de mês
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  // Função para gerar o calendário com base no mês e ano fornecidos
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
    31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  
  let currentDate = new Date();
  
  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;
  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement('div');

      if (i >= first_day.getDay()) {
          day.innerHTML = i - first_day.getDay() + 1;

          if (i - first_day.getDay() + 1 === currentDate.getDate() &&
              year === currentDate.getFullYear() &&
              month === currentDate.getMonth()
          ) {
              day.classList.add('current-date');
          }
      }
      calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
  };
});

(function () {
  month_list.classList.add('hideonce');
})();

document.querySelector('#pre-year').onclick = () => {
  // Ir para o ano anterior
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector('#next-year').onclick = () => {
  // Ir para o próximo ano
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};

const currentDateFormate = new Intl.DateTimeFormat(
  'pt-BR',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;

setInterval(() => {
  const timer = new Date();
  const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('pt-BR', option).format(timer);
  todayShowTime.textContent = formateTimer;
}, 1000);
//datas comemorativas
const specialDatesContainer = document.querySelector('.special-dates');

// Função para adicionar uma data especial à caixa
const addSpecialDate = (date, name) => {
  const specialDateElement = document.createElement('div');
  specialDateElement.classList.add('special-date');
  specialDateElement.textContent = `${date} - ${name}`;
  specialDatesContainer.appendChild(specialDateElement);
};

// Adicionar feriados e datas especiais à caixa
holidays.forEach(holiday => {
  const { day, month, year } = holiday;
  addSpecialDate(`${day}/${month}/${year}`, 'Feriado');
});

// rolagem da página
document.addEventListener("DOMContentLoaded", function() {
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const nav = document.querySelector("nav");

  menuIcon.addEventListener("click", function() {
      nav.classList.add("show");
  });

  closeIcon.addEventListener("click", function() {
      nav.classList.remove("show");
  });
});

