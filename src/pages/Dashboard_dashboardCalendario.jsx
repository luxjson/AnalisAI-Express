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
                <LoadingElement
                  as="div"
                  className={"alert alert-success"}
                  key={nodes.length}
                >
                  <LoadingValue
                    slot="dashboard/dashboardCalendario:1"
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
                    slot="dashboard/dashboardCalendario:2"
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
              <LoadingElement
                as="div"
                className={"calendario-container"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"calendario-main"}>
                  <LoadingElement as="div" className={"calendario-header"}>
                    <LoadingElement as="div" className={"calendario-mes"}>
                      <LoadingElement
                        as="button"
                        className={"btn-mes"}
                        onClick={(event) => {
                          handlers.mudarMes(-1);
                        }}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-chevron-left"}
                        ></LoadingElement>
                      </LoadingElement>
                      <LoadingElement as="h2" id={"mesAtual"}>
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
                      </LoadingElement>
                      <LoadingElement
                        as="button"
                        className={"btn-mes"}
                        onClick={(event) => {
                          handlers.mudarMes(1);
                        }}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-chevron-right"}
                        ></LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="form"
                      method={"GET"}
                      action={"/dashboard/calendario"}
                      id={"filtroForm"}
                    >
                      <LoadingElement
                        as="input"
                        type={"hidden"}
                        name={"mes"}
                        id={"mesInput"}
                        value={filtros.mes}
                      />
                      <LoadingElement
                        as="input"
                        type={"hidden"}
                        name={"ano"}
                        id={"anoInput"}
                        value={filtros.ano}
                      />
                      <LoadingElement
                        as="input"
                        type={"hidden"}
                        name={"turma"}
                        value={filtros.turma}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"calendario-grid"}
                    id={"calendarioGrid"}
                  >
                    {(() => {
                      const nodes = [];
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"DOM"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"SEG"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"TER"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"QUA"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"QUI"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"SEX"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dia-semana"}
                          key={nodes.length}
                        >
                          {"SÁB"}
                        </LoadingElement>,
                      );
                      const inicioSemana = data.calendar.startWeek;
                      for (let i = 0; i < inicioSemana; i++) {
                        nodes.push(
                          <LoadingElement
                            as="div"
                            className={"dia-cell outro-mes"}
                            key={nodes.length}
                          ></LoadingElement>,
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
                          <LoadingElement
                            as="div"
                            className={"dia-cell"}
                            data-data={dataStr}
                            key={nodes.length}
                          >
                            <LoadingElement as="div" className={"dia-numero"}>
                              <LoadingValue
                                slot="dashboard/dashboardCalendario:4"
                                width="12ch"
                                known={true}
                                value={dia}
                              />
                            </LoadingElement>
                            <LoadingElement as="div" className={"dia-eventos"}>
                              {(() => {
                                const nodes = [];
                                feriadosDia.forEach((f) => {
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
                                      className={"evento-item evento-feriado"}
                                      title={f.nome}
                                      key={nodes.length}
                                    >
                                      <LoadingElement
                                        as="i"
                                        className={"fas fa-star"}
                                      ></LoadingElement>
                                      <LoadingValue
                                        slot="dashboard/dashboardCalendario:5"
                                        width="min(18ch, 100%)"
                                        known={false}
                                        value={f.nome}
                                      />
                                    </LoadingElement>,
                                  );
                                });
                                eventosDia.forEach((e) => {
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
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
                                    </LoadingElement>,
                                  );
                                });
                                return nodes;
                              })()}
                            </LoadingElement>
                          </LoadingElement>,
                        );
                      }
                      return nodes;
                    })()}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"calendario-sidebar"}>
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <LoadingElement
                        as="h3"
                        style={styleFrom("color: #fff; margin-bottom: 20px;")}
                        key={nodes.length}
                      >
                        {"FILTROS"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"filtros-calendario"}
                        key={nodes.length}
                      >
                        <LoadingElement as="div" className={"filtro-group"}>
                          <LoadingElement as="label">{"TURMA"}</LoadingElement>
                          <LoadingElement
                            as="select"
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
                            <LoadingElement as="option" value={""}>
                              {"TODAS AS TURMAS"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"1º MÉDIO"}>
                              {"1º MÉDIO"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"2º MÉDIO"}>
                              {"2º MÉDIO"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"3º MÉDIO"}>
                              {"3º MÉDIO"}
                            </LoadingElement>
                            <LoadingElement
                              as="option"
                              value={"9º FUNDAMENTAL"}
                            >
                              {"9º FUNDAMENTAL"}
                            </LoadingElement>
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="h3"
                        style={styleFrom("color: #fff; margin: 20px 0;")}
                        key={nodes.length}
                      >
                        {"LEGENDA"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"legenda-item"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="div"
                          className={"legenda-cor"}
                          style={styleFrom("background: #ff0101;")}
                        ></LoadingElement>
                        <LoadingElement as="span" className={"legenda-texto"}>
                          {"Feriados"}
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    tipos.forEach((t) => {
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"legenda-item"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="div"
                            className={"legenda-cor"}
                            style={styleFrom("background: " + t.cor + ";")}
                          ></LoadingElement>
                          <LoadingElement as="span" className={"legenda-texto"}>
                            <LoadingValue
                              slot="dashboard/dashboardCalendario:7"
                              width="12ch"
                              known={false}
                              value={t.tipo}
                            />
                          </LoadingElement>
                          <LoadingElement as="span" className={"legenda-count"}>
                            <LoadingValue
                              slot="dashboard/dashboardCalendario:8"
                              width="3ch"
                              known={false}
                              value={t.total}
                            />
                          </LoadingElement>
                        </LoadingElement>,
                      );
                    });
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"btn-secondary-dash"}
                        style={styleFrom(
                          "margin-top: 20px; width: 100%; height: 55px; text-align: center; align-items: center; justify-content: center;",
                        )}
                        onClick={(event) => {
                          handlers.abrirModalEvento();
                        }}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-plus"}
                        ></LoadingElement>
                        {" NOVO EVENTO\n                "}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"btn-secondary-dash"}
                        style={styleFrom(
                          "margin-top: 10px; width: 100%; height: 55px; text-align: center; align-items: center; justify-content: center;",
                        )}
                        onClick={(event) => {
                          handlers.abrirModalFeriado();
                        }}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-star"}
                        ></LoadingElement>
                        {" NOVO FERIADO\n                "}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="h3"
                        style={styleFrom("color: #fff; margin: 20px 0;")}
                        key={nodes.length}
                      >
                        {"PRÓXIMOS EVENTOS"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"eventos-lista"}
                        key={nodes.length}
                      >
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
                              <LoadingElement
                                as="div"
                                className={"evento-lista-item"}
                                key={nodes.length}
                              >
                                {(() => {
                                  const nodes = [];
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
                                      className={"evento-lista-cor"}
                                      style={styleFrom("background: " + e.cor)}
                                      key={nodes.length}
                                    ></LoadingElement>,
                                  );
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
                                      className={"evento-lista-info"}
                                      key={nodes.length}
                                    >
                                      <LoadingElement
                                        as="div"
                                        className={"evento-lista-titulo"}
                                      >
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
                                              <LoadingElement
                                                as="span"
                                                style={styleFrom(
                                                  "color: #ff0101; font-size: 0.7rem;",
                                                )}
                                                key={nodes.length}
                                              >
                                                {"(FERIADO)"}
                                              </LoadingElement>,
                                            );
                                          }
                                          return nodes;
                                        })()}
                                      </LoadingElement>
                                      <LoadingElement
                                        as="div"
                                        className={"evento-lista-data"}
                                      >
                                        <LoadingValue
                                          slot="dashboard/dashboardCalendario:10"
                                          width="10ch"
                                          known={false}
                                          value={parseCalendarDate(
                                            e.data_inicio,
                                          ).toLocaleDateString("pt-BR")}
                                        />
                                      </LoadingElement>
                                    </LoadingElement>,
                                  );
                                  if (userCargo === "Admin") {
                                    nodes.push(
                                      <LoadingElement
                                        as="button"
                                        className={"evento-lista-remover"}
                                        onClick={(event) => {
                                          handlers.removerItem(
                                            e.tipo,
                                            e.feriado_id || e.id,
                                          );
                                        }}
                                        key={nodes.length}
                                      >
                                        <LoadingElement
                                          as="i"
                                          className={"fas fa-times"}
                                        ></LoadingElement>
                                      </LoadingElement>,
                                    );
                                  }
                                  return nodes;
                                })()}
                              </LoadingElement>,
                            );
                          });
                          return nodes;
                        })()}
                      </LoadingElement>,
                    );
                    return nodes;
                  })()}
                </LoadingElement>
              </LoadingElement>,
            );
            return nodes;
          })()}
        </LoadingElement>
        <LoadingElement as="div" id={"eventoModal"} className={"modal-overlay"}>
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom("max-width: 450px; padding: 30px;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("eventoModal");
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
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVO EVENTO\n        "}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showEventTab("info");
                }}
                id={"btn-event-info"}
              >
                {"INFORMAÇÕES"}
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showEventTab("data");
                }}
                id={"btn-event-data"}
              >
                {"AGENDAMENTO"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="form"
              action={"/dashboard/calendario/evento"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement
                as="div"
                id={"eventInfoTab"}
                className={"tab-content active"}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 0;")}
                  >
                    {"TÍTULO"}
                  </LoadingElement>
                  <LoadingElement
                    as="input"
                    type={"text"}
                    name={"titulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"DESCRIÇÃO"}
                  </LoadingElement>
                  <LoadingElement
                    as="textarea"
                    name={"descricao"}
                    className={"filter-input"}
                    rows={"5"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"eventDataTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-top: 0;",
                    )}
                  >
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"CATEGORIA"}
                      </LoadingElement>
                      <LoadingElement
                        as="select"
                        name={"tipo"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      >
                        <LoadingElement as="option" value={"evento"}>
                          {"Evento"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"prova"}>
                          {"Prova"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"tarefa"}>
                          {"Tarefa"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"reuniao"}>
                          {"Reunião"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"feriado"}>
                          {"Feriado"}
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"COR"}
                      </LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"color"}
                        name={"cor"}
                        className={"filter-input"}
                        style={styleFrom("padding: 5px; height: 42px;")}
                        defaultValue={"#ff0101"}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;",
                    )}
                  >
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"INÍCIO"}
                      </LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"date"}
                        name={"data_inicio"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      />
                    </LoadingElement>
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"TÉRMINO"}
                      </LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"date"}
                        name={"data_fim"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"TURMA ALVO"}
                  </LoadingElement>
                  <LoadingElement
                    as="select"
                    name={"turma"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <LoadingElement as="option" value={""}>
                      {"GERAL / TODAS"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"1º MÉDIO"}>
                      {"1º MÉDIO"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"2º MÉDIO"}>
                      {"2º MÉDIO"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"3º MÉDIO"}>
                      {"3º MÉDIO"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"9º FUNDAMENTAL"}>
                      {"9º FUNDAMENTAL"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-save"}
                ></LoadingElement>
                {" SALVAR EVENTO\n            "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"feriadoModal"}
          className={"modal-overlay"}
        >
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom("max-width: 400px; padding: 30px;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("feriadoModal");
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
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVO FERIADO\n        "}
            </LoadingElement>
            <LoadingElement
              as="form"
              action={"/dashboard/calendario/feriado"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 5px; border-top: 1px solid var(--border-color); padding-top: 20px;",
              )}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement as="div" className={"filter-options"}>
                <LoadingElement as="label" style={styleFrom("margin-top: 0;")}>
                  {"IDENTIFICAÇÃO"}
                </LoadingElement>
                <LoadingElement
                  as="input"
                  type={"text"}
                  name={"nome"}
                  className={"filter-input"}
                  placeholder={"Nome do feriado"}
                  style={styleFrom("padding: 12px;")}
                  required={true}
                />
                <LoadingElement
                  as="label"
                  style={styleFrom("margin-top: 15px;")}
                >
                  {"DATA"}
                </LoadingElement>
                <LoadingElement
                  as="input"
                  type={"date"}
                  name={"data"}
                  className={"filter-input"}
                  style={styleFrom("padding: 12px;")}
                  required={true}
                />
                <LoadingElement
                  as="label"
                  style={styleFrom(
                    "display:flex; align-items:center; gap:10px; cursor:pointer; background: var(--bg-secondary); padding: 12px; border-radius: 12px; margin-top: 20px;",
                  )}
                >
                  <LoadingElement
                    as="input"
                    type={"checkbox"}
                    name={"recorrente"}
                    defaultValue={"true"}
                    style={styleFrom(
                      "width:16px; height:16px; accent-color: var(--primary-red);",
                    )}
                  />
                  <LoadingElement
                    as="span"
                    style={styleFrom(
                      "color:var(--text-white); font-size: 0.75rem;",
                    )}
                  >
                    {"REPETIR TODOS OS ANOS"}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-calendar-check"}
                ></LoadingElement>
                {" REGISTRAR FERIADO\n            "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
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
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Calendário Escolar\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardCalendario:11"
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
                  slot="dashboard/dashboardCalendario:12"
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
