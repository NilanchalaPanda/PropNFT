import logo from "../assets/logo.svg";

const Navigation = ({ account, setAccount }) => {
  return (
    <nav>
      <div className="nav__brand">
        <a href="/">
          <img src={logo} alt="LOGO " />
        </a>
      </div>
      <ul className="nav__links">
        <li>
          <a href="#">BUY</a>
        </li>
        <li>
          <a href="#">SELL</a>
        </li>
        <li>
          <a href="#">RENT</a>
        </li>
      </ul>

      <button className="nav__connect" type="button">
        0x0....
      </button>
    </nav>
  );
};

export default Navigation;
