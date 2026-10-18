import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const manifest = JSON.parse(await read("../src/pages/manifest.json"));
const navigation = await read("../src/services/navigation.js");

test("privacy policy route is public and has page and loading modules", async () => {
  assert.equal(manifest.privacidade.component, "Privacidade");
  assert.ok(manifest.privacidade.styles.includes("/css/pages/terms.css"));
  assert.ok(navigation.includes('"/privacidade": "privacidade"'));
  const publicRoutes = navigation.slice(navigation.indexOf("publicRoutes"));
  assert.ok(publicRoutes.includes('"/privacidade"'));
  await read("../src/pages/Privacidade.jsx");
  await read("../src/skeletons/Privacidade.jsx");
});

test("coordinators receive the teacher navigation on both manual pages", async () => {
  const pages = [
    await read("../src/pages/Manuais.jsx"),
    await read("../src/pages/ManualDoProfessor.jsx"),
  ];
  for (const source of pages) {
    assert.ok(source.includes('["Professor", "Coordenador", "Admin"].includes(userCargo)'));
  }
});

test("login links to the privacy policy", async () => {
  const login = await read("../src/pages/Login.jsx");
  assert.ok(login.includes('href={"/privacidade"}'));
});

test("privacy notice documents the AI providers and bounded education-data context", async () => {
  const policy = await read("../src/pages/Privacidade.jsx");
  assert.ok(policy.includes("Gemini ou Groq"));
  assert.ok(policy.includes("200 alunos"));
  assert.ok(policy.includes("300 tarefas"));
  assert.ok(policy.includes("retenção"));
});

test("table repair action sends the selected table identifier", async () => {
  const source = await read("../src/interactions/components_settings-modal.jsx");
  assert.ok(source.includes("handlers.executeSystemRepair(t.table);"));
  assert.ok(!source.includes('handlers.executeSystemRepair("t.table");'));
});

test("backup banner does not claim automatic backup is enabled unconditionally", async () => {
  const component = await read("../src/components/Partials_barProfessor.jsx");
  const interaction = await read("../src/interactions/components_settings-modal.jsx");
  assert.ok(component.includes('id={"backupBannerStatus"}'));
  assert.ok(!component.includes("Rotina de Backup Ativa (a cada 7 dias)"));
  assert.ok(interaction.includes('bs.enabled === false'));
  assert.ok(interaction.includes("Backup JSON (mesmo banco)"));
  assert.ok(interaction.includes("fallback JSON fica no mesmo banco"));
});


test("first-time teacher setup collects account details and assigned classes", async () => {
  const setup = await read("../src/pages/Dashboard_pedagogicalProfile.jsx");
  const loader = await read("../src/services/page-loader.js");
  const manifestEntry = manifest["dashboard/pedagogicalProfile"];
  const routeMap = JSON.parse(await read("../src/services/route-map.json"));
  assert.ok(manifestEntry);
  await read("../src/skeletons/Dashboard_pedagogicalProfile.jsx");
  assert.ok(navigation.includes('"/dashboard/configuracao-inicial": "dashboard/pedagogicalProfile"'));
  assert.ok(loader.includes("onboardingConcluido === false"));
  assert.ok(setup.includes('type="file"'));
  assert.ok(setup.includes("foto_perfil"));
  assert.ok(setup.includes("turmas"));
  assert.ok(routeMap.some((route) => route.original === "/dashboard/configuracao-inicial/salvar" && route.method === "PATCH"));
});

test("teacher tour runs once and frequency is only reachable through the grade editor", async () => {
  const dashboard = await read("../src/pages/Dashboard_dashboardMain.jsx");
  const editor = await read("../src/pages/Dashboard_dashboardEdit.jsx");
  const attendance = await read("../src/pages/Dashboard_frequencia.jsx");
  const sidebar = await read("../src/components/Partials_barProfessor.jsx");
  const map = JSON.parse(await read("../src/services/route-map.json"));
  assert.ok(dashboard.includes("analisai:tour:v1:"));
  assert.ok(dashboard.includes("PULAR TOUR"));
  assert.ok(editor.includes('href={"/dashboard/frequencia"}'));
  assert.ok(attendance.includes('value="PRESENTE"'));
  assert.ok(attendance.includes('value="FALTA"'));
  assert.ok(attendance.includes('value="JUSTIFICADA"'));
  assert.ok(attendance.includes('className="alunos-table"'));
  assert.ok(!sidebar.includes('href={"/dashboard/frequencia"}'));
  assert.ok(map.some((route) => route.original === "/dashboard/frequencia/salvar" && route.method === "POST"));
});

test("report workflows include coordinator requests, teacher responses and individual PDF downloads", async () => {
  const reports = await read("../src/pages/Dashboard_dashboardRelatorios.jsx");
  const student = await read("../src/pages/Aluno_alunoDashboard.jsx");
  const routes = await read("../src/services/route-map.json");
  assert.ok(reports.includes("Solicitar relatório a um professor"));
  assert.ok(reports.includes("EM_ANDAMENTO"));
  assert.ok(reports.includes("PDF DO ALUNO"));
  assert.ok(student.includes("MEU RELATÓRIO PDF"));
  assert.ok(routes.includes("/dashboard/aluno-relatorio/:id/pdf"));
});
