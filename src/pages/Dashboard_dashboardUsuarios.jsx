import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
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
        <div className={"main-layout"}>
          {(() => {
            const nodes = [];
            nodes.push(
              <header className={"dash-header"} key={nodes.length}>
                <div className={"header-left"}>
                  <h1>
                    {
                      "\n                    Gestão de Usuários\n                "
                    }
                  </h1>
                </div>
                <div className={"header-user"}>
                  <div className={"user-profile-group"}>
                    <div className={"user-details"}>
                      <span className={"user-name"}>
                        <strong>{user}</strong>
                      </span>
                      <span
                        className={"user-role"}
                        style={styleFrom("color: #888888;")}
                      >
                        <strong>{userCargo}</strong>
                      </span>
                    </div>
                  </div>
                  <div className={"header-actions"}>
                    <Partials_notificacoes
                      data={{
                        ...data,
                        ...{
                          notificacaoClasse: "header-icon",
                        },
                      }}
                      handlers={handlers}
                    />
                  </div>
                </div>
              </header>,
            );
            if (success_msg && success_msg.length > 0) {
              nodes.push(
                <div className={"alert alert-success"} key={nodes.length}>
                  {success_msg}
                  <span
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </span>
                </div>,
              );
            }
            if (error_msg && error_msg.length > 0) {
              nodes.push(
                <div className={"alert alert-error"} key={nodes.length}>
                  {error_msg}
                  <span
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </span>
                </div>,
              );
            }
            nodes.push(
              <div className={"toolbar"} key={nodes.length}>
                <div className={"action-buttons"}>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openAddUserModal();
                    }}
                    title={"Novo Usuário"}
                  >
                    <i className={"fas fa-user-plus"}></i>
                    {" NOVO USUÁRIO\n                "}
                  </button>
                </div>
                <div className={"search-container"}>
                  <i className={"fas fa-search"}></i>
                  <input
                    type={"text"}
                    id={"userSearchInput"}
                    placeholder={"Pesquisar por nome ou e-mail..."}
                  />
                </div>
              </div>,
            );
            nodes.push(
              <main className={"edit-content"} key={nodes.length}>
                <div className={"table-container"}>
                  <table className={"alunos-table"}>
                    <thead>
                      <tr>
                        <th>{"ID"}</th>
                        <th>{"NOME"}</th>
                        <th>{"E-MAIL"}</th>
                        <th>{"CARGO"}</th>
                        <th>{"STATUS"}</th>
                        <th>{"AÇÕES"}</th>
                      </tr>
                    </thead>
                    <tbody id={"userTableBody"}>
                      {(() => {
                        const nodes = [];
                        if (usuarios && usuarios.length > 0) {
                          usuarios.forEach((user) => {
                            nodes.push(
                              <tr key={nodes.length}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.email.toLowerCase()}</td>
                                <td>{user.cargo}</td>
                                <td>
                                  <span
                                    className={
                                      "status " +
                                      (user.status === "ATIVO"
                                        ? "apto"
                                        : "inapto")
                                    }
                                  >
                                    {user.status}
                                  </span>
                                </td>
                                <td className={"td-actions"}>
                                  {(() => {
                                    const nodes = [];
                                    nodes.push(
                                      <button
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
                                        <i
                                          className={"ph-bold ph-pen"}
                                          aria-hidden={"true"}
                                        ></i>
                                      </button>,
                                    );
                                    if (user.id !== userId) {
                                      nodes.push(
                                        <a
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
                                          <i
                                            className={"ph-bold ph-trash"}
                                            aria-hidden={"true"}
                                          ></i>
                                        </a>,
                                      );
                                    }
                                    return nodes;
                                  })()}
                                </td>
                              </tr>,
                            );
                          });
                        } else {
                          nodes.push(
                            <tr key={nodes.length}>
                              <td
                                colSpan={"6"}
                                style={styleFrom(
                                  "padding: 50px; text-align: center;",
                                )}
                              >
                                {"Nenhum usuário encontrado."}
                              </td>
                            </tr>,
                          );
                        }
                        return nodes;
                      })()}
                    </tbody>
                  </table>
                </div>
              </main>,
            );
            nodes.push(
              <footer className={"dash-footer"} key={nodes.length}>
                <a href={"/dashboard/edit"} className={"btn-secondary-dash"}>
                  <i className={"fas fa-pencil-alt"}></i>
                  {" EDITOR DE NOTAS\n            "}
                </a>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI\n            "}</p>
                </div>
              </footer>,
            );
            return nodes;
          })()}
        </div>
        <div id={"userModal"} className={"modal-overlay"}>
          <div className={"modal-content"}>
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.closeUserModal();
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"} id={"userModalTitle"}>
              {"NOVO USUÁRIO"}
            </h2>
            <form
              id={"userForm"}
              action={"/dashboard/usuarios/add"}
              method={"POST"}
              className={"filter-options"}
            >
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <input type={"hidden"} name={"id"} id={"userId"} />
              <label>{"NOME COMPLETO:"}</label>
              <input
                type={"text"}
                name={"nome"}
                id={"userName"}
                className={"filter-input"}
                required={true}
              />
              <label style={styleFrom("margin-top: 15px; display: block;")}>
                {"E-MAIL:"}
              </label>
              <input
                type={"email"}
                name={"email"}
                id={"userEmail"}
                className={"filter-input"}
                required={true}
              />
              <div id={"passwordField"}>
                <label style={styleFrom("margin-top: 15px; display: block;")}>
                  {"SENHA:"}
                </label>
                <input
                  type={"password"}
                  name={"senha"}
                  className={"filter-input"}
                />
              </div>
              <label style={styleFrom("margin-top: 15px; display: block;")}>
                {"CARGO:"}
              </label>
              <select
                name={"cargo"}
                id={"userCargo"}
                className={"filter-input"}
              >
                <option value={"Professor"}>{"Professor"}</option>
                <option value={"Coordenador"}>{"Coordenador"}</option>
                <option value={"Admin"}>{"Admin"}</option>
              </select>
              <div id={"statusField"} style={styleFrom("display: none;")}>
                <label style={styleFrom("margin-top: 15px; display: block;")}>
                  {"STATUS:"}
                </label>
                <select
                  name={"status"}
                  id={"userStatus"}
                  className={"filter-input"}
                >
                  <option value={"ATIVO"}>{"ATIVO"}</option>
                  <option value={"INATIVO"}>{"INATIVO"}</option>
                </select>
              </div>
              <button
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 30px; width: 100%; justify-content: center;",
                )}
              >
                {"SALVAR USUÁRIO"}
              </button>
            </form>
          </div>
        </div>
        <div id={"permissionModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom("max-width: 400px; border-color: #ff0101;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.closePermissionModal();
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <div style={styleFrom("text-align: center;")}>
              <div
                style={styleFrom(
                  "font-size: 4rem; color: #ff0101; margin-bottom: 15px;",
                )}
              >
                <i className={"fas fa-shield-alt"}></i>
              </div>
              <h2
                className={"section-title-2"}
                style={styleFrom("color: #ff0101; margin-bottom: 15px;")}
              >
                {"\n                    ACESSO NEGADO\n                "}
              </h2>
              <p
                style={styleFrom(
                  "color: #888; font-size: 1rem; margin-bottom: 20px;",
                )}
              >
                {
                  "\n                    Apenas administradores podem gerenciar usuários.\n                "
                }
              </p>
              <button
                className={"btn-action"}
                onClick={(event) => {
                  handlers.closePermissionModal();
                }}
                style={styleFrom(
                  "width: 100%; justify-content: center; border-color: #ff0101; color: #ff0101;",
                )}
              >
                <i className={"fas fa-times"}></i>
                {" ENTENDI\n                "}
              </button>
            </div>
          </div>
        </div>
        <script type="application/json" id="dashboard-usuarios-data">
          {String(isAdmin)}
        </script>
      </React.Fragment>
    </>
  );
}
