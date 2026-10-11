import React from "react";
import {
  Skeleton,
  SkeletonActions,
  SkeletonCards,
  SkeletonField,
  SkeletonFooter,
  SkeletonHeader,
  SkeletonHero,
  SkeletonLines,
  SkeletonRows,
  SkeletonScreen,
  SkeletonSection,
  SkeletonSidebarContent,
  SkeletonStats,
  SkeletonTable,
  SkeletonToolbar,
} from "../components/Skeleton";
import { calendarShape } from "./shapes";

function DashboardFrame({ view, children, footer = true, contentClass = "" }) {
  return (
    <SkeletonScreen view={view}>
      <SkeletonHeader />
      <main className={`dash-content ${contentClass}`}>{children}</main>
      {footer && <SkeletonFooter />}
    </SkeletonScreen>
  );
}

export function TeacherDashboardSkeleton() {
  return (
    <DashboardFrame view="dashboard/dashboardMain">
      <SkeletonHero />
      <SkeletonSection>
        <SkeletonStats />
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonStats />
      </SkeletonSection>
      <SkeletonSection className="ranking-section">
        <SkeletonActions count={3} compact />
        <SkeletonRows />
      </SkeletonSection>
    </DashboardFrame>
  );
}

export function StudentDashboardSkeleton() {
  return (
    <DashboardFrame view="aluno/alunoDashboard">
      <SkeletonHero />
      <SkeletonSection>
        <SkeletonStats count={3} />
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonStats count={3} />
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonRows />
      </SkeletonSection>
    </DashboardFrame>
  );
}

export function CompetencesSkeleton() {
  return (
    <DashboardFrame view="aluno/alunoCompetencias">
      <SkeletonHero />
      <SkeletonSection>
        <SkeletonStats />
      </SkeletonSection>
      <SkeletonToolbar actions={2} search={false} />
      <SkeletonSection>
        <SkeletonCards count={6} actions={false} />
      </SkeletonSection>
    </DashboardFrame>
  );
}

export function StudentTasksSkeleton() {
  return (
    <DashboardFrame view="aluno/alunoTarefas">
      <SkeletonHero />
      <SkeletonSection>
        <SkeletonStats />
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonCards count={3} />
      </SkeletonSection>
    </DashboardFrame>
  );
}

export function TeacherTasksSkeleton() {
  return (
    <DashboardFrame view="dashboard/dashboardTarefas">
      <div className="tarefas-header">
        <Skeleton style={{ width: "35%", height: 28 }} />
        <Skeleton style={{ width: 160, height: 48 }} />
      </div>
      <SkeletonStats count={3} className="tarefas-stats" />
      <div className="filtros-tarefas skeleton-filter-grid">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonField key={index} />
        ))}
      </div>
      <SkeletonCards className="tarefas-grid" />
    </DashboardFrame>
  );
}

function ChartBlock({ className, height = 240 }) {
  return (
    <div className={`${className} skeleton-panel`}>
      <Skeleton style={{ height, width: "100%", marginBottom: 24 }} />
      <Skeleton style={{ width: "65%", height: 16, marginBottom: 12 }} />
      <Skeleton style={{ width: "50%", height: 28 }} />
    </div>
  );
}

export function ChartsSkeleton() {
  return (
    <DashboardFrame
      view="dashboard/dashboardGraficos"
      contentClass="graficos-grid"
    >
      <Skeleton style={{ width: "35%", height: 28, margin: "40px 0 0" }} />
      <div className="row-triple">
        {Array.from({ length: 3 }, (_, index) => (
          <ChartBlock key={index} className="dash-card card-grafico" />
        ))}
      </div>
      <Skeleton style={{ width: "50%", height: 28, marginTop: 40 }} />
      <ChartBlock className="dash-card card-grafico-large" height={250} />
      <Skeleton style={{ width: "50%", height: 28, marginTop: 40 }} />
      <ChartBlock className="dash-card card-grafico-small" height={250} />
    </DashboardFrame>
  );
}

