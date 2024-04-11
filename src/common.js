// common.js
export const initialItems = [
  {
    id: 1,
    name: "Латте",
    price: "150",
    category: "Кофе",
    image: "",
    ingredients: [
      { name: "Молоко", amount: 150, unit: "мл" },
      { name: "Кофе эспрессо", amount: 30, unit: "мл" },
    ],
  },
  {
    id: 2,
    name: "Тирамису",
    price: "200",
    category: "Десерты",
    image: "",
    ingredients: [
      { name: "Сыр маскарпоне", amount: 100, unit: "гр" },
      { name: "Печенье савоярди", amount: 50, unit: "гр" },
    ],
  },
  {
    id: 3,
    name: "Круассан",
    price: "100",
    category: "Выпечка",
    image: "",
    ingredients: [
      { name: "Мука", amount: 200, unit: "гр" },
      { name: "Масло сливочное", amount: 100, unit: "гр" },
    ],
  },
  {
    id: 4,
    name: "Мохито",
    price: "150",
    category: "Коктейли",
    image: "",
    ingredients: [
      { name: "Лимон", amount: 1, unit: "шт" },
      { name: "Мята", amount: 10, unit: "гр" },
      { name: "Содовая", amount: 100, unit: "мл" },
    ],
  },
  {
    id: 5,
    name: "Чай зеленый",
    price: "50",
    category: "Чай",
    image: "",
    ingredients: [
      { name: "Зеленый чай", amount: 5, unit: "гр" },
      { name: "Вода", amount: 250, unit: "мл" },
    ],
  },
];

export const initialCategories = [
  { id: 1, name: "Кофе", image: "" },
  { id: 2, name: "Десерты", image: "" },
  { id: 3, name: "Выпечка", image: "" },
  { id: 4, name: "Коктейли", image: "" },
  { id: 5, name: "Чай", image: "" },
];

// Branches

export const initialBranches = [
  {
    id: 1,
    name: "Neocafe Боконбаева",
    address: "Жоомарта Боконбаева, 132",
    phone: "0550123456",
    link: "https://go.2gis.com/gko9u",
    image: "",
    workingHours: {
      Понедельник: { enabled: true, from: "08:00", to: "22:00" },
      Вторник: { enabled: true, from: "08:00", to: "22:00" },
      Среда: { enabled: true, from: "08:00", to: "22:00" },
      Четверг: { enabled: false, from: "08:00", to: "22:00" },
      Пятница: { enabled: false, from: "08:00", to: "22:00" },
      Суббота: { enabled: true, from: "10:00", to: "20:00" },
      Воскресенье: { enabled: true, from: "10:00", to: "20:00" },
    },
  },
  {
    id: 2,
    name: "Neocafe Филармония",
    address: "Табышалиева, 72/1",
    phone: "0555234567",
    link: "https://go.2gis.com/ifh0u",
    image: "",
    workingHours: {
      Понедельник: { enabled: false, from: "09:00", to: "21:00" },
      Вторник: { enabled: false, from: "09:00", to: "21:00" },
      Среда: { enabled: true, from: "09:00", to: "21:00" },
      Четверг: { enabled: true, from: "09:00", to: "21:00" },
      Пятница: { enabled: true, from: "09:00", to: "21:00" },
      Суббота: { enabled: false, from: "11:00", to: "19:00" },
      Воскресенье: { enabled: false, from: "11:00", to: "19:00" },
    },
  },
  {
    id: 3,
    name: "Neocafe Азия Молл",
    address: "Проспект Чынгыза Айтматова, 3",
    phone: "0555123456",
    link: "https://go.2gis.com/nepel",
    image: "",
    workingHours: {
      Понедельник: { enabled: true, from: "09:00", to: "23:00" },
      Вторник: { enabled: true, from: "09:00", to: "23:00" },
      Среда: { enabled: false },
      Четверг: { enabled: true, from: "10:00", to: "22:00" },
      Пятница: { enabled: false },
      Суббота: { enabled: true, from: "09:00", to: "24:00" },
      Воскресенье: { enabled: true, from: "09:00", to: "24:00" },
    },
  },
  {
    id: 4,
    name: "Neocafe Дзержинка",
    address: "Бульвар Эркиндик, 35",
    phone: "0555223456",
    link: "https://go.2gis.com/ffl7x",
    image: "",
    workingHours: {
      Понедельник: { enabled: true, from: "08:00", to: "22:00" },
      Вторник: { enabled: false },
      Среда: { enabled: true, from: "08:00", to: "22:00" },
      Четверг: { enabled: true, from: "08:00", to: "22:00" },
      Пятница: { enabled: true, from: "08:00", to: "22:00" },
      Суббота: { enabled: false },
      Воскресенье: { enabled: true, from: "10:00", to: "20:00" },
    },
  },
  {
    id: 5,
    name: "Neocafe Московская",
    address: "Московская, 73",
    phone: "0555323456",
    link: "https://go.2gis.com/6ltsv",
    image: "",
    workingHours: {
      Понедельник: { enabled: true, from: "09:00", to: "21:00" },
      Вторник: { enabled: true, from: "09:00", to: "21:00" },
      Среда: { enabled: true, from: "09:00", to: "21:00" },
      Четверг: { enabled: true, from: "09:00", to: "21:00" },
      Пятница: { enabled: true, from: "09:00", to: "21:00" },
      Суббота: { enabled: true, from: "10:00", to: "22:00" },
      Воскресенье: { enabled: false },
    },
  },
];
