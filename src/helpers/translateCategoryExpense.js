export const translateCategoryExpense = name => {
  switch (name) {
    case 'Продукты':
      return 'Products';
    case 'Алкоголь':
      return 'Alcohol';
    case 'Развлечения':
      return 'Entertainment';
    case 'Здоровье':
      return 'Health';
    case 'Транспорт':
      return 'Transport';
    case 'Всё для дома':
      return 'Housing';
    case 'Техника':
      return 'Technique';
    case 'Коммуналка и связь':
      return 'Communal, communication';
    case 'Спорт и хобби':
      return 'Sports, hobbies';
    case 'Образование':
      return 'Education';
    case 'Прочее':
      return 'Other';
    default:
      break;
  }
};
