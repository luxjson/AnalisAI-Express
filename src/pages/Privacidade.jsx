import { LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";

export default function Privacidade() {
  return (
    <LoadingElement as={"div"} className={"login-wrapper"} root={true}>
      <div className={"login-card"}>
        <div className={"termos-header"}>
          <img
            src={"/images/logo3-white.png"}
            alt={"AnalisAI"}
            style={styleFrom("height: 40px;")}
          />
          <h2>{"Política de Privacidade"}</h2>
        </div>
        <div className={"termos-scroller"}>
          <p>
            <strong>{"1. Dados tratados:"}</strong>
            {" A plataforma pode tratar dados de conta e autenticação, registros pedagógicos (como frequência, avaliações, competências, tarefas e entregas), preferências e registros técnicos necessários para segurança e funcionamento."}
          </p>
          <p>
            <strong>{"2. Finalidades:"}</strong>
            {" Os dados são utilizados para disponibilizar as funcionalidades do AnalisAI, apoiar o acompanhamento pedagógico, administrar contas e notificações, prevenir abusos e manter a segurança do serviço."}
          </p>
          <p>
            <strong>{"3. Funcionalidades de inteligência artificial:"}</strong>
            {" Ao usar o chat de IA do professor, a plataforma pode enviar ao provedor configurado (Gemini ou Groq) a pergunta e o histórico recente da conversa, além de contexto pedagógico consultado para responder. Esse contexto pode incluir nomes, ano escolar, idade, frequência, notas gerais, competências e observações de até 200 alunos, dados de competências, e registros de até 300 tarefas atribuídas, incluindo título, data de entrega, status, nota e feedback. O recurso de análise individual envia dados pedagógicos do aluno selecionado. O operador deve validar a base legal, o contrato, a retenção, o uso pelo provedor e as configurações aplicáveis antes de habilitar esses recursos em produção. Evite dados pessoais que não sejam necessários."}
          </p>
          <p>
            <strong>{"4. Acesso e segurança:"}</strong>
            {" O acesso aos registros deve se limitar às pessoas autorizadas pelas permissões da conta. A plataforma utiliza controles técnicos de autenticação, sessão e proteção de requisições, mas nenhum sistema conectado à internet pode garantir risco zero."}
          </p>
          <p>
            <strong>{"5. Retenção e compartilhamento:"}</strong>
            {" Os dados devem ser mantidos pelo período necessário às finalidades educacionais, administrativas e às obrigações aplicáveis. O compartilhamento deve se limitar ao necessário para operar o serviço, cumprir obrigações legais ou atender a solicitações autorizadas."}
          </p>
          <p>
            <strong>{"6. Direitos e solicitações:"}</strong>
            {" Para consultar, corrigir ou solicitar informações sobre o tratamento dos seus dados, entre em contato com a instituição responsável pela sua conta ou com o responsável pela proteção de dados indicado por ela. A solicitação poderá exigir confirmação de identidade e observar os requisitos legais aplicáveis."}
          </p>
          <p>
            <strong>{"7. Atualizações desta política:"}</strong>
            {" Esta página descreve informações gerais sobre o uso da plataforma e deve ser validada e complementada pela instituição responsável, incluindo sua identificação, canais de contato e regras efetivas de retenção e de uso dos provedores integrados."}
          </p>
        </div>
        <div className={"button-area"}>
          <a
            href={"/login"}
            className={"btn-secondary-dash"}
            style={styleFrom("text-decoration: none; padding: 12px 40px;")}
          >
            <i className={"fas fa-arrow-left"}></i>
            {" VOLTAR"}
          </a>
        </div>
      </div>
    </LoadingElement>
  );
}
