import { LoadingElement } from "./loading-layout";
import React from "react";
export function ProfessorChatWelcome() {
  return (
    <LoadingElement as="div" className={"ai-welcome"}>
      <LoadingElement as="span" className={"ai-welcome-mark"}>
        <LoadingElement
          as="i"
          className={"ph-bold ph-sparkle"}
          aria-hidden={"true"}
        ></LoadingElement>
      </LoadingElement>
      <LoadingElement as="h2">{"Qual é o foco da sua turma?"}</LoadingElement>
      <LoadingElement as="p">
        {"Consulte tendências, competências e próximos passos pedagógicos."}
      </LoadingElement>
      <LoadingElement as="div" className={"ai-quick-actions"}>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Faça um panorama pedagógico completo e em texto corrido sobre a turma, destacando tendências de desempenho, forças coletivas e prioridades de acompanhamento."
          }
        >
          {"Panorama da turma"}
        </LoadingElement>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Elabore um diagnóstico detalhado em texto fluido sobre as competências que mais necessitam de intervenção pedagógica na turma."
          }
        >
          {"Competências críticas"}
        </LoadingElement>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Apresente um plano prático com sugestões de intervenções pedagógicas e estratégias ativas para apoiar os alunos com menor rendimento."
          }
        >
          {"Sugerir intervenções"}
        </LoadingElement>
      </LoadingElement>
    </LoadingElement>
  );
}
export function StudentChatWelcome() {
  return (
    <LoadingElement as="div" className={"ai-welcome"}>
      <LoadingElement as="span" className={"ai-welcome-mark"}>
        <LoadingElement
          as="i"
          className={"ph-bold ph-sparkle"}
          aria-hidden={"true"}
        ></LoadingElement>
      </LoadingElement>
      <LoadingElement as="h2">{"Qual é o seu foco hoje?"}</LoadingElement>
      <LoadingElement as="p">
        {"Converse com o Agente para entender seu desempenho e estudar melhor."}
      </LoadingElement>
      <LoadingElement as="div" className={"ai-quick-actions"}>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Faça um diagnóstico do meu desempenho em texto corrido e acolhedor, mostrando meus pontos fortes e o que preciso praticar mais."
          }
        >
          {"Analisar meu desempenho"}
        </LoadingElement>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Monte um roteiro de estudos prático e bem estruturado para os próximos 7 dias com base nas minhas matérias e tarefas."
          }
        >
          {"Criar plano de estudos"}
        </LoadingElement>
        <LoadingElement
          as="button"
          type={"button"}
          data-prompt={
            "Me dê orientações claras em texto corrido sobre como organizar melhor minha rotina de estudos e aumentar meu rendimento."
          }
        >
          {"Como posso melhorar?"}
        </LoadingElement>
      </LoadingElement>
    </LoadingElement>
  );
}
