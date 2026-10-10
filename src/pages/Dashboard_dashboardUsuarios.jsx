import {
  LoadingValue,
  LoadingElement,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Dashboard_dashboardUsuarios({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    success_msg = null,
    error_msg = null,
    usuarios = [],
    userId = null,
    csrfToken = null,
    isAdmin = null,
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
          {(() => {
            const nodes = [];
            nodes.push(
              <PageHeader key="page-header" data={data} handlers={handlers} />,
            );
            if (success_msg && success_msg.length > 0) {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"alert alert-success"}
                  key={nodes.length}
                >
                  <LoadingValue
                    slot="dashboard/dashboardUsuarios:1"
                    width="12ch"
                    known={false}
                    value={success_msg}
                  />
                  <LoadingElement
                    as="span"
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </LoadingElement>
                </LoadingElement>,
              );
            }
            if (error_msg && error_msg.length > 0) {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"alert alert-error"}
                  key={nodes.length}
                >
                  <LoadingValue
                    slot="dashboard/dashboardUsuarios:2"
                    width="12ch"
                    known={false}
                    value={error_msg}
                  />
                  <LoadingElement
                    as="span"
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </LoadingElement>
                </LoadingElement>,
              );
            }
            nodes.push(
              <LoadingElement as="div" className={"toolbar"} key={nodes.length}>
                <LoadingElement as="div" className={"action-buttons"}>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openAddUserModal();
                    }}
                    title={"Novo Usuário"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-user-plus"}
                    ></LoadingElement>
                    {" NOVO USUÁRIO\n                "}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"search-container"}>
                  <LoadingElement
                    as="i"
                    className={"fas fa-search"}
                  ></LoadingElement>
                  <LoadingElement
                    as="input"
                    type={"text"}
                    id={"userSearchInput"}
                    placeholder={"Pesquisar por nome ou e-mail..."}
                  />
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="main"
                className={"edit-content"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"table-container"}>
                  <LoadingElement as="table" className={"alunos-table"}>
                    <LoadingElement as="thead">
                      <LoadingElement as="tr">
                        <LoadingElement as="th">{"ID"}</LoadingElement>
                        <LoadingElement as="th">{"NOME"}</LoadingElement>
                        <LoadingElement as="th">{"E-MAIL"}</LoadingElement>
                        <LoadingElement as="th">{"CARGO"}</LoadingElement>
                        <LoadingElement as="th">{"STATUS"}</LoadingElement>
                        <LoadingElement as="th">{"AÇÕES"}</LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="tbody" id={"userTableBody"}>
                      {(() => {
                        const nodes = [];
                        if (usuarios && usuarios.length > 0) {
                          usuarios.forEach((user) => {
                            nodes.push(
                              <LoadingElement as="tr" key={nodes.length}>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardUsuarios:3"
                                    width="12ch"
                                    known={true}
                                    value={user.id}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardUsuarios:4"
                                    width="min(18ch, 100%)"
                                    known={true}
                                    value={user.nome}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardUsuarios:5"
                                    width="22ch"
                                    known={true}
                                    value={user.email.toLowerCase()}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardUsuarios:6"
                                    width="12ch"
                                    known={true}
                                    value={user.cargo}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingElement
                                    as="span"
                                    className={
                                      "status " +
                                      (user.status === "ATIVO"
                                        ? "apto"
                                        : "inapto")
                                    }
                                    tone={true}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardUsuarios:7"
                                      width="12ch"
                                      known={true}
                                      value={user.status}
                                    />
                                  </LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="td"
                                  className={"td-actions"}
                                >
                                  {(() => {
                                    const nodes = [];
                                    nodes.push(
                                      <LoadingElement
                                        as="button"
                                        className={"btn-table-add"}
                                        data-id={user.id}
                                        data-name={user.nome}
                                        data-email={user.email.toLowerCase()}
                                        data-cargo={user.cargo}
                                        data-status={user.status}
                                        onClick={(event) => {
                                          handlers.editUser(
                                            event.currentTarget.dataset.id,
                                            event.currentTarget.dataset.name,
                                            event.currentTarget.dataset.email,
                                            event.currentTarget.dataset.cargo,
                                            event.currentTarget.dataset.status,
                                          );
                                        }}
                                        title={"Editar"}
                                        key={nodes.length}
                                      >
                                        <LoadingElement
                                          as="i"
                                          className={"ph-bold ph-pen"}
                                          aria-hidden={"true"}
                                        ></LoadingElement>
                                      </LoadingElement>,
                                    );
                                    if (user.id !== userId) {
                                      nodes.push(
                                        <LoadingElement
                                          as="a"
                                          href={"#"}
                                          data-id={user.id}
                                          data-name={user.nome}
                                          onClick={(event) => {
                                            event.preventDefault();
                                            handlers.confirmDeleteUser(
                                              event.currentTarget.dataset.id,
                                              event.currentTarget.dataset.name,
                                            );
                                          }}
                                          className={"delete-link"}
                                          key={nodes.length}
                                        >
                                          <LoadingElement
                                            as="i"
                                            className={"ph-bold ph-trash"}
                                            aria-hidden={"true"}
                                          ></LoadingElement>
                                        </LoadingElement>,
                                      );
                                    }
                                    return nodes;
                                  })()}
                                </LoadingElement>
                              </LoadingElement>,
                            );
                          });
                        } else {
                          nodes.push(
                            <LoadingElement as="tr" key={nodes.length}>
                              <LoadingElement
                                as="td"
                                colSpan={"6"}
                                style={styleFrom(
                                  "padding: 50px; text-align: center;",
                                )}
                              >
                                {"Nenhum usuário encontrado."}
                              </LoadingElement>
                            </LoadingElement>,
                          );
                        }
                        return nodes;
                      })()}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="footer"
                className={"dash-footer"}
                key={nodes.length}
              >
                <LoadingElement
                  as="a"
                  href={"/dashboard/edit"}
                  className={"btn-secondary-dash"}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-pencil-alt"}
                  ></LoadingElement>
                  {" EDITOR DE NOTAS\n            "}
                </LoadingElement>
                <LoadingElement as="div" className={"footer-credits"}>
                  <LoadingElement as="p">
                    {"© 2026 AnalisAI\n            "}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            return nodes;
          })()}
        </LoadingElement>
        <LoadingElement as="div" id={"userModal"} className={"modal-overlay"}>
          <LoadingElement as="div" className={"modal-content"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.closeUserModal();
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="h2"
              className={"section-title-2"}
              id={"userModalTitle"}
            >
              {"NOVO USUÁRIO"}
            </LoadingElement>
            <LoadingElement
              as="form"
              id={"userForm"}
              action={"/dashboard/usuarios/add"}
              method={"POST"}
              className={"filter-options"}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"id"}
                id={"userId"}
              />
              <LoadingElement as="label">{"NOME COMPLETO:"}</LoadingElement>
              <LoadingElement
                as="input"
                type={"text"}
                name={"nome"}
                id={"userName"}
                className={"filter-input"}
                required={true}
              />
              <LoadingElement
                as="label"
                style={styleFrom("margin-top: 15px; display: block;")}
              >
                {"E-MAIL:"}
              </LoadingElement>
              <LoadingElement
                as="input"
                type={"email"}
                name={"email"}
                id={"userEmail"}
                className={"filter-input"}
                required={true}
              />
              <LoadingElement as="div" id={"passwordField"}>
                <LoadingElement
                  as="label"
                  style={styleFrom("margin-top: 15px; display: block;")}
                >
                  {"SENHA:"}
                </LoadingElement>
                <LoadingElement
                  as="input"
                  type={"password"}
                  name={"senha"}
                  className={"filter-input"}
                />
              </LoadingElement>
              <LoadingElement
                as="label"
                style={styleFrom("margin-top: 15px; display: block;")}
              >
                {"CARGO:"}
              </LoadingElement>
              <LoadingElement
                as="select"
                name={"cargo"}
                id={"userCargo"}
                className={"filter-input"}
              >
                <LoadingElement as="option" value={"Professor"}>
                  {"Professor"}
                </LoadingElement>
                <LoadingElement as="option" value={"Coordenador"}>
                  {"Coordenador"}
                </LoadingElement>
                <LoadingElement as="option" value={"Admin"}>
                  {"Admin"}
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"statusField"}
                style={styleFrom("display: none;")}
              >
                <LoadingElement
                  as="label"
                  style={styleFrom("margin-top: 15px; display: block;")}
                >
                  {"STATUS:"}
                </LoadingElement>
                <LoadingElement
                  as="select"
                  name={"status"}
                  id={"userStatus"}
                  className={"filter-input"}
                >
                  <LoadingElement as="option" value={"ATIVO"}>
                    {"ATIVO"}
                  </LoadingElement>
                  <LoadingElement as="option" value={"INATIVO"}>
                    {"INATIVO"}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 30px; width: 100%; justify-content: center;",
                )}
              >
                {"SALVAR USUÁRIO"}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"permissionModal"}
          className={"modal-overlay"}
        >
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom("max-width: 400px; border-color: #ff0101;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.closePermissionModal();
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" style={styleFrom("text-align: center;")}>
              <LoadingElement
                as="div"
                style={styleFrom(
                  "font-size: 4rem; color: #ff0101; margin-bottom: 15px;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-shield-alt"}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="h2"
                className={"section-title-2"}
                style={styleFrom("color: #ff0101; margin-bottom: 15px;")}
              >
                {"\n                    ACESSO NEGADO\n                "}
              </LoadingElement>
              <LoadingElement
                as="p"
                style={styleFrom(
                  "color: #888; font-size: 1rem; margin-bottom: 20px;",
                )}
              >
                {
                  "\n                    Apenas administradores podem gerenciar usuários.\n                "
                }
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"btn-action"}
                onClick={(event) => {
                  handlers.closePermissionModal();
                }}
                style={styleFrom(
                  "width: 100%; justify-content: center; border-color: #ff0101; color: #ff0101;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-times"}
                ></LoadingElement>
                {" ENTENDI\n                "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <PageDataScript type="application/json" id="dashboard-usuarios-data">
          {String(isAdmin)}
        </PageDataScript>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    success_msg = null,
    error_msg = null,
    usuarios = [],
    userId = null,
    csrfToken = null,
    isAdmin = null,
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Gestão de Usuários\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardUsuarios:8"
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
                  slot="dashboard/dashboardUsuarios:9"
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
