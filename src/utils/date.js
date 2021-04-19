import dayjs from 'dayjs';

// Перечисление
export const DateFormat = {
  DATE: 'DD MMMM YYYY',
  DATETIME: 'DD MMMM YYYY HH:mm',
};

export const humanizeDate = (date, format) => {
  return dayjs(date).format(format);
};
