import { LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function Termos({ data, handlers }) {
  const {} = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"login-wrapper"} root={true}>
          <LoadingElement as="div" className={"login-card"}>
            <LoadingElement as="div" className={"termos-header"}>
              <LoadingElement
                as="img"
                src={"/images/logo3-white.png"}
                alt={"AnalisAI"}
                style={styleFrom("height: 40px;")}
              />
              <LoadingElement as="h2">{"Termos de Serviço"}</LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"termos-scroller"}>
              <LoadingElement as="p">
                <LoadingElement as="strong">{"1. Aceitação:"}</LoadingElement>
                {
                  " Ao acessar o AnalisAI, você concorda com estes Termos. Se não concordar, não utilize a plataforma."
                }
              </LoadingElement>
              <LoadingElement as="p">
                <LoadingElement as="strong">
                  {"2. Uso do Sistema:"}
                </LoadingElement>
                {[
                  " O AnalisAI é uma ferramenta de análise de avanços educacionais. ",
                  "O serviço pode ser modificado ou descontinuado a qualquer ",
                  "momento visando a melhoria da experiência pedagógica.",
                ].join("")}
              </LoadingElement>
              <LoadingElement as="p">
                <LoadingElement as="strong">
                  {"3. Conta e Segurança:"}
                </LoadingElement>
                {[
                  " Você é responsável por manter seus dados de acesso seguros. ",
                  "Qualquer atividade na sua conta é de sua inteira ",
                  "responsabilidade. Recomendamos o uso de senhas fortes.",
                ].join("")}
              </LoadingElement>
              <LoadingElement as="p">
                <LoadingElement as="strong">
                  {"4. Propriedade Intelectual:"}
                </LoadingElement>
                {[
                  " Todo o conteúdo do AnalisAI pertence ao SENAI. É proibido ",
                  "copiar, vender ou usar comercialmente qualquer parte desta ",
                  "interface ou lógica de dados sem autorização prévia.",
                ].join("")}
              </LoadingElement>
              <LoadingElement as="p">
                <LoadingElement as="strong">
                  {"5. Limitação de Responsabilidade:"}
                </LoadingElement>
                {[
                  ' O sistema é fornecido "como está". O SENAI não se ',
                  "responsabiliza por decisões tomadas exclusivamente com base nas ",
                  "análises automáticas geradas, sendo estas ferramentas de apoio ",
                  "ao docente.",
                ].join("")}
              </LoadingElement>
              <LoadingElement as="p">
                <LoadingElement as="strong">
                  {"6. Proteção de Dados:"}
                </LoadingElement>
                {[
                  " O tratamento de dados pessoais de alunos e professores segue ",
                  "rigorosamente a LGPD, sendo utilizados estritamente para fins ",
                  "educacionais e de monitoramento de competências.",
                ].join("")}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"button-area"}>
              <LoadingElement
                as="a"
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  history.back();
                }}
                className={"btn-secondary-dash"}
                style={styleFrom("text-decoration: none; padding: 12px 40px;")}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-arrow-left"}
                ></LoadingElement>
                {" VOLTAR\n                "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