export function EvolutionSkeleton() {
  return (
    <DashboardFrame view="aluno/alunoEvolucao">
      <SkeletonHero />
      <div className="filter-bar">
        <div className="periodo-selector skeleton-panel">
          <SkeletonActions count={4} compact />
        </div>
      </div>
      <SkeletonSection>
        <div className="stats-card skeleton-panel">
          <Skeleton style={{ width: "40%", height: 28, marginBottom: 30 }} />
          <Skeleton className="skeleton-chart-frame" style={{ height: 400 }} />
        </div>
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonCards actions={false} />
      </SkeletonSection>
      <SkeletonSection>
        <SkeletonRows />
      </SkeletonSection>
    </DashboardFrame>
  );
}

export function EditorSkeleton() {
  return (
    <DashboardFrame view="dashboard/dashboardEdit">
      <SkeletonToolbar actions={4} />
      <div className="edit-content">
        <div className="ai-editor-panel skeleton-panel skeleton-editor-panel">
          <Skeleton style={{ width: "40%", height: 28, marginBottom: 20 }} />
          <SkeletonLines count={2} />
          <SkeletonActions count={3} compact />
        </div>
        <SkeletonTable columns={7} />
      </div>
    </DashboardFrame>
  );
}

export function UsersSkeleton() {
  return (
    <DashboardFrame view="dashboard/dashboardUsuarios">
      <SkeletonToolbar actions={1} />
      <div className="edit-content">
        <SkeletonTable columns={5} />
      </div>
    </DashboardFrame>
  );
}

export function RequestsSkeleton() {
  return (
    <DashboardFrame view="dashboard/dashboardSolicitacoes" footer={false}>
      <SkeletonCards className="solicitacoes-grid" count={3} />
    </DashboardFrame>
  );
}

