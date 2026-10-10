import React from "react";

export function ProfessorChatWelcome() {
  return (
    <div className={"ai-welcome"}>
      <span className={"ai-welcome-mark"}>
        <i className={"ph-bold ph-sparkle"} aria-hidden={"true"}></i>
      </span>
      <h2>{"Qual é o foco da sua turma?"}</h2>
      <p>
        {"Consulte tendências, competências e próximos passos pedagógicos."}
      </p>
      <div className={"ai-quick-actions"}>
        <button
          type={"button"}
          data-prompt={
            "Faça um panorama pedagógico completo e em texto corrido sobre a turma, destacando tendências de desempenho, forças coletivas e prioridades de acompanhamento."
          }
        >
          {"Panorama da turma"}
        </button>
        <button
          type={"button"}
          data-prompt={
            "Elabore um diagnóstico detalhado em texto fluido sobre as competências que mais necessitam de intervenção pedagógica na turma."
          }
        >
          {"Competências críticas"}
        </button>
        <button
          type={"button"}
          data-prompt={
            "Apresente um plano prático com sugestões de intervenções pedagógicas e estratégias ativas para apoiar os alunos com menor rendimento."
          }
        >
          {"Sugerir intervenções"}
        </button>
      </div>
    </div>
  );
}

export function StudentChatWelcome() {
  return (
    <div className={"ai-welcome"}>
      <span className={"ai-welcome-mark"}>
        <i className={"ph-bold ph-sparkle"} aria-hidden={"true"}></i>
      </span>
      <h2>{"Qual é o seu foco hoje?"}</h2>
      <p>
        {"Converse com o Agente para entender seu desempenho e estudar melhor."}
      </p>
      <div className={"ai-quick-actions"}>
        <button
          type={"button"}
          data-prompt={
            "Faça um diagnóstico do meu desempenho em texto corrido e acolhedor, mostrando meus pontos fortes e o que preciso praticar mais."
          }
        >
          {"Analisar meu desempenho"}
        </button>
        <button
          type={"button"}
          data-prompt={
            "Monte um roteiro de estudos prático e bem estruturado para os próximos 7 dias com base nas minhas matérias e tarefas."
          }
        >
          {"Criar plano de estudos"}
        </button>
        <button
          type={"button"}
          data-prompt={
            "Me dê orientações claras em texto corrido sobre como organizar melhor minha rotina de estudos e aumentar meu rendimento."
          }
        >
          {"Como posso melhorar?"}
        </button>
      </div>
    </div>
  );
}
