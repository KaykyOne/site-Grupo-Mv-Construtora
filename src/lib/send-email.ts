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
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="
  margin:0;
  padding:0;
  background:#f3f4f6;
  font-family:Arial, Helvetica, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <table width="700" cellpadding="0" cellspacing="0"
          style="
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 10px 35px rgba(0,0,0,.08);
          ">

          <!-- TOPO -->

          <tr>
            <td
  style="
    background:#111111;
    text-align:center;
    padding:30px;
  ">

  <img
    src="https://www.grupomvconstrutora.com.br/logo-email.png"
    alt="MV Construtora"
    style="
      max-width:520px;
      width:100%;
      height:auto;
            </td>
          </tr>

          <!-- TITULO -->

          <tr>
            <td style="padding:35px;">

              <h1 style="
                margin:0;
                color:#dc2626;
                font-size:28px;
              ">
                Novo orçamento recebido
              </h1>

              <p style="
                color:#666;
                font-size:15px;
                line-height:1.7;
                margin-top:12px;
              ">
                Um cliente enviou uma solicitação através do formulário do site.
              </p>

              <!-- DADOS -->

              <table
                width="100%"
                cellpadding="12"
                cellspacing="0"
                style="
                  margin-top:25px;
                  background:#fafafa;
                  border:1px solid #e5e7eb;
                  border-radius:10px;
                "
              >

                <tr>
                  <td width="140">
                    <strong>Nome</strong>
                  </td>

                  <td>
                    ${data.nome}
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>E-mail</strong>
                  </td>

                  <td>
                    ${data.email}
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Telefone</strong>
                  </td>

                  <td>
                    ${data.telefone}
                  </td>
                </tr>

              </table>

              <!-- MENSAGEM -->

              <div style="
                margin-top:25px;
                padding:22px;
                background:#fafafa;
                border-left:5px solid #dc2626;
                border-radius:8px;
              ">

                <strong style="
                  color:#111;
                  font-size:16px;
                ">
                  Mensagem
                </strong>

                <p style="
                  margin-top:12px;
                  color:#444;
                  line-height:1.8;
                ">
                  ${data.mensagem}
                </p>

              </div>

            </td>
          </tr>

          <!-- RODAPE -->

          <tr>
            <td
              style="
                background:#111111;
                color:#d1d5db;
                text-align:center;
                padding:25px;
                font-size:13px;
              "
            >

              <strong style="color:#ffffff;">
                MV Construtora
              </strong>

              <br><br>

              Locações • Transportes • Terraplanagem • Gestão de Obras

              <br><br>

              📧 atendimento@grupomvconstrutora.com.br

              <br>

              🌐 www.grupomvconstrutora.com.br

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    });
  });
