import Link from 'next/link';
import { useMenu } from '../../contexts/MenuContext';
import { useAuth } from '../Auth/AuthContext';

const Header = () => {
  const { setIsOpen } = useMenu();
  const { user, logout } = useAuth();

  return (
    <header id="header">
      <div
        className="overlay"
        data-close="menu"
        onClick={() => setIsOpen(false)}
      />
      <Link href="/#home">
        <a>
          <img src="/images/ferrari-logo.svg" className="logo" alt="Logo" />
        </a>
      </Link>
      <button
        type="button"
        id="btn-open"
        aria-label="Abrir Menu"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path d="M0,0H32V32H0Z" fill="none" />
          <path
            d="M3,18H29V16H3Zm0-5H29V11H3ZM3,6V8H29V6Z"
            transform="translate(0 4)"
          />
        </svg>
      </button>
      <div className={["menu", user ? "logged" : ""].join(" ")}>
        <nav>
          <button
            type="button"
            id="btn-close"
            data-close="menu"
            aria-label="fechar"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" />
              <path d="M0,0H24V24H0Z" fill="none" />
            </svg>
          </button>
          <ul>
            <li>
              <Link href="/#home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#service">
                <a>Revisão</a>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <a>Contato</a>
              </Link>
            </li>
            <li className="divider">
              <hr />
            </li>
            <li className="hide-guest">
              <Link href="/schedules">
                <a>Agendamentos</a>
              </Link>
            </li>
            <li className="hide-guest">
              <Link href="/profile">
                <a>Editar Dados</a>
              </Link>
            </li>
            <li className="hide-guest">
              <Link href="/change-photo">
                <a>Mudar Foto</a>
              </Link>
            </li>
            <li className="hide-guest">
              <Link href="/change-password">
                <a>Alterar Senha</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer">
          <hr />
          <div>
            <picture>
              <Link href="/profile">
                <a>
                  <img
                    src={`${process.env.API_URL}/photo/${user?.photo}`}
                    alt={user?.person?.name}
                  />
                </a>
              </Link>
            </picture>
            <div>
              <Link href="/profile">
                <a>
                  <strong>{user?.person?.name}</strong>
                  <small>{user?.email}</small>
                </a>
              </Link>
            </div>
            <button type="button" aria-label="botao" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0,0H24V24H0Z" fill="none" />
                <path
                  d="M10.09,15.59,11.5,17l5-5-5-5L10.09,8.41,12.67,11H3v2h9.67ZM19,3H5A2,2,0,0,0,3,5V9H5V5H19V19H5V15H3v4a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
                  fill="#333"
                />
              </svg>
            </button>
          </div>
          <Link href="/auth">
            <a className="btn-register"> Minha Conta </a>
          </Link>
        </div>
      </div>

      <hr className="italy" />
    </header>
  );
};

export default Header;
