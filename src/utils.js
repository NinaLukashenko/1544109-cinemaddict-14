import dayjs from 'dayjs';

// Перечисление
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Принцип работы:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
// Нюанс: HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeFilmDate = (dueDate) => {
  return dayjs(dueDate).format('DD MMMM YYYY');
};

export const humanizeFilmDateTime = (dueDate) => {
  return dayjs(dueDate).format('DD MMMM YYYY HH:mm');
};