export function CalendarSkeleton({ data = {} }) {
  const { calendar } = calendarShape(data.loadingSearch);
  return (
    <DashboardFrame view="dashboard/dashboardCalendario" footer={false}>
      <div className="calendario-container">
        <section className="calendario-main skeleton-panel">
          <div className="calendario-header">
            <Skeleton style={{ width: 40, height: 40 }} />
            <Skeleton style={{ width: "45%", height: 32 }} />
            <Skeleton style={{ width: 40, height: 40 }} />
          </div>
          <div className="calendario-grid">
            {Array.from({ length: 7 }, (_, index) => (
              <div className="dia-semana" key={`week-${index}`}>
                <Skeleton
                  style={{ width: "65%", height: 16, margin: "0 auto" }}
                />
              </div>
            ))}
            {Array.from({ length: calendar.startWeek }, (_, index) => (
              <div
                className="dia-cell outro-mes skeleton-panel"
                key={`pad-${index}`}
              />
            ))}
            {calendar.days.map((day) => (
              <div
                className="dia-cell skeleton-panel"
                data-date={day.date}
                key={day.date}
              >
                <Skeleton style={{ width: 24, height: 16 }} />
                <Skeleton style={{ width: "75%", height: 16, marginTop: 18 }} />
              </div>
            ))}
          </div>
        </section>
        <aside className="calendario-sidebar skeleton-panel">
          <Skeleton style={{ width: "65%", height: 28, marginBottom: 24 }} />
          <SkeletonField />
          <SkeletonField />
          <SkeletonActions count={1} />
          <div className="skeleton-calendar-list">
            <Skeleton style={{ width: "65%", height: 28, marginBottom: 24 }} />
            {Array.from({ length: 3 }, (_, index) => (
              <div className="evento-lista-item skeleton-panel" key={index}>
                <SkeletonLines count={2} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </DashboardFrame>
  );
}

function ProfileSkeleton({ student = false, data = {} }) {
  const params = new URLSearchParams(data.loadingSearch || "");
  const tab = params.get("aba") || "dados";
  return (
    <DashboardFrame
      view={student ? "aluno/alunoPerfil" : "dashboard/dashboardConfig"}
      footer={false}
    >
      {student && <SkeletonHero />}
      <div className="perfil-grid">
        <aside className="perfil-sidebar-card skeleton-panel">
          <Skeleton
            style={{
              width: student ? 130 : 120,
              height: student ? 130 : 120,
              borderRadius: "50%",
              margin: "0 auto 24px",
            }}
          />
          <Skeleton
            style={{ width: "75%", height: 28, margin: "0 auto 16px" }}
          />
          <SkeletonLines count={2} />
          <div className="perfil-stats-row skeleton-panel">
            <Skeleton style={{ height: 48 }} />
            <Skeleton style={{ height: 48 }} />
          </div>
        </aside>
        <section className="perfil-main skeleton-panel" data-skeleton-tab={tab}>
          <SkeletonActions count={student ? 2 : 3} compact />
          <div className="info-grid skeleton-profile-fields">
            {Array.from(
              { length: tab === "senha" ? 3 : tab === "notificacoes" ? 4 : 4 },
              (_, index) => (
                <SkeletonField key={index} />
              ),
            )}
          </div>
          <SkeletonActions count={1} />
        </section>
      </div>
    </DashboardFrame>
  );
}

export const StudentProfileSkeleton = (props) => (
  <ProfileSkeleton {...props} student />
);
export const TeacherProfileSkeleton = (props) => <ProfileSkeleton {...props} />;

function ChatSkeleton({ student = false }) {
  return (
    <SkeletonScreen view={student ? "aluno/alunoIA" : "dashboard/dashboardIA"}>
      <main className="ai-page-content">
        <section className="ai-chat skeleton-panel">
          <header className="ai-chat-header">
            <div className="skeleton-chat-heading">
              <Skeleton style={{ width: 38, height: 38 }} />
              <div className="skeleton-chat-title">
                <SkeletonLines count={2} />
              </div>
            </div>
            <SkeletonActions count={2} compact />
          </header>
          <div className="ai-messages skeleton-chat-messages">
            <div className="skeleton-chat-welcome">
              <Skeleton
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  margin: "0 auto 24px",
                }}
              />
              <Skeleton
                style={{ height: 36, width: "75%", margin: "0 auto 20px" }}
              />
              <SkeletonLines count={2} />
              <SkeletonActions count={3} compact />
            </div>
          </div>
          <div className="ai-form skeleton-chat-form">
            <Skeleton style={{ width: "100%", height: 56 }} />
            <Skeleton style={{ width: 48, height: 48, flexShrink: 0 }} />
          </div>
        </section>
      </main>
    </SkeletonScreen>
  );
}

export const TeacherChatSkeleton = () => <ChatSkeleton />;
export const StudentChatSkeleton = () => <ChatSkeleton student />;

function AuthSkeleton({ forgot = false, data = {} }) {
  const student = data.tipo === "aluno";
  return (
    <SkeletonScreen
      view={forgot ? "esqueciSenha" : "login"}
      className="login-wrapper"
    >
      <Skeleton style={{ width: 140, height: 48, marginBottom: 20 }} />
      <div className="login-card skeleton-panel">
        <Skeleton style={{ width: "70%", height: 50, margin: "0 auto 30px" }} />
        {forgot ? (
          <>
            <Skeleton style={{ height: 28, width: "75%", marginBottom: 24 }} />
            <SkeletonLines count={2} />
          </>
        ) : (
          <div className="login-tabs">
            <Skeleton style={{ width: "40%", height: 32 }} />
            <Skeleton style={{ width: "40%", height: 32 }} />
          </div>
        )}
        <div className="skeleton-auth-fields">
          {Array.from({ length: forgot ? 1 : student ? 3 : 2 }, (_, index) => (
            <SkeletonField key={index} />
          ))}
        </div>
        <Skeleton style={{ height: 48, marginTop: 24 }} />
        {!forgot && (
          <Skeleton
            style={{ width: "50%", height: 16, margin: "24px auto 0" }}
          />
        )}
      </div>
      <Skeleton style={{ width: "50%", height: 16, margin: "30px auto 0" }} />
    </SkeletonScreen>
  );
}

export const LoginSkeleton = (props) => <AuthSkeleton {...props} />;
export const ForgotPasswordSkeleton = (props) => (
  <AuthSkeleton {...props} forgot />
);

export function HomeSkeleton() {
  return (
    <>
      <div
        className="mobile-menu-toggle skeleton skeleton-mobile-toggle"
        aria-hidden="true"
        inert
      />
      <SkeletonScreen as="aside" view="sidebar/public" className="sidebar">
        <SkeletonSidebarContent kind="public" />
      </SkeletonScreen>
      <SkeletonScreen view="index">
        <div className="home-content-wrapper">
          <SkeletonHeader publicPage />
          <main>
            <SkeletonHero large />
            <SkeletonSection>
              <SkeletonCards count={3} actions={false} />
            </SkeletonSection>
            <SkeletonSection>
              <div className="skeleton-faq">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="skeleton-panel skeleton-faq-row" key={index}>
                    <SkeletonLines count={2} />
                  </div>
                ))}
              </div>
            </SkeletonSection>
          </main>
          <SkeletonFooter />
        </div>
      </SkeletonScreen>
    </>
  );
}

