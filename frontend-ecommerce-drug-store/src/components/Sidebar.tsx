import { Link } from "react-router-dom";

type props = {
  width: number | string;
};

export default function Sidebar({ width }: props) {
  return (
    <>
      <aside className={`sidebar w-${width} h-screen`}>
        <ul>
          <li>LOGO</li>
          <li>
            <Link to={"/dashboard/store"}>Store</Link>
          </li>
          <li>
            <Link to={"/dashboard/basket"}>Basket</Link>
          </li>
          <li>
            <Link to={"/dashboard/settings"}>Settings</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
