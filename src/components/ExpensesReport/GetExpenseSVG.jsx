import { ReactComponent as Products } from 'images/svg-reports/products.svg';
import { ReactComponent as Alcohol } from 'images/svg-reports/alcohol.svg';
import { ReactComponent as Entertainment } from 'images/svg-reports/entertainment.svg';
import { ReactComponent as Health } from 'images/svg-reports/health.svg';
import { ReactComponent as Transport } from 'images/svg-reports/transport.svg';
import { ReactComponent as Housing } from 'images/svg-reports/housing.svg';
import { ReactComponent as Technics } from 'images/svg-reports/technique.svg';
import { ReactComponent as Utilities } from 'images/svg-reports/communal.svg';
import { ReactComponent as Sports } from 'images/svg-reports/sports.svg';
import { ReactComponent as Education } from 'images/svg-reports/education.svg';
import { ReactComponent as Other } from 'images/svg-reports/other.svg';

export const GetExpenseSVG = category => {
  switch (category) {
    case 'Products':
      return <Products />;
    case 'Alcohol':
      return <Alcohol />;
    case 'Entertainment':
      return <Entertainment />;
    case 'Health':
      return <Health />;
    case 'Transport':
      return <Transport />;
    case 'Housing':
      return <Housing />;
    case 'Technique':
      return <Technics />;
    case 'Communal, communication':
      return <Utilities />;
    case 'Sports, hobbies':
      return <Sports />;
    case 'Education':
      return <Education />;
    case 'Other':
      return <Other />;
    default:
      break;
  }
};
