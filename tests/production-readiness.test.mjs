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
