import { ReactComponent as Salary } from 'images/svg-reports/salary.svg';
import { ReactComponent as Income } from 'images/svg-reports/income.svg';

export const GetIncomeSVG = category => {
  switch (category) {
    case 'Salary':
      return <Salary />;
    case 'Additional income':
      return <Income />;
    default:
      break;
  }
};
