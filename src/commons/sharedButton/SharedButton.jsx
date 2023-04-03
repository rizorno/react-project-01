import css from './SharedButton.module.scss';
import classNames from 'classnames';

const SharedButton = ({
  disabled,
  type,
  active,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick ? onClick : () => {}}
      className={classNames(
        css['button'],
        active && css['button-active'],
        className && className
      )}
    >
      {children}
    </button>
  );
};

export default SharedButton;
