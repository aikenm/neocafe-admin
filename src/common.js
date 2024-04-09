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
