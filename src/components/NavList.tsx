/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router-dom';
import '../styles/containers/navList.scss';

type NavListItem = {
  label: string;
  path: string;
};
interface NavListProps {
  items: NavListItem[];
  header: string;
}
const NavList = ({ items, header }: NavListProps) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <ul className="nav-list">
      <li className="nav-list__header">{header}</li>
      {items.map((item: NavListItem) => (
        <li
          key={`navlist-li-${item.path}`}
          className="nav-list__items"
          onClick={() => handleClick(item.path)}
          onKeyDown={() => handleClick(item.path)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