export function ManualsSkeleton() {
  return (
    <DashboardFrame view="manuais" footer={false}>
      <div className="cards">
        {Array.from({ length: 2 }, (_, index) => (
          <article className="card skeleton-panel" key={index}>
            <Skeleton style={{ height: 32, width: "50%" }} />
            <SkeletonLines count={2} />
            <SkeletonActions count={1} />
          </article>
        ))}
      </div>
    </DashboardFrame>
  );
}

function PdfSkeleton({ student = false }) {
  return (
    <DashboardFrame
      view={student ? "manualDoAluno" : "manualDoProfessor"}
      footer={false}
    >
      <div className="pdf-header">
        <Skeleton style={{ width: "40%", height: 32 }} />
        <Skeleton style={{ width: 160, height: 48 }} />
      </div>
      <div className="pdf-container skeleton-panel">
        <Skeleton className="skeleton-pdf" />
      </div>
    </DashboardFrame>
  );
}

export const StudentManualSkeleton = () => <PdfSkeleton student />;
export const TeacherManualSkeleton = () => <PdfSkeleton />;

export function TermsSkeleton() {
  return (
    <SkeletonScreen view="termos" className="login-wrapper">
      <section className="login-card skeleton-panel">
        <div className="termos-header">
          <Skeleton
            style={{ width: "65%", height: 50, margin: "0 auto 24px" }}
          />
          <Skeleton style={{ width: "75%", height: 28, marginBottom: 24 }} />
        </div>
        <div className="termos-scroller">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="skeleton-text-block" key={index}>
              <Skeleton
                style={{ width: "50%", height: 28, marginBottom: 20 }}
              />
              <SkeletonLines count={3} />
            </div>
          ))}
        </div>
        <div className="button-area">
          <Skeleton style={{ width: 160, height: 48 }} />
        </div>
      </section>
    </SkeletonScreen>
  );
}

export function TeamSkeleton() {
  return (
    <SkeletonScreen view="dashboard/dashboardEquipe" className="team-wrapper">
      <Skeleton style={{ width: 180, height: 50, margin: "0 auto 30px" }} />
      <section className="team-card skeleton-panel">
        <div className="team-grid">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="team-section" key={index}>
              <Skeleton
                style={{ width: "75%", height: 28, marginBottom: 24 }}
              />
              <SkeletonLines count={3} />
            </div>
          ))}
        </div>
        <div className="team-actions">
          <SkeletonActions />
        </div>
      </section>
    </SkeletonScreen>
  );
}

export function ApiDocumentationSkeleton() {
  return (
    <SkeletonScreen view="API/index" className="api-container">
      <header className="api-header">
        <Skeleton style={{ width: 200, height: 50 }} />
        <Skeleton style={{ width: 80, height: 28 }} />
      </header>
      <div className="api-description skeleton-text-block">
        <SkeletonLines count={2} />
      </div>
      <Skeleton style={{ width: "75%", height: 48, marginBottom: 32 }} />
      <section className="api-card skeleton-panel">
        <div className="api-card-header">
          <Skeleton style={{ width: "40%", height: 28 }} />
        </div>
        <div className="api-card-body">
          <SkeletonTable columns={4} count={8} />
        </div>
      </section>
      <SkeletonFooter />
    </SkeletonScreen>
  );
}

export function ErrorSkeleton() {
  return (
    <SkeletonScreen view="error" className="page">
      <div className="content">
        <Skeleton style={{ height: 60, width: "70%", marginBottom: 24 }} />
        <SkeletonLines count={2} />
        <SkeletonActions count={1} />
      </div>
      <div className="skeleton-error-art">
        <Skeleton style={{ height: 180, width: 260 }} />
      </div>
    </SkeletonScreen>
  );
}
