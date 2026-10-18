import React, { useEffect, useState } from "react";
import { request } from "../services/api";
import { navigate } from "../services/navigation";
import { styleFrom } from "../services/ui";

export default function Dashboard_pedagogicalProfile({ data }) {
  const [name, setName] = useState(data.nome || data.user || "");
  const [photo, setPhoto] = useState(data.foto_perfil || "");
  const [photoChanged, setPhotoChanged] = useState(false);
  const [classes, setClasses] = useState(data.turmas || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const role = data.cargo || data.userCargo || "Professor";
  const isTeacher = role === "Professor";
  const availableClasses = data.turmasDisponiveis || [
    "9º FUNDAMENTAL",
    "1º MÉDIO",
    "2º MÉDIO",
    "3º MÉDIO",
  ];

  useEffect(() => {
    setName(data.nome || data.user || "");
    setPhoto(data.foto_perfil || "");
    setPhotoChanged(false);
    setClasses(data.turmas || []);
  }, [data.nome, data.user, data.foto_perfil, data.turmas]);

  const toggleClass = (turma, checked) => {
    setClasses((previous) =>
      checked
        ? [...new Set([...previous, turma])]
        : previous.filter((item) => item !== turma),
    );
  };

  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    setImageError("");
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setImageError("Escolha uma imagem PNG, JPEG ou WebP.");
      event.target.value = "";
      return;
    }
    if (file.size > 900 * 1024) {
      setImageError("A imagem deve ter no máximo 900 KB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setImageError("Não foi possível ler essa imagem.");
        return;
      }
      setPhoto(reader.result);
      setPhotoChanged(true);
    };
    reader.onerror = () => setImageError("Não foi possível ler essa imagem.");
    reader.readAsDataURL(file);
  };

  const save = async (event) => {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Informe seu nome completo.");
      return;
    }
    if (isTeacher && classes.length === 0) {
      setError("Selecione pelo menos uma turma sob sua responsabilidade.");
      return;
    }
    setSaving(true);
    try {
      await request("/dashboard/configuracao-inicial/salvar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name.trim(),
          foto_perfil: photoChanged ? photo : null,
          turmas: classes,
        }),
      });
      sessionStorage.setItem("analisai:message", "Perfil configurado com sucesso.");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Não foi possível salvar sua configuração.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="dash-content">
      <section className="section-container" style={styleFrom("max-width: 940px; margin: 36px auto;")}>
        <p className="section-label">CONFIGURAÇÃO INICIAL</p>
        <h1 className="section-title-2">Vamos preparar sua conta</h1>
        <p style={styleFrom("color: var(--text-gray); max-width: 700px; margin-bottom: 28px;")}>
          Confirme seu nome, escolha uma foto e indique as turmas que você acompanha. Você poderá atualizar essas informações depois.
        </p>
        <form onSubmit={save} className="perfil-grid" style={styleFrom("align-items: start;")}>
          <aside className="perfil-sidebar-card">
            <div className="avatar-circle" style={styleFrom("overflow: hidden; display:flex; align-items:center; justify-content:center;")}>
              {photo ? (
                <img src={photo} alt="Foto de perfil" style={styleFrom("width:100%; height:100%; object-fit:cover;")} />
              ) : (
                <span>{name.trim().charAt(0).toUpperCase() || "P"}</span>
              )}
            </div>
            <h2 style={styleFrom("text-align:center; margin-top: 12px;")}>{name.trim() || "Seu nome"}</h2>
            <p style={styleFrom("text-align:center; color:var(--text-gray);")}>{role}</p>
            <label className="btn-secondary-dash" style={styleFrom("display:flex; justify-content:center; align-items:center; gap:8px; margin-top:22px; cursor:pointer;")}>
              <i className="fas fa-camera" aria-hidden="true"></i>
              <span>ESCOLHER FOTO</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={choosePhoto} style={styleFrom("display:none;")} />
            </label>
            <p style={styleFrom("font-size:.78rem; color:var(--text-gray); margin-top:10px;")}>PNG, JPEG ou WebP · até 900 KB</p>
            {imageError && <p role="alert" style={styleFrom("color:var(--danger-red, #ff6262);")}>{imageError}</p>}
          </aside>
          <section className="perfil-main">
            {error && <div className="alert alert-error" role="alert">{error}</div>}
            <h2 className="section-title-2">Seus dados</h2>
            <div className="info-grid">
              <div className="info-display-item">
                <label htmlFor="profile-name">Nome completo</label>
                <input id="profile-name" className="form-control" autoComplete="name" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
              <div className="info-display-item">
                <label>E-mail institucional</label>
                <div className="value"><i className="fas fa-envelope" aria-hidden="true"></i> {data.email || "Não informado"}</div>
              </div>
            </div>
            {isTeacher && (
              <section style={styleFrom("margin-top:28px;")}>
                <h2 className="section-title-2">Turmas sob sua responsabilidade</h2>
                <p style={styleFrom("color:var(--text-gray); margin-bottom:16px;")}>Marque as turmas em que você registra avaliações, acompanha competências e lança frequência.</p>
                <div className="info-grid">
                  {availableClasses.map((turma) => (
                    <label key={turma} className="info-display-item" style={styleFrom("display:flex; align-items:center; gap:12px; cursor:pointer;")}>
                      <input type="checkbox" checked={classes.includes(turma)} onChange={(event) => toggleClass(turma, event.target.checked)} />
                      <span>{turma}</span>
                    </label>
                  ))}
                </div>
              </section>
            )}
            <div style={styleFrom("display:flex; flex-wrap:wrap; gap:12px; margin-top:28px;")}>
              <button type="submit" className="btn-secondary-dash" disabled={saving}>
                <i className={saving ? "fas fa-spinner fa-spin" : "fas fa-check"} aria-hidden="true"></i>
                {saving ? " SALVANDO..." : " SALVAR E CONTINUAR"}
              </button>
              {!isTeacher && <a href="/dashboard" className="btn-secondary-dash">VOLTAR AO PAINEL</a>}
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
