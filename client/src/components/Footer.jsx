import React from "react";
import { IconContext } from "react-icons";
import {
  BsEnvelope,
  BsFacebook,
  BsGeoAlt,
  BsInstagram,
  BsTelephone,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-12">
        <div className="flex justify-between">
          <div>
            <Logo />

            <p className="mt-8 max-w-md leading-relaxed text-gray-500">
              HonduMarket es una tienda en línea en donde los usuarios pueden
              comprar y vender productos en todo el territorio hondureño.
            </p>

            <ul className="mt-8 flex gap-8">
              <li>
                <Link to="/">
                  <IconContext.Provider
                    value={{
                      className:
                        "text-gray-500 transition hover:text-[#3b82f6]",
                      size: "24px",
                    }}
                  >
                    <div>
                      <BsFacebook />
                    </div>
                  </IconContext.Provider>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <IconContext.Provider
                    value={{
                      className:
                        "text-gray-500 transition hover:text-[#3b82f6]",
                      size: "24px",
                    }}
                  >
                    <div>
                      <BsInstagram />
                    </div>
                  </IconContext.Provider>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <IconContext.Provider
                    value={{
                      className:
                        "text-gray-500 transition hover:text-[#3b82f6]",
                      size: "24px",
                    }}
                  >
                    <div>
                      <BsTwitter />
                    </div>
                  </IconContext.Provider>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-between gap-24">
            <div>
              <p className="text-lg font-medium text-gray-900">Compañía</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link to="/">
                    <span className="text-gray-700 transition hover:text-[#3b82f6]">
                      Acerca de nosotros
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/">
                    <span className="text-gray-700 transition hover:text-[#3b82f6]">
                      Nuestro equipo
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/">
                    <span className="text-gray-700 transition hover:text-[#3b82f6]">
                      Oportunidades
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900">Legal</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link to="/">
                    <span className="text-gray-700 transition hover:text-[#3b82f6]">
                      Términos y condiciones
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/">
                    <span className="text-gray-700 transition hover:text-[#3b82f6]">
                      Política de privacidad
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900">Contacto</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex gap-1.5"
                    href="mailto:soporte@hondumarket.com"
                  >
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "18px",
                      }}
                    >
                      <div>
                        <BsEnvelope />
                      </div>
                    </IconContext.Provider>

                    <span className="text-gray-700 hover:text-[#3b82f6]">
                      soporte@hondumarket.com
                    </span>
                  </a>
                </li>

                <li>
                  <a className="flex gap-1.5" href="tel:+504-1234-5678">
                    <IconContext.Provider
                      value={{
                        className: "text-gray-700",
                        size: "18px",
                      }}
                    >
                      <div>
                        <BsTelephone />
                      </div>
                    </IconContext.Provider>

                    <span className="text-gray-700 hover:text-[#3b82f6]">
                      +504 1234-5678
                    </span>
                  </a>
                </li>

                <li className="flex gap-1.5">
                  <IconContext.Provider
                    value={{
                      className: "text-gray-700",
                      size: "18px",
                    }}
                  >
                    <div>
                      <BsGeoAlt />
                    </div>
                  </IconContext.Provider>

                  <address className="-mt-0.5 not-italic text-gray-700">
                    Boulevard Suyapa, Tegucigalpa, Honduras.
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">&copy; 2022 HonduMarket</p>
            <p className="text-sm text-gray-500">
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
