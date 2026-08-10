import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

type ContactData = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export const sendEmail = createServerFn({
  method: "POST",
})
  .validator((data: ContactData) => data)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    return await resend.emails.send({
      from: "MV Construtora <atendimento@grupomvconstrutora.com.br>",

      to: ["atendimento@grupomvconstrutora.com.br"],

      replyTo: data.email,

      subject: `Novo orçamento - ${data.nome}`,

      html: `
        <h2>Novo contato pelo site</h2>

        <p><strong>Nome:</strong> ${data.nome}</p>

        <p><strong>E-mail:</strong> ${data.email}</p>

        <p><strong>Telefone:</strong> ${data.telefone}</p>

        <hr />

        <p><strong>Mensagem:</strong></p>

        <p>${data.mensagem}</p>
      `,
    });
  });
