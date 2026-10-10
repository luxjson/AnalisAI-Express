import React from "react";
import Partials_header from "../components/Partials_header.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Index({ data, handlers }) {
  const {} = data;

  return (
    <>
      <React.Fragment>
        <Partials_header
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <div className={"main-layout"}>
          <div className={"home-content-wrapper"}>
            <header
              className={"dash-header"}
              style={styleFrom(
                "border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 40px;",
              )}
            >
              <div className={"header-left mobile"}>
                <img
                  src={"/images/logo3-white.png"}
                  alt={"AnalisAI"}
                  style={styleFrom("height: 35px;")}
                />
              </div>
              <div className={"header-user"}>
                <div className={"header-actions"}>
                  <a
                    href={"/login"}
                    className={"btn-secondary-dash"}
                    style={styleFrom(" color: #fff;")}
                  >
                    {
                      "\n                            ACESSAR PAINEL\n                        "
                    }
                  </a>
                </div>
              </div>
            </header>
            <main>
              <section
                id={"inicio"}
                className={"welcome-banner"}
                style={styleFrom(
                  "padding: 100px 60px; border-radius: 30px; margin-bottom: 80px; position: relative;",
                )}
              >
                <div className={"banner-text"}>
                  <h1
                    style={styleFrom(
                      "font-size: 4rem; line-height: 1; margin-bottom: 20px;",
                    )}
                  >
                    {"\n                            SISTEMA DE "}
                    <br />
                    {" ANÁLISE DE AVANÇOS\n                        "}
                  </h1>
                  <p
                    style={styleFrom(
                      "font-size: 1.2rem; max-width: 600px; opacity: 0.9;",
                    )}
                  >
                    {
                      "\n                            Organize competências, monitore frequências e alcance objetivos educacionais com a precisão de dados em tempo real.\n                        "
                    }
                  </p>
                </div>
              </section>
              <section id={"sobre"} style={styleFrom("margin-bottom: 100px;")}>
                <h2
                  className={"section-title-2"}
                  style={styleFrom("margin-bottom: 40px;")}
                >
                  {"PILARES ESTRATÉGICOS"}
                </h2>
                <div className={"dash-grid"}>
                  <div className={"card-elite"}>
                    <div className={"card-line"}></div>
                    <h3
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"SENAI CIC"}
                    </h3>
                    <p
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Referência em formação profissional, o SENAI CIC atua como hub tecnológico preparando talentos para a Indústria 4.0."
                      }
                    </p>
                  </div>
                  <div className={"card-elite"}>
                    <div className={"card-line"}></div>
                    <h3
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"ANÁLISE DE DADOS"}
                    </h3>
                    <p
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Transformamos avaliações complexas em indicadores visuais claros para identificar a aptidão de cada estudante."
                      }
                    </p>
                  </div>
                  <div className={"card-elite"}>
                    <div className={"card-line"}></div>
                    <h3
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"RESULTADOS"}
                    </h3>
                    <p
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Acompanhe a evolução das turmas e garanta o sucesso acadêmico com decisões baseadas em dados organizados."
                      }
                    </p>
                  </div>
                </div>
              </section>
              <section
                id={"faq"}
                style={styleFrom("margin-bottom: 120px; max-width: 800px;")}
              >
                <h2
                  className={"section-title-2"}
                  style={styleFrom("margin-bottom: 40px;")}
                >
                  {"DÚVIDAS FREQUENTES"}
                </h2>
                <div className={"faq-container"}>
                  <details>
                    <summary>{"Como o nível do aluno é calculado?"}</summary>
                    <p
                      style={styleFrom(
                        "color: #666; padding-top: 15px; font-size: 0.9rem;",
                      )}
                    >
                      {
                        "O sistema cruza a nota (mínima 7.0) com a presença (mínima 75%) para definir o status."
                      }
                    </p>
                  </details>
                  <details>
                    <summary>{"O sistema é exclusivo para o SENAI?"}</summary>
                    <p
                      style={styleFrom(
                        "color: #666; padding-top: 15px; font-size: 0.9rem;",
                      )}
                    >
                      {
                        "Sim, é uma ferramenta personalizada para otimização de fluxos internos do SENAI CIC."
                      }
                    </p>
                  </details>
                </div>
              </section>
            </main>
            <footer className={"dash-footer"}>
              <div className={"footer-credits"}>
                <p>{"© 2026 AnalisAI\n            "}</p>
              </div>
            </footer>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
