import { LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function Termos({ data, handlers }) {
  const {} = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"login-wrapper"} root={true}>
          <div className={"login-card"}>
            <div className={"termos-header"}>
              <img
                src={"/images/logo3-white.png"}
                alt={"AnalisAI"}
                style={styleFrom("height: 40px;")}
              />
              <h2>{"Termos de Serviço"}</h2>
            </div>
            <div className={"termos-scroller"}>
              <p>
                <strong>{"1. Aceitação:"}</strong>
                {
                  " Ao acessar o AnalisAI, você concorda com estes Termos. Se não concordar, não utilize a plataforma."
                }
              </p>
              <p>
                <strong>{"2. Uso do Sistema:"}</strong>
                {[
                  " O AnalisAI é uma ferramenta de análise de avanços educacionais. ",
                  "O serviço pode ser modificado ou descontinuado a qualquer ",
                  "momento visando a melhoria da experiência pedagógica.",
                ].join("")}
              </p>
              <p>
                <strong>{"3. Conta e Segurança:"}</strong>
                {[
                  " Você é responsável por manter seus dados de acesso seguros. ",
                  "Qualquer atividade na sua conta é de sua inteira ",
                  "responsabilidade. Recomendamos o uso de senhas fortes.",
                ].join("")}
              </p>
              <p>
                <strong>{"4. Propriedade Intelectual:"}</strong>
                {[
                  " Todo o conteúdo do AnalisAI pertence ao SENAI. É proibido ",
                  "copiar, vender ou usar comercialmente qualquer parte desta ",
                  "interface ou lógica de dados sem autorização prévia.",
                ].join("")}
              </p>
              <p>
                <strong>{"5. Limitação de Responsabilidade:"}</strong>
                {[
                  ' O sistema é fornecido "como está". O SENAI não se ',
                  "responsabiliza por decisões tomadas exclusivamente com base nas ",
                  "análises automáticas geradas, sendo estas ferramentas de apoio ",
                  "ao docente.",
                ].join("")}
              </p>
              <p>
                <strong>{"6. Proteção de Dados:"}</strong>
                {[
                  " O tratamento de dados pessoais de alunos e professores segue ",
                  "rigorosamente a LGPD, sendo utilizados estritamente para fins ",
                  "educacionais e de monitoramento de competências.",
                ].join("")}
              </p>
            </div>
            <div className={"button-area"}>
              <a
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  history.back();
                }}
                className={"btn-secondary-dash"}
                style={styleFrom("text-decoration: none; padding: 12px 40px;")}
              >
                <i className={"fas fa-arrow-left"}></i>
                {" VOLTAR\n                "}
              </a>
            </div>
          </div>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
