import { refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import { apiFetch } from "../services/api";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
  const fetch = lifecycle.fetch(apiFetch);
  function getPageData(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || "null");
    } catch (error) {
      if (!lifecycle.active) return;
      console.error("Falha ao ler dados da página.");
      return null;
    }
  }
  const isAdmin = Boolean(getPageData("dashboard-usuarios-data"));
  function openAddUserModal() {
    if (isAdmin) {
      document.getElementById("userForm").action = "/dashboard/usuarios/add";
      document.getElementById("userModalTitle").innerText = "NOVO USUÁRIO";
      document.getElementById("userId").value = "";
      document.getElementById("userName").value = "";
      document.getElementById("userEmail").value = "";
      document.getElementById("userCargo").value = "Professor";
      document.getElementById("passwordField").style.display = "block";
      document.getElementById("statusField").style.display = "none";
      setTeacherClassManagement("[]");
      document.getElementById("userModal").style.display = "flex";
    } else {
      document.getElementById("permissionModal").style.display = "flex";
    }
  }
  function setTeacherClassManagement(serializedTurmas) {
    const editing = Boolean(document.getElementById("userId").value);
    const isTeacher = document.getElementById("userCargo").value === "Professor";
    const field = document.getElementById("teacherClassesField");
    const edited = document.getElementById("teacherClassesEdited");
    if (field) field.style.display = editing && isTeacher ? "block" : "none";
    if (edited) edited.value = editing && isTeacher ? "true" : "";

    if (serializedTurmas !== undefined) {
      let assigned = [];
      try {
        const parsed = JSON.parse(serializedTurmas || "[]");
        if (Array.isArray(parsed)) assigned = parsed.filter((item) => typeof item === "string");
      } catch {}
      document.querySelectorAll('#teacherClassesField input[name="turmas"]').forEach((checkbox) => {
        checkbox.checked = assigned.includes(checkbox.value);
      });
    }
  }
  function editUser(id, nome, email, cargo, status, serializedTurmas) {
    if (isAdmin) {
      document.getElementById("userForm").action = "/dashboard/usuarios/update";
      document.getElementById("userModalTitle").innerText = "EDITAR USUÁRIO";
      document.getElementById("userId").value = id;
      document.getElementById("userName").value = nome;
      document.getElementById("userEmail").value = email.toLowerCase();
      document.getElementById("userCargo").value = cargo;
      document.getElementById("userStatus").value = status;
      document.getElementById("passwordField").style.display = "none";
      document.getElementById("statusField").style.display = "block";
      setTeacherClassManagement(serializedTurmas);
      document.getElementById("userModal").style.display = "flex";
    } else {
      document.getElementById("permissionModal").style.display = "flex";
    }
  }
  lifecycle.listen(document.getElementById("userCargo"), "change", () => {
    setTeacherClassManagement();
  });
  function closeUserModal() {
    document.getElementById("userModal").style.display = "none";
  }
  function confirmDeleteUser(id, nome) {
    if (isAdmin) {
      if (confirm(`Deseja realmente remover o acesso de ${nome}?`)) {
        fetch(`/dashboard/usuarios/delete/${id}`, {
          method: "POST",
          headers: {
            "X-CSRF-Token":
              document.querySelector('meta[name="csrf-token"]')?.content || "",
          },
        })
          .then((response) => {
            if (!lifecycle.active) return;
            if (response.ok) refresh();
          })
          .catch((error) => lifecycle.reportError(error));
      }
    } else {
      document.getElementById("permissionModal").style.display = "flex";
    }
  }
  function closePermissionModal() {
    document.getElementById("permissionModal").style.display = "none";
  }
  lifecycle.listen(
    document.getElementById("userSearchInput"),
    "keyup",
    function () {
      const filter = this.value.toLowerCase();
      document.querySelectorAll("#userTableBody tr").forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    },
  );
  lifecycle.bindHandlers(handlers, {
    getPageData,
    openAddUserModal,
    editUser,
    closeUserModal,
    confirmDeleteUser,
    closePermissionModal,
  });
  return lifecycle;
}
