import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const formatedDate = (date: string, format: 'es' | 'full'): string => {
  const parsedDate = dayjs(date, 'MM/DD/YYYY');

  if (!parsedDate.isValid()) {
    throw new Error('Invalid date');
  }

  switch (format) {
    case 'es':
      return parsedDate.format('DD/MM/YYYY');
    case 'full':
      return parsedDate.format('D [de] MMMM [de] YYYY');
    default:
      return parsedDate.format('DD/MM/YYYY');
  }
};

export default formatedDate;
