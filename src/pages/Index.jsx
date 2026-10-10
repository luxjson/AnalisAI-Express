import { LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_header from "../components/Partials_header.jsx";
import { styleFrom } from "../services/ui";
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
        <LoadingElement as="div" className={"main-layout"} root={true}>
          <LoadingElement as="div" className={"home-content-wrapper"}>
            <PageHeader key="page-header" data={data} handlers={handlers} />
            <LoadingElement as="main">
              <LoadingElement
                as="section"
                id={"inicio"}
                className={"welcome-banner"}
                style={styleFrom(
                  "padding: 100px 60px; border-radius: 30px; margin-bottom: 80px; position: relative;",
                )}
              >
                <LoadingElement as="div" className={"banner-text"}>
                  <LoadingElement
                    as="h1"
                    style={styleFrom(
                      "font-size: 4rem; line-height: 1; margin-bottom: 20px;",
                    )}
                  >
                    {"\n                            SISTEMA DE "}
                    <LoadingElement as="br" />
                    {" ANÁLISE DE AVANÇOS\n                        "}
                  </LoadingElement>
                  <LoadingElement
                    as="p"
                    style={styleFrom(
                      "font-size: 1.2rem; max-width: 600px; opacity: 0.9;",
                    )}
                  >
                    {[
                      "\n                            Organize competências, monitore ",
                      "frequências e alcance objetivos educacionais com a precisão de ",
                      "dados em tempo real.\n                        ",
                    ].join("")}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="section"
                id={"sobre"}
                style={styleFrom("margin-bottom: 100px;")}
              >
                <LoadingElement
                  as="h2"
                  className={"section-title-2"}
                  style={styleFrom("margin-bottom: 40px;")}
                >
                  {"PILARES ESTRATÉGICOS"}
                </LoadingElement>
                <LoadingElement as="div" className={"dash-grid"}>
                  <LoadingElement as="div" className={"card-elite"}>
                    <LoadingElement
                      as="div"
                      className={"card-line"}
                    ></LoadingElement>
                    <LoadingElement
                      as="h3"
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"SENAI CIC"}
                    </LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Referência em formação profissional, o SENAI CIC atua como hub tecnológico preparando talentos para a Indústria 4.0."
                      }
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"card-elite"}>
                    <LoadingElement
                      as="div"
                      className={"card-line"}
                    ></LoadingElement>
                    <LoadingElement
                      as="h3"
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"ANÁLISE DE DADOS"}
                    </LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Transformamos avaliações complexas em indicadores visuais claros para identificar a aptidão de cada estudante."
                      }
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"card-elite"}>
                    <LoadingElement
                      as="div"
                      className={"card-line"}
                    ></LoadingElement>
                    <LoadingElement
                      as="h3"
                      style={styleFrom(
                        "color: #fff; font-size: 1.2rem; margin-bottom: 15px;",
                      )}
                    >
                      {"RESULTADOS"}
                    </LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: #888; font-size: 0.95rem; line-height: 1.6;",
                      )}
                    >
                      {
                        "Acompanhe a evolução das turmas e garanta o sucesso acadêmico com decisões baseadas em dados organizados."
                      }
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="section"
                id={"faq"}
                style={styleFrom("margin-bottom: 120px; max-width: 800px;")}
              >
                <LoadingElement
                  as="h2"
                  className={"section-title-2"}
                  style={styleFrom("margin-bottom: 40px;")}
                >
                  {"DÚVIDAS FREQUENTES"}
                </LoadingElement>
                <LoadingElement as="div" className={"faq-container"}>
                  <LoadingElement as="details">
                    <LoadingElement as="summary">
                      {"Como o nível do aluno é calculado?"}
                    </LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: #666; padding-top: 15px; font-size: 0.9rem;",
                      )}
                    >
                      {
                        "O sistema cruza a nota (mínima 7.0) com a presença (mínima 75%) para definir o status."
                      }
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="details">
                    <LoadingElement as="summary">
                      {"O sistema é exclusivo para o SENAI?"}
                    </LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: #666; padding-top: 15px; font-size: 0.9rem;",
                      )}
                    >
                      {
                        "Sim, é uma ferramenta personalizada para otimização de fluxos internos do SENAI CIC."
                      }
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="footer" className={"dash-footer"}>
              <LoadingElement as="div" className={"footer-credits"}>
                <LoadingElement as="p">
                  {"© 2026 AnalisAI\n            "}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const {} = data;
  return (
    <LoadingElement
      as="header"
      className={"dash-header"}
      style={styleFrom(
        "border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 40px;",
      )}
    >
      <LoadingElement as="div" className={"header-left mobile"}>
        <LoadingElement
          as="img"
          src={"/images/logo3-white.png"}
          alt={"AnalisAI"}
          style={styleFrom("height: 35px;")}
        />
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"header-actions"}>
          <LoadingElement
            as="a"
            href={"/login"}
            className={"btn-secondary-dash"}
            style={styleFrom(" color: #fff;")}
          >
            {
              "\n                            ACESSAR PAINEL\n                        "
            }
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
    </LoadingElement>
  );
}
