import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoCompetencias({
  data,
  handlers
}) {
  const {
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    stats = {},
    competencias = []
  } = data;
  return <>
      <React.Fragment>
        {(() => {
        const nodes = [];
        nodes.push(<Partials_barAluno data={{
          ...data
        }} handlers={handlers} key={nodes.length} />);
        nodes.push(<div className={"main-layout"} key={nodes.length}>
              <PageHeader key="page-header" data={data} handlers={handlers} />
              <main className={"dash-content"}>
                {(() => {
              const nodes = [];
              nodes.push(<section className={"welcome-banner"} style={styleFrom("background: linear-gradient(90deg, #1b5e38 0%, #217346 100%); padding: 40px;")} key={nodes.length}>
                      <div className={"banner-text"}>
                        <h1>
                          <i className={"fas fa-medal"}></i>
                          {" Relatório de Competências"}
                        </h1>
                        <p>
                          {"Filtre, analise e acompanhe o detalhamento de cada habilidade avaliada pelos seus professores."}
                        </p>
                      </div>
                    </section>);
              nodes.push(<section className={"section-container"} key={nodes.length}>
                      <div className={"dash-grid"}>
                        <div className={"stats-card"}>
                          <h3>{"TOTAL AVALIADAS"}</h3>
                          <p className={"stats-number"}>{stats.total || 0}</p>
                        </div>
                        <div className={"stats-card apto"}>
                          <h3>{"APTAS"}</h3>
                          <p className={"stats-number"}>{stats.aptas || 0}</p>
                        </div>
                        <div className={"stats-card desenvolvimento"}>
                          <h3>{"EM DESENVOLVIMENTO"}</h3>
                          <p className={"stats-number"}>
                            {stats.desenvolvimento || 0}
                          </p>
                        </div>
                        <div className={"stats-card inapto"}>
                          <h3>{"INAPTAS"}</h3>
                          <p className={"stats-number"}>{stats.inaptas || 0}</p>
                        </div>
                      </div>
                    </section>);
              nodes.push(<section className={"section-container"} key={nodes.length}>
                      <div className={"stats-card"} style={styleFrom("padding: 25px; display: flex; flex-direction: column; gap: 15px; justify-content: space-between;")}>
                        <div style={styleFrom("display: flex; gap: 15px; flex-wrap: wrap; align-items: center; flex: 1; justify-content: space-between;")}>
                          <input type={"text"} id={"searchInput"} style={styleFrom("flex: 2; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width:50%;")} placeholder={"Pesquisar competência..."} />
                          <select id={"categoriaFilter"} style={styleFrom("flex: 1; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width: 25%")}>
                            <option value={""}>{"TODAS CATEGORIAS"}</option>
                            <option value={"Técnica"}>{"TÉCNICA"}</option>
                            <option value={"Comportamental"}>
                              {"COMPORTAMENTAL"}
                            </option>
                            <option value={"Cognitiva"}>{"COGNITIVA"}</option>
                          </select>
                          <select id={"nivelFilter"} style={styleFrom("flex: 1; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width: 25%;")}>
                            <option value={""}>{"TODOS OS NÍVEIS"}</option>
                            <option value={"apto"}>{"APTO"}</option>
                            <option value={"desenvolvimento"}>
                              {"DESENVOLVIMENTO"}
                            </option>
                            <option value={"inapto"}>{"INAPTO"}</option>
                          </select>
                        </div>
                        <div style={styleFrom("display: flex; gap: 15px;")}>
                          <button onClick={event => {
                      handlers.aplicarFiltros();
                    }} className={"btn-secondary-dash"} style={styleFrom("height: 50px;")}>
                            <i className={"fas fa-filter"}></i>
                            {" FILTRAR\n                        "}
                          </button>
                          <button onClick={event => {
                      handlers.limparFiltros();
                    }} className={"btn-secondary-dash"} style={styleFrom("height: 50px;")}>
                            <i className={"fas fa-times"}></i>
                          </button>
                        </div>
                      </div>
                    </section>);
              nodes.push(<section className={"section-container"} key={nodes.length}>
                      {(() => {
                  const nodes = [];
                  nodes.push(<div style={styleFrom("display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;")} key={nodes.length}>
                            <h2 className={"section-title-2"} style={styleFrom("margin-bottom: 0;")}>
                              {"DETALHAMENTO"}
                            </h2>
                            <select id={"ordenarSelect"} onChange={event => {
                      handlers.ordenarCompetencias();
                    }} style={styleFrom("background: var(--card-bg); border: 1px solid var(--border-color); padding: 8px 15px; border-radius: 8px; color: #888; font-size: 0.8rem;")}>
                              <option value={"data_desc"}>
                                {"MAIS RECENTES"}
                              </option>
                              <option value={"nome_asc"}>{"A-Z"}</option>
                            </select>
                          </div>);
                  if (competencias && competencias.length > 0) {
                    nodes.push(<div className={"dash-grid"} id={"competenciasGrid"} key={nodes.length}>
                              {(() => {
                        const nodes = [];
                        competencias.forEach(comp => {
                          let notaNum = parseFloat(comp.nota) || 0;
                          let statusClass = comp.gradeClass;
                          nodes.push(<div className={"stats-card " + statusClass} data-nome={comp.nome.toLowerCase()} data-categoria={comp.categoria || ""} data-nivel={statusClass} data-nota={notaNum} data-data={comp.data_registro} style={styleFrom("padding: 25px; border-left: 6px solid var(--color-" + statusClass + ");")} key={nodes.length}>
                                      {(() => {
                              const nodes = [];
                              nodes.push(<div style={styleFrom("display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;")} key={nodes.length}>
                                            <div>
                                              <h3 style={styleFrom("color: var(--text-white); font-size: 1.1rem; margin-bottom: 5px;")}>
                                                {comp.nome}
                                              </h3>
                                              <span style={styleFrom("font-size: 0.7rem; color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px;")}>
                                                <i className={"fas fa-tag"}></i>
                                                {comp.categoria || "GERAL"}
                                              </span>
                                            </div>
                                            <span className={"media-nota " + statusClass} style={styleFrom("font-size: 1.2rem; padding: 5px 15px;")}>
                                              {notaNum.toFixed(1)}
                                            </span>
                                          </div>);
                              nodes.push(<p style={styleFrom("font-size: 0.85rem; color: var(--text-gray); line-height: 1.5; margin-bottom: 15px;")} key={nodes.length}>
                                            {comp.descricao || "Sem descrição disponível."}
                                          </p>);
                              if (comp.observacoes) {
                                nodes.push(<div style={styleFrom("background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; margin-bottom: 15px;")} key={nodes.length}>
                                              <p style={styleFrom("font-size: 0.8rem; color: #aaa; font-style: italic;")}>
                                                <i className={"fas fa-quote-left"} style={styleFrom("color: var(--color-" + statusClass + ");")}></i>
                                                {comp.observacoes}
                                              </p>
                                            </div>);
                              }
                              nodes.push(<div style={styleFrom("border-top: 1px solid var(--border-soft); padding-top: 15px; font-size: 0.75rem; color: var(--text-muted);")} key={nodes.length}>
                                            <i className={"far fa-calendar-alt"}></i>
                                            {comp.data_formatada}
                                          </div>);
                              return nodes;
                            })()}
                                    </div>);
                        });
                        return nodes;
                      })()}
                            </div>);
                  } else {
                    nodes.push(<div className={"stats-card"} style={styleFrom("text-align: center; padding: 80px;")} key={nodes.length}>
                              <i className={"fas fa-clipboard-list"} style={styleFrom("font-size: 4rem; color: var(--border-color); margin-bottom: 20px;")}></i>
                              <h3>{"Nenhuma competência avaliada"}</h3>
                            </div>);
                  }
                  return nodes;
                })()}
                    </section>);
              if (competencias && competencias.length > 0) {
                nodes.push(<section className={"section-container"} key={nodes.length}>
                        <div className={"stats-card"}>
                          <h2 className={"section-title-2"} style={styleFrom("margin-bottom: 20px;")}>
                            {"DESEMPENHO POR HABILIDADE"}
                          </h2>
                          <div style={styleFrom("height: 300px; position: relative;")}>
                            <canvas id={"competenciasChart"}></canvas>
                          </div>
                        </div>
                      </section>);
              }
              return nodes;
            })()}
              </main>
              <footer className={"dash-footer"}>
                <div className={"footer-actions"}>
                  <a href={"/aluno"} className={"btn-secondary-dash"}>
                    <i className={"fas fa-arrow-left"}></i>
                    {" VOLTAR AO PAINEL\n                "}
                  </a>
                </div>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI"}</p>
                </div>
              </footer>
            </div>);
        if (competencias && competencias.length > 0) {
          nodes.push(<script type="application/json" id="aluno-competencias-data" key={nodes.length}>
                {String(safeJson(competencias))}
              </script>);
        }
        return nodes;
      })()}
      </React.Fragment>
    </>;
}
export function PageHeader({
  data,
  handlers
}) {
  const {
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    stats = {},
    competencias = []
  } = data;
  return <header className={"dash-header"}>
                <div className={"header-left"}>
                  <div className={"logo"}>
                    <img src={"/images/logo3-green.png"} alt={"AnalisAI"} style={styleFrom("height: 40px;")} />
                  </div>
                </div>
                <div className={"header-user"}>
                  <div className={"user-profile-group"}>
                    <div className={"user-avatar"} style={styleFrom("background: var(--color-apto);")}>
                      {aluno.nome.charAt(0).toUpperCase()}
                    </div>
                    <div className={"user-details"}>
                      <span className={"user-name"}>
                        <strong>{aluno.nome}</strong>
                      </span>
                      <span className={"user-email"}>{aluno.ano_escolar}</span>
                    </div>
                  </div>
                  <div className={"header-actions"}>
                    <Partials_notificacoes data={{
          ...data,
          ...{
            notificacaoClasse: "header-icon"
          }
        }} handlers={handlers} />
                  </div>
                </div>
              </header>;
}
