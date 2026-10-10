import React from 'react';
import { ProfessorChatWelcome, StudentChatWelcome } from './ChatWelcome';
export function Skeleton({
  width = '100%',
  height = '1rem',
  className = ''
}) {
  return <span aria-hidden="true" className={'skeleton-shape ' + className} style={{
    width,
    height
  }} />;
}
const lines = (count = 3) => Array.from({
  length: count
}, (_, i) => <Skeleton key={i} width={i === count - 1 ? '65%' : '100%'} />);
function Stats({
  labels,
  group = 'dash-grid',
  card = 'stats-card'
}) {
  const status = {
    APTOS: 'apto',
    APTAS: 'apto',
    INAPTOS: 'inapto',
    INAPTAS: 'inapto',
    'EM DESENVOLVIMENTO': 'desenvolvimento',
    PENDENTES: 'desenvolvimento',
    CONCLUÍDAS: 'apto',
    ATRASADAS: 'inapto'
  };
  return <div className={group}>{labels.map(label => <div key={label} className={card === 'stats-card' ? card + ' ' + (status[label] || '') : card} data-skeleton-card>{card === 'stat-card' ? <><div className="stat-icon"><Skeleton width="1.5rem" height="1.5rem" /></div><div className="stat-info"><h3><Skeleton width="3rem" height="2rem" /></h3><p>{label}</p></div></> : <><h3>{label}</h3><p className="stats-number"><Skeleton width="4.5rem" height="2rem" /></p></>}</div>)}</div>;
}
function ChartCard({
  className = 'stats-card',
  ring = false
}) {
  return <div className={className} data-skeleton-card><Skeleton width="55%" /><div className={'skeleton-chart ' + (ring ? 'skeleton-chart-ring' : '')} aria-hidden="true">{ring ? <Skeleton className="skeleton-ring" width="12rem" height="12rem" /> : Array.from({
        length: 7
      }, (_, i) => <Skeleton key={i} width="9%" height={[45, 70, 52, 90, 60, 80, 55][i] + '%'} />)}</div></div>;
}
function Table({
  columns = ["ID", "ALUNO", "ANO ESCOLAR", "IDADE", "MÉDIA DE NOTAS", "PRESENÇA (%)", "NÍVEL", "AÇÕES"]
}) {
  return <div className="table-container"><table className="alunos-table"><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{Array.from({
          length: 5
        }, (_, i) => <tr key={i}>{columns.map((c, j) => <td key={c}><Skeleton width={j === 0 ? '80%' : '65%'} /></td>)}</tr>)}</tbody></table></div>;
}
function Toolbar() {
  return <div className="toolbar"><div className="action-buttons"><Skeleton width="10rem" height="2.5rem" /><Skeleton width="9rem" height="2.5rem" /></div><div className="search-container"><Skeleton width="100%" height="2.5rem" /></div></div>;
}
function Profile({
  professor = false
}) {
  return <div className="perfil-grid"><aside className="perfil-sidebar-card"><div className="avatar-circle"><Skeleton className="skeleton-avatar" width="100%" height="100%" /></div><div className="perfil-info-base">{lines(2)}</div><div className="perfil-stats-row">{[0, 1].map(i => <div key={i} className="stat-item"><Skeleton width="4rem" /><Skeleton width="2rem" height="2rem" /></div>)}</div></aside><div className="perfil-main"><nav className={professor ? 'tabs-container' : 'tabs-nav'}>{Array.from({
          length: professor ? 3 : 2
        }, (_, i) => <Skeleton key={i} width="9rem" height="2.5rem" />)}</nav><div className="tab-content active"><div className="info-grid">{Array.from({
            length: 3
          }, (_, i) => <div className="info-display-item" key={i}>{lines(2)}</div>)}</div></div></div></div>;
}
function Calendar() {
  return <div className="calendario-container"><div className="calendario-main"><div className="calendario-header"><Skeleton width="12rem" height="2rem" /></div><div className="calendario-grid">{['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(day => <div key={day} className="dia-semana">{day}</div>)}{Array.from({
          length: 35
        }, (_, i) => <div className="dia-cell" key={i}><Skeleton width="1rem" />{i % 4 === 0 && <Skeleton height="1.6rem" />}</div>)}</div></div><aside className="calendario-sidebar"><div className="filtros-calendario"><h3>FILTROS</h3>{lines(4)}</div><div className="filtros-calendario"><h3>PRÓXIMOS EVENTOS</h3>{lines(5)}</div></aside></div>;
}
const titles = {
  'dashboard/dashboardMain': 'Dashboard',
  'dashboard/dashboardEdit': 'Editor de Notas',
  'dashboard/dashboardGraficos': 'Relatorios',
  'dashboard/dashboardTarefas': 'Tarefas',
  'dashboard/dashboardCalendario': 'Calendário',
  'dashboard/dashboardUsuarios': 'Usuários',
  'dashboard/dashboardSolicitacoes': 'Solicitações de senha',
  'dashboard/dashboardConfig': 'Configurações',
  'aluno/alunoDashboard': 'Meu desempenho',
  'aluno/alunoCompetencias': 'Competências',
  'aluno/alunoEvolucao': 'Evolução',
  'aluno/alunoTarefas': 'Tarefas',
  'aluno/alunoPerfil': 'Configurações do Estudante'
};
function Content({
  view
}) {
  if (['aluno/alunoDashboard', 'aluno/alunoCompetencias', 'aluno/alunoTarefas'].includes(view)) return <StudentContent view={view} />;
  if (view.endsWith('IA')) return null;
  if (view === 'manuais') return <main className="cards">{['Manual do Professor', 'Manual do Aluno'].map(title => <div className="card" key={title}><h1 className="title">{title}</h1><Skeleton height="3rem" /></div>)}</main>;
  if (view === 'manualDoAluno' || view === 'manualDoProfessor') return <><div className="pdf-header"><Skeleton width="9rem" height="2.5rem" /></div><div className="pdf-container"><Skeleton height="70vh" /></div></>;
  if (view === 'dashboard/dashboardMain') return <main className="dash-content"><section className="welcome-banner"><div className="banner-text"><Skeleton width="24rem" height="2rem" /><p>Acompanhe o desempenho das turmas e gerencie as competências de forma simples.</p></div></section>{['ENSINO MÉDIO', 'ENSINO FUNDAMENTAL'].map(level => <section key={level} className="section-container"><h2 className="section-title-2">{level}</h2><Stats labels={['TOTAL DE ALUNOS', 'APTOS', 'INAPTOS', 'EM DESENVOLVIMENTO']} /></section>)}<section className="section-container"><h2 className="section-title-2">RANKING GERAL</h2><div className="ranking-list">{[0, 1, 2, 3, 4].map(i => <div key={i} className="ranking-item"><Skeleton width="2rem" height="2rem" /><Skeleton width="70%" /></div>)}</div></section></main>;
  if (view.includes('Calendario')) return <Calendar />;
  if (view.includes('Perfil') || view.includes('Config')) return <div className="dash-content"><Profile professor={view.includes('Config')} /></div>;
  if (view.includes('Usuarios')) return <><Toolbar /><div className="edit-content"><Table columns={['ID', 'NOME', 'E-MAIL', 'CARGO', 'STATUS', 'AÇÕES']} /></div></>;
  if (view.includes('Edit')) return <><Toolbar /><div className="edit-content"><Table /></div><section className="section-container"><h3>SITUAÇÃO DO ALUNO</h3><div className="dash-grid"><ChartCard ring /><ChartCard /></div></section></>;
  if (view.includes('Solicitacoes')) return <div className="dash-content"><div className="solicitacoes-grid">{[0, 1, 2].map(i => <div key={i} className="solicitacao-card" data-skeleton-card>{lines(3)}<Skeleton height="2.5rem" /></div>)}</div></div>;
  if (view === 'dashboard/dashboardTarefas') return <><div className="tarefas-header"><Skeleton width="12rem" height="3rem" /></div><Stats labels={['Total de Tarefas', 'Tarefas Ativas', 'Atrasadas']} group="tarefas-stats" card="stat-card" /><div className="filtros-tarefas">{[0, 1, 2].map(i => <Skeleton key={i} height="2.5rem" />)}</div><div className="tarefas-grid">{[0, 1, 2].map(i => <div key={i} className="tarefa-card" data-skeleton-card>{lines(4)}<Skeleton height="2.5rem" /></div>)}</div></>;
  if (view.includes('Graficos')) return <div className="dash-content graficos-grid"><p className="section-label">SITUAÇÃO DOS ALUNOS</p><div className="row-triple">{[0, 1, 2].map(i => <ChartCard key={i} ring className="dash-card card-grafico" />)}</div><p className="section-label">DESEMPENHO MÉDIO — ENSINO MÉDIO</p><ChartCard className="dash-card card-grafico-large" /><p className="section-label">DESEMPENHO MÉDIO — ENSINO FUNDAMENTAL</p><ChartCard className="dash-card card-grafico-small" /></div>;
  if (view === 'aluno/alunoEvolucao') return <div className="dash-content"><div className="welcome-banner"><div className="banner-text"><h2>Sua Jornada Acadêmica</h2><Skeleton width="60%" /></div></div><div className="filter-bar"><Skeleton width="15rem" height="2.5rem" /></div><section className="section-container"><h3 className="section-title-2">Desempenho Temporal</h3><ChartCard /></section><section className="section-container"><h3 className="section-title-2">Performance por Área de Conhecimento</h3><div className="dash-grid">{[0, 1, 2].map(i => <ChartCard key={i} />)}</div></section></div>;
  let labels = ['TOTAL DE ALUNOS', 'APTOS', 'INAPTOS', 'EM DESENVOLVIMENTO'];
  if (view === 'aluno/alunoDashboard') labels = ['MATRÍCULA', 'MÉDIA GERAL', 'PRESENÇA'];
  if (view === 'aluno/alunoCompetencias') labels = ['TOTAL AVALIADAS', 'APTAS', 'EM DESENVOLVIMENTO', 'INAPTAS'];
  if (view === 'aluno/alunoTarefas') labels = ['TOTAL', 'PENDENTES', 'AGUARDANDO', 'CONCLUÍDAS', 'ATRASADAS'];
  return <div className="dash-content"><div className="welcome-banner"><div className="banner-text"><Skeleton width="16rem" height="2rem" /><Skeleton width="80%" /></div></div><section className="section-container"><Stats labels={labels} /></section><section className="section-container"><h3 className="section-title-2">{view.includes('Tarefas') ? 'LISTA DE ATIVIDADES' : view.includes('Competencias') ? 'DETALHAMENTO' : 'RESUMO DE PERFORMANCE'}</h3>{view.includes('Tarefas') ? <div className="dash-grid">{[0, 1, 2].map(i => <div className="stats-card" key={i}>{lines(4)}</div>)}</div> : <div className="ranking-list">{[0, 1, 2, 3].map(i => <div key={i} className="ranking-item"><Skeleton width="2rem" height="2rem" /><Skeleton width="70%" /></div>)}</div>}</section></div>;
}
export function SidebarSkeleton() {
  return <nav className="sidebar skeleton-sidebar" aria-hidden="true"><Skeleton width="2.8rem" height="2.5rem" />{[0, 1, 2, 3, 4, 5].map(i => <div key={i}><Skeleton width="1.7rem" height="1.7rem" /><Skeleton width="3.5rem" height=".7rem" /></div>)}</nav>;
}
export default function PageSkeleton({
  view,
  Header,
  data,
  handlers
}) {
  const status = <span className="skeleton-status" role="status">Preparando página…</span>;
  if (view === 'index') return <div className="main-layout skeleton-route" aria-busy="true"><div className="home-content-wrapper" inert><div>{Header && <Header data={data} handlers={handlers} />}</div><section className="welcome-banner" style={{
        padding: '100px 60px',
        borderRadius: 30,
        marginBottom: 80,
        position: 'relative'
      }}><div className="banner-text"><Skeleton width="60%" height="3rem" />{lines(2)}</div></section><div className="dash-grid">{[0, 1, 2].map(i => <div key={i} className="card-elite">{lines(3)}</div>)}</div></div>{status}</div>;
  if (view === 'API/index') return <div className="api-container skeleton-route" aria-busy="true"><header className="api-header"><Skeleton width="12rem" height="3rem" /></header><div className="api-description">{lines(3)}</div><div className="api-card"><Skeleton height="20rem" /></div>{status}</div>;
  if (view === 'dashboard/dashboardEquipe') return <div className="team-wrapper skeleton-route" aria-busy="true"><div className="team-logo"><Skeleton width="10rem" height="3rem" /></div><div className="team-card"><div className="team-grid">{[0, 1, 2].map(i => <div key={i} className="team-section">{lines(3)}</div>)}</div></div>{status}</div>;
  if (view === 'error') return <div className="error-container skeleton-route" aria-busy="true"><Skeleton width="12rem" height="5rem" />{lines(2)}{status}</div>;
  const chat = view.endsWith('IA');
  if (chat) {
    const Welcome = view.startsWith('aluno/') ? StudentChatWelcome : ProfessorChatWelcome;
    return <div className="main-layout skeleton-route" aria-busy="true"><main className="ai-page-content" inert><section className="ai-chat"><div className="ai-chat-header"><div className="ai-chat-actions"><Skeleton width="7rem" height="2.5rem" /><Skeleton width="7rem" height="2.5rem" /></div></div><div className="ai-messages"><Welcome /></div><div className="ai-form"><Skeleton height="4rem" /></div></section></main><span className="skeleton-status" role="status">Preparando conversa…</span></div>;
  }
  if (['login', 'esqueciSenha', 'termos'].includes(view)) return <div className="login-wrapper skeleton-route" aria-busy="true"><div className="login-card"><Skeleton width="8rem" height="3rem" />{lines(2)}<Skeleton height="3rem" /><Skeleton height="3rem" /><Skeleton height="3rem" /></div><span className="skeleton-status" role="status">Preparando página…</span></div>;
  return <div className="main-layout skeleton-route" aria-busy="true"><div inert>{Header ? <Header data={data} handlers={handlers} /> : <header className="dash-header"><div className="header-left"><h2>{titles[view] || 'AnalisAI'}</h2></div><div className="header-user"><Skeleton width="9rem" /></div></header>}</div><div inert aria-hidden="true"><Content view={view} /></div><span className="skeleton-status" role="status">Preparando informações…</span></div>;
}
function StudentContent({
  view
}) {
  const dashboard = view === 'aluno/alunoDashboard',
    tasks = view === 'aluno/alunoTarefas';
  const title = dashboard ? 'Meu desempenho acadêmico' : tasks ? 'Minhas Tarefas' : 'Relatório de Competências';
  const labels = dashboard ? ['MATRÍCULA', 'MÉDIA GERAL', 'PRESENÇA'] : tasks ? ['TOTAL', 'PENDENTES', 'AGUARDANDO', 'CONCLUÍDAS', 'ATRASADAS'] : ['TOTAL AVALIADAS', 'APTAS', 'EM DESENVOLVIMENTO', 'INAPTAS'];
  return <main className="dash-content"><section className="welcome-banner" style={{
      background: 'linear-gradient(90deg, #1b5e38 0%, #217346 100%)'
    }}><div className="banner-text"><h1>{title}</h1><Skeleton width="80%" /></div></section><section className="section-container">{dashboard && <h2 className="section-title-2">INFORMAÇÕES GERAIS</h2>}<Stats labels={labels} /></section>{dashboard ? <><section className="section-container"><h2 className="section-title-2">COMPETÊNCIAS</h2><Stats labels={['AVALIADAS', 'APTAS', 'EM DESENVOLVIMENTO']} /></section><section className="section-container"><h2 className="section-title-2">MAPA DE COMPETÊNCIAS</h2><div className="stats-card" style={{
          padding: 40
        }}><Skeleton height="400px" /></div></section></> : !tasks ? <section className="section-container"><div className="stats-card" style={{
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        justifyContent: 'space-between'
      }}><div style={{
          display: 'flex',
          gap: 15,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}><Skeleton width="45%" height="3rem" /><Skeleton width="20%" height="3rem" /><Skeleton width="20%" height="3rem" /></div><Skeleton width="10rem" height="50px" /></div></section> : null}<section className="section-container"><h2 className="section-title-2">{dashboard ? 'MINHAS NOTAS DETALHADAS' : tasks ? 'LISTA DE ATIVIDADES' : 'DETALHAMENTO'}</h2><div className="dash-grid">{[0, 1, 2].map(i => <div key={i} className="stats-card" style={{
          padding: tasks ? 30 : 25,
          display: 'flex',
          flexDirection: 'column',
          gap: 15
        }} data-skeleton-card>{lines(4)}</div>)}</div></section></main>;
}
