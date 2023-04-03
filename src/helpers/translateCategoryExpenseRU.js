export const translateCategoryExpenseRU = name => {
  switch (name) {
    case 'Products':
      return 'Продукты';
    case 'Alcohol':
      return 'Алкоголь';
    case 'Entertainment':
      return 'Развлечения';
    case 'Health':
      return 'Здоровье';
    case 'Transport':
      return 'Транспорт';
    case 'Housing':
      return 'Всё для дома';
    case 'Technique':
      return 'Техника';
    case 'Communal, communication':
      return 'Коммуналка и связь';
    case 'Sports, hobbies':
      return 'Спорт и хобби';
    case 'Education':
      return 'Образование';
    case 'Other':
      return 'Прочее';
    default:
      break;
  }
};
