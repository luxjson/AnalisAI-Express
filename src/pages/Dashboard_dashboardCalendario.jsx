import {
  LoadingValue,
  LoadingElement,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, parseCalendarDate, safeJson } from "../services/ui";
export default function Dashboard_dashboardCalendario({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    success_msg = null,
    error_msg = null,
    filtros = {
      mes: 1,
      ano: 2026,
      turma: "",
    },
    eventos = [],
    feriados = [],
    tipos = [],
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
          {(() => {
            const nodes = [];
            nodes.push(
              <PageHeader key="page-header" data={data} handlers={handlers} />,
            );
            if (success_msg && success_msg.length > 0) {
              nodes.push(
                <div className={"alert alert-success"} key={nodes.length}>
                  <LoadingValue
                    slot="dashboard/dashboardCalendario:1"
                    width="12ch"
                    known={false}
                    value={success_msg}
                  />
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
                  <LoadingValue
                    slot="dashboard/dashboardCalendario:2"
                    width="12ch"
                    known={false}
                    value={error_msg}
                  />
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
              <div className={"calendario-container"} key={nodes.length}>
                <div className={"calendario-main"}>
                  <div className={"calendario-header"}>
                    <div className={"calendario-mes"}>
                      <button
                        className={"btn-mes"}
                        onClick={(event) => {
                          handlers.mudarMes(-1);
                        }}
                      >
                        <i className={"fas fa-chevron-left"}></i>
                      </button>
                      <h2 id={"mesAtual"}>
                        <LoadingValue
                          slot="dashboard/dashboardCalendario:3"
                          width="10ch"
                          known={false}
                          value={new Date(
                            filtros.ano,
                            filtros.mes - 1,
                          ).toLocaleDateString("pt-BR", {
                            month: "long",
                            year: "numeric",
                          })}
                        />
                      </h2>
                      <button
                        className={"btn-mes"}
                        onClick={(event) => {
                          handlers.mudarMes(1);
                        }}
                      >
                        <i className={"fas fa-chevron-right"}></i>
                      </button>
                    </div>
                    <form
                      method={"GET"}
                      action={"/dashboard/calendario"}
                      id={"filtroForm"}
                    >
                      <input
                        type={"hidden"}
                        name={"mes"}
                        id={"mesInput"}
                        value={filtros.mes}
                      />
                      <input
                        type={"hidden"}
                        name={"ano"}
                        id={"anoInput"}
                        value={filtros.ano}
                      />
                      <input
                        type={"hidden"}
                        name={"turma"}
                        value={filtros.turma}
                      />
                    </form>
                  </div>
                  <div className={"calendario-grid"} id={"calendarioGrid"}>
                    {(() => {
                      const nodes = [];
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"DOM"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"SEG"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"TER"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"QUA"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"QUI"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"SEX"}
                        </div>,
                      );
                      nodes.push(
                        <div className={"dia-semana"} key={nodes.length}>
                          {"SÁB"}
                        </div>,
                      );
                      const inicioSemana = data.calendar.startWeek;
                      for (let i = 0; i < inicioSemana; i++) {
                        nodes.push(
                          <div
                            className={"dia-cell outro-mes"}
                            key={nodes.length}
                          ></div>,
                        );
                      }
                      for (const cell of data.calendar.days) {
                        const {
                          dia,
                          date: dataStr,
                          eventos: eventosDia,
                          feriados: feriadosDia,
                        } = cell;
                        nodes.push(
                          <div
                            className={"dia-cell"}
                            data-data={dataStr}
                            key={nodes.length}
                          >
                            <div className={"dia-numero"}>
                              <LoadingValue
                                slot="dashboard/dashboardCalendario:4"
                                width="12ch"
                                known={true}
                                value={dia}
                              />
                            </div>
                            <div className={"dia-eventos"}>
                              {(() => {
                                const nodes = [];
                                feriadosDia.forEach((f) => {
                                  nodes.push(
                                    <div
                                      className={"evento-item evento-feriado"}
                                      title={f.nome}
                                      key={nodes.length}
                                    >
                                      <i className={"fas fa-star"}></i>
                                      <LoadingValue
                                        slot="dashboard/dashboardCalendario:5"
                                        width="min(18ch, 100%)"
                                        known={false}
                                        value={f.nome}
                                      />
                                    </div>,
                                  );
                                });
                                eventosDia.forEach((e) => {
                                  nodes.push(
                                    <div
                                      className={"evento-item"}
                                      style={styleFrom("background: " + e.cor)}
                                      title={e.titulo}
                                      key={nodes.length}
                                    >
                                      <LoadingValue
                                        slot="dashboard/dashboardCalendario:6"
                                        width="min(18ch, 100%)"
                                        known={false}
                                        value={e.titulo}
                                      />
                                    </div>,
                                  );
                                });
                                return nodes;
                              })()}
                            </div>
                          </div>,
                        );
                      }
                      return nodes;
                    })()}
                  </div>
                </div>
                <div className={"calendario-sidebar"}>
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <h3
                        style={styleFrom("color: #fff; margin-bottom: 20px;")}
                        key={nodes.length}
                      >
                        {"FILTROS"}
                      </h3>,
                    );
                    nodes.push(
                      <div className={"filtros-calendario"} key={nodes.length}>
                        <div className={"filtro-group"}>
                          <label>{"TURMA"}</label>
                          <select
                            className={"filtro-select"}
                            onChange={(event) => {
                              handlers.filtrarTurma(event.currentTarget.value);
                            }}
                            defaultValue={
                              filtros.turma === "1º MÉDIO"
                                ? "1º MÉDIO"
                                : undefined
                            }
                          >
                            <option value={""}>{"TODAS AS TURMAS"}</option>
                            <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                            <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                            <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                            <option value={"9º FUNDAMENTAL"}>
                              {"9º FUNDAMENTAL"}
                            </option>
                          </select>
                        </div>
                      </div>,
                    );
                    nodes.push(
                      <h3
                        style={styleFrom("color: #fff; margin: 20px 0;")}
                        key={nodes.length}
                      >
                        {"LEGENDA"}
                      </h3>,
                    );
                    nodes.push(
                      <div className={"legenda-item"} key={nodes.length}>
                        <div
                          className={"legenda-cor"}
                          style={styleFrom("background: #ff0101;")}
                        ></div>
                        <span className={"legenda-texto"}>{"Feriados"}</span>
                      </div>,
                    );
                    tipos.forEach((t) => {
                      nodes.push(
                        <div className={"legenda-item"} key={nodes.length}>
                          <div
                            className={"legenda-cor"}
                            style={styleFrom("background: " + t.cor + ";")}
                          ></div>
                          <span className={"legenda-texto"}>
                            <LoadingValue
                              slot="dashboard/dashboardCalendario:7"
                              width="12ch"
                              known={false}
                              value={t.tipo}
                            />
                          </span>
                          <span className={"legenda-count"}>
                            <LoadingValue
                              slot="dashboard/dashboardCalendario:8"
                              width="3ch"
                              known={false}
                              value={t.total}
                            />
                          </span>
                        </div>,
                      );
                    });
                    nodes.push(
                      <button
                        className={"btn-secondary-dash"}
                        style={styleFrom(
                          "margin-top: 20px; width: 100%; height: 55px; text-align: center; align-items: center; justify-content: center;",
                        )}
                        onClick={(event) => {
                          handlers.abrirModalEvento();
                        }}
                        key={nodes.length}
                      >
                        <i className={"fas fa-plus"}></i>
                        {" NOVO EVENTO\n                "}
                      </button>,
                    );
                    nodes.push(
                      <button
                        className={"btn-secondary-dash"}
                        style={styleFrom(
                          "margin-top: 10px; width: 100%; height: 55px; text-align: center; align-items: center; justify-content: center;",
                        )}
                        onClick={(event) => {
                          handlers.abrirModalFeriado();
                        }}
                        key={nodes.length}
                      >
                        <i className={"fas fa-star"}></i>
                        {" NOVO FERIADO\n                "}
                      </button>,
                    );
                    nodes.push(
                      <h3
                        style={styleFrom("color: #fff; margin: 20px 0;")}
                        key={nodes.length}
                      >
                        {"PRÓXIMOS EVENTOS"}
                      </h3>,
                    );
                    nodes.push(
                      <div className={"eventos-lista"} key={nodes.length}>
                        {(() => {
                          const nodes = [];
                          const todosEventos = [
                            ...eventos.map((e) => ({
                              ...e,
                              tipo: "evento",
                            })),
                            ...feriados.map((f) => ({
                              id: `feriado-${f.id}`,
                              titulo: f.nome,
                              data_inicio: f.data,
                              data_fim: f.data,
                              cor: "#ff0101",
                              tipo: "feriado",
                              feriado_id: f.id,
                            })),
                          ]
                            .sort(
                              (a, b) =>
                                parseCalendarDate(a.data_inicio) -
                                parseCalendarDate(b.data_inicio),
                            )
                            .slice(0, 10);
                          todosEventos.forEach((e) => {
                            nodes.push(
                              <div
                                className={"evento-lista-item"}
                                key={nodes.length}
                              >
                                {(() => {
                                  const nodes = [];
                                  nodes.push(
                                    <div
                                      className={"evento-lista-cor"}
                                      style={styleFrom("background: " + e.cor)}
                                      key={nodes.length}
                                    ></div>,
                                  );
                                  nodes.push(
                                    <div
                                      className={"evento-lista-info"}
                                      key={nodes.length}
                                    >
                                      <div className={"evento-lista-titulo"}>
                                        {(() => {
                                          const nodes = [];
                                          nodes.push(
                                            <LoadingValue
                                              key={nodes.length}
                                              slot="dashboard/dashboardCalendario:9"
                                              width="min(18ch, 100%)"
                                              known={false}
                                              value={e.titulo}
                                            />,
                                          );
                                          if (e.tipo === "feriado") {
                                            nodes.push(
                                              <span
                                                style={styleFrom(
                                                  "color: #ff0101; font-size: 0.7rem;",
                                                )}
                                                key={nodes.length}
                                              >
                                                {"(FERIADO)"}
                                              </span>,
                                            );
                                          }
                                          return nodes;
                                        })()}
                                      </div>
                                      <div className={"evento-lista-data"}>
                                        <LoadingValue
                                          slot="dashboard/dashboardCalendario:10"
                                          width="10ch"
                                          known={false}
                                          value={parseCalendarDate(
                                            e.data_inicio,
                                          ).toLocaleDateString("pt-BR")}
                                        />
                                      </div>
                                    </div>,
                                  );
                                  if (userCargo === "Admin") {
                                    nodes.push(
                                      <button
                                        className={"evento-lista-remover"}
                                        onClick={(event) => {
                                          handlers.removerItem(
                                            e.tipo,
                                            e.feriado_id || e.id,
                                          );
                                        }}
                                        key={nodes.length}
                                      >
                                        <i className={"fas fa-times"}></i>
                                      </button>,
                                    );
                                  }
                                  return nodes;
                                })()}
                              </div>,
                            );
                          });
                          return nodes;
                        })()}
                      </div>,
                    );
                    return nodes;
                  })()}
                </div>
              </div>,
            );
            return nodes;
          })()}
        </LoadingElement>
        <div id={"eventoModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom("max-width: 450px; padding: 30px;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("eventoModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVO EVENTO\n        "}
            </h2>
            <div
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <button
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showEventTab("info");
                }}
                id={"btn-event-info"}
              >
                {"INFORMAÇÕES"}
              </button>
              <button
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showEventTab("data");
                }}
                id={"btn-event-data"}
              >
                {"AGENDAMENTO"}
              </button>
            </div>
            <form
              action={"/dashboard/calendario/evento"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div id={"eventInfoTab"} className={"tab-content active"}>
                <div className={"filter-options"}>
                  <label style={styleFrom("margin-top: 0;")}>{"TÍTULO"}</label>
                  <input
                    type={"text"}
                    name={"titulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"DESCRIÇÃO"}
                  </label>
                  <textarea
                    name={"descricao"}
                    className={"filter-input"}
                    rows={"5"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></textarea>
                </div>
              </div>
              <div
                id={"eventDataTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <div className={"filter-options"}>
                  <div
                    style={styleFrom(
                      "display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-top: 0;",
                    )}
                  >
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"CATEGORIA"}
                      </label>
                      <select
                        name={"tipo"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      >
                        <option value={"evento"}>{"Evento"}</option>
                        <option value={"prova"}>{"Prova"}</option>
                        <option value={"tarefa"}>{"Tarefa"}</option>
                        <option value={"reuniao"}>{"Reunião"}</option>
                        <option value={"feriado"}>{"Feriado"}</option>
                      </select>
                    </div>
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>{"COR"}</label>
                      <input
                        type={"color"}
                        name={"cor"}
                        className={"filter-input"}
                        style={styleFrom("padding: 5px; height: 42px;")}
                        defaultValue={"#ff0101"}
                      />
                    </div>
                  </div>
                  <div
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;",
                    )}
                  >
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"INÍCIO"}
                      </label>
                      <input
                        type={"date"}
                        name={"data_inicio"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      />
                    </div>
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"TÉRMINO"}
                      </label>
                      <input
                        type={"date"}
                        name={"data_fim"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </div>
                  </div>
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"TURMA ALVO"}
                  </label>
                  <select
                    name={"turma"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <option value={""}>{"GERAL / TODAS"}</option>
                    <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                    <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                    <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                    <option value={"9º FUNDAMENTAL"}>{"9º FUNDAMENTAL"}</option>
                  </select>
                </div>
              </div>
              <button
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <i className={"fas fa-save"}></i>
                {" SALVAR EVENTO\n            "}
              </button>
            </form>
          </div>
        </div>
        <div id={"feriadoModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom("max-width: 400px; padding: 30px;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("feriadoModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVO FERIADO\n        "}
            </h2>
            <form
              action={"/dashboard/calendario/feriado"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 5px; border-top: 1px solid var(--border-color); padding-top: 20px;",
              )}
            >
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div className={"filter-options"}>
                <label style={styleFrom("margin-top: 0;")}>
                  {"IDENTIFICAÇÃO"}
                </label>
                <input
                  type={"text"}
                  name={"nome"}
                  className={"filter-input"}
                  placeholder={"Nome do feriado"}
                  style={styleFrom("padding: 12px;")}
                  required={true}
                />
                <label style={styleFrom("margin-top: 15px;")}>{"DATA"}</label>
                <input
                  type={"date"}
                  name={"data"}
                  className={"filter-input"}
                  style={styleFrom("padding: 12px;")}
                  required={true}
                />
                <label
                  style={styleFrom(
                    "display:flex; align-items:center; gap:10px; cursor:pointer; background: var(--bg-secondary); padding: 12px; border-radius: 12px; margin-top: 20px;",
                  )}
                >
                  <input
                    type={"checkbox"}
                    name={"recorrente"}
                    defaultValue={"true"}
                    style={styleFrom(
                      "width:16px; height:16px; accent-color: var(--primary-red);",
                    )}
                  />
                  <span
                    style={styleFrom(
                      "color:var(--text-white); font-size: 0.75rem;",
                    )}
                  >
                    {"REPETIR TODOS OS ANOS"}
                  </span>
                </label>
              </div>
              <button
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <i className={"fas fa-calendar-check"}></i>
                {" REGISTRAR FERIADO\n            "}
              </button>
            </form>
          </div>
        </div>
        <PageDataScript type="application/json" id="dashboard-calendario-data">
          {String(
            safeJson({
              mes: filtros.mes,
              ano: filtros.ano,
            }),
          )}
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
    filtros = {
      mes: 1,
      ano: 2026,
      turma: "",
    },
    eventos = [],
    feriados = [],
    tipos = [],
    csrfToken = null,
  } = data;
  return (
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"\n                    Calendário Escolar\n                "}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardCalendario:11"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </strong>
            </span>
            <span className={"user-role"} style={styleFrom("color: #888888;")}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardCalendario:12"
                  width="12ch"
                  known={true}
                  value={userCargo}
                />
              </strong>
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
    </header>
  );
}
