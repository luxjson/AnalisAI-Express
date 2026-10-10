import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Dashboard_dashboardSolicitacoes({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    solicitacoes = [],
    csrfToken = null,
  } = data;
  return (
    <>
      <React.Fragment>
        <Partials_barProfessor
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <LoadingElement as="div" className={"main-layout"} root={true}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <LoadingElement as="main" className={"dash-content"}>
            {(() => {
              const nodes = [];
              if (solicitacoes.length === 0) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"empty-state"}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-inbox"}
                      style={styleFrom("font-size: 3rem; color: #333;")}
                    ></LoadingElement>
                    <LoadingElement
                      as="h3"
                      style={styleFrom("color: #666; margin-top: 15px;")}
                    >
                      {"Nenhuma solicitação pendente"}
                    </LoadingElement>
                  </LoadingElement>,
                );
              } else {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"solicitacoes-grid"}
                    key={nodes.length}
                  >
                    {(() => {
                      const nodes = [];
                      solicitacoes.forEach((s) => {
                        nodes.push(
                          <LoadingElement
                            as="div"
                            className={"solicitacao-card"}
                            key={nodes.length}
                          >
                            <LoadingElement
                              as="div"
                              className={"solicitacao-nome"}
                            >
                              <LoadingElement
                                as="i"
                                className={"fas fa-user"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardSolicitacoes:1"
                                width="min(18ch, 100%)"
                                known={false}
                                value={s.nome}
                              />
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"solicitacao-email"}
                            >
                              <LoadingElement
                                as="i"
                                className={"fas fa-envelope"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardSolicitacoes:2"
                                width="22ch"
                                known={false}
                                value={s.email}
                              />
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"solicitacao-data"}
                            >
                              <LoadingElement
                                as="i"
                                className={"far fa-clock"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardSolicitacoes:3"
                                width="10ch"
                                known={false}
                                value={new Date(
                                  s.data_solicitacao,
                                ).toLocaleString("pt-BR")}
                              />
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"solicitacao-acoes"}
                            >
                              <LoadingElement
                                as="button"
                                className={"btn-secondary-dash"}
                                onClick={(event) => {
                                  handlers.abrirModalAprovar(s.id, s.nome);
                                }}
                              >
                                <LoadingElement
                                  as="i"
                                  className={"fas fa-check"}
                                ></LoadingElement>
                                {" APROVAR\n                                "}
                              </LoadingElement>
                              <LoadingElement
                                as="button"
                                className={"btn-secondary-dash"}
                                onClick={(event) => {
                                  handlers.abrirModalRejeitar(s.id, s.nome);
                                }}
                              >
                                <LoadingElement
                                  as="i"
                                  className={"fas fa-times"}
                                ></LoadingElement>
                                {" REJEITAR\n                                "}
                              </LoadingElement>
                            </LoadingElement>
                          </LoadingElement>,
                        );
                      });
                      return nodes;
                    })()}
                  </LoadingElement>,
                );
              }
              return nodes;
            })()}
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"modalAprovar"}
          className={"modal-overlay"}
        >
          <LoadingElement as="div" className={"modal-content modal-pequeno"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("modalAprovar");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="h2" className={"section-title-2"}>
              {"APROVAR SOLICITAÇÃO"}
            </LoadingElement>
            <LoadingElement
              as="form"
              action={""}
              method={"POST"}
              id={"formAprovar"}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement as="div" className={"filter-options"}>
                <LoadingElement
                  as="p"
                  style={styleFrom("color: #888; margin-bottom: 15px;")}
                  id={"nomeAprovar"}
                ></LoadingElement>
                <LoadingElement as="label">{"NOVA SENHA"}</LoadingElement>
                <LoadingElement
                  as="input"
                  type={"password"}
                  name={"nova_senha"}
                  className={"filter-input"}
                  required={true}
                  minLength={"12"}
                />
                <LoadingElement
                  as="button"
                  type={"submit"}
                  className={"btn-secondary-dash"}
                  style={styleFrom(
                    "margin-top: 20px; justify-content: center;",
                  )}
                >
                  {"REDEFINIR SENHA"}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"modalRejeitar"}
          className={"modal-overlay"}
        >
          <LoadingElement as="div" className={"modal-content modal-pequeno"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("modalRejeitar");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="h2" className={"section-title-2"}>
              {"REJEITAR SOLICITAÇÃO"}
            </LoadingElement>
            <LoadingElement
              as="form"
              action={""}
              method={"POST"}
              id={"formRejeitar"}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement as="div" className={"filter-options"}>
                <LoadingElement
                  as="p"
                  style={styleFrom("color: #888; margin-bottom: 15px;")}
                  id={"nomeRejeitar"}
                ></LoadingElement>
                <LoadingElement as="label">
                  {"MOTIVO (opcional)"}
                </LoadingElement>
                <LoadingElement
                  as="textarea"
                  name={"motivo"}
                  className={"filter-input"}
                  rows={"3"}
                  placeholder={"Por que está rejeitando?"}
                  defaultValue={""}
                ></LoadingElement>
                <LoadingElement
                  as="button"
                  type={"submit"}
                  className={"btn-secondary-dash"}
                  style={styleFrom(
                    "margin-top: 20px; justify-content: center;",
                  )}
                >
                  {"REJEITAR"}
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
  const {
    user = "",
    userCargo = null,
    solicitacoes = [],
    csrfToken = null,
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Solicitações de Senha\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardSolicitacoes:4"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="span"
              className={"user-role"}
              style={styleFrom("color: #888888;")}
            >
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardSolicitacoes:5"
                  width="12ch"
                  known={true}
                  value={userCargo}
                />
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement as="div" className={"header-actions"}>
          <Partials_notificacoes
            data={{
              ...data,
              ...{
                notificacaoClasse: "header-icon",
              },
            }}
            handlers={handlers}
          />
        </LoadingElement>
      </LoadingElement>
    </LoadingElement>
  );
}
