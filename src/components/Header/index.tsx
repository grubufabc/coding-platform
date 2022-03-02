import React from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { authData } = React.useContext(AuthContext);

  return (
    <header className="text-light px-4 bg-dark" style={{ height: "4.5rem" }}>
      <div className="d-flex justify-content-between align-items-center h-100">
        <Link to="/" className="text-decoration-none">
          <span className="h1 text-light">
            <img src="/grub_logo.png" alt="GRUB" height="50rem" />
          </span>
        </Link>

        <span>
          <Link
            to="/learn"
            className="text-light text-decoration-none fw-bold mx-4"
          >
            Cursos
          </Link>
          <Link
            to="/problems"
            className="text-light text-decoration-none fw-bold me-4"
          >
            Problemas
          </Link>
          <Link
            to="/pair-programming"
            className="text-light text-decoration-none fw-bold mx-4"
          >
            Pair programming
          </Link>
          <Link
            to="/blog"
            className="text-light text-decoration-none fw-bold mx-4"
          >
            Blog
          </Link>
          <Link
            to="/code-environment"
            className="text-light text-decoration-none fw-bold mx-4"
          >
            Ambiente de programação
          </Link>
        </span>

        <span>
          {authData.token ? (
            <React.Fragment>
              <Link
                to="/admin"
                className="text-light rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold me-3"
              >
                Admin
              </Link>
              <Link
                to="/logout"
                className="text-light rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold"
              >
                Sair
              </Link>
            </React.Fragment>
          ) : (
            <Link
              to="/login"
              className="text-light rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold"
            >
              Entrar
            </Link>
          )}
        </span>
      </div>

      {/* <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-2">
                        
                    </div>
                    <div className="col-7 pt-4 text-center">
                       
                    </div>
                    <div className="col-3 pt-3">
                        
                    </div>
                </div>
            </div> */}
    </header>
  );
};

export default Header;
