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

      subject: `🏗️ Novo Orçamento | ${data.nome}`,

      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="
  margin:0;
  padding:40px 20px;
  background:#f3f4f6;
  font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">

<table width="700" cellpadding="0" cellspacing="0" border="0"
style="
  background:#ffffff;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 12px 35px rgba(0,0,0,.12);
">

<tr>
<td>

<img
  src="https://grupomvconstrutora.com.br/assets/logomv.png"
  alt="MV Construtora"
  style="
    width:100%;
    display:block;
    background:#111;
  "
>

</td>
</tr>

<tr>
<td style="padding:40px;">

<p style="
  margin:0;
  color<h1 style="
  margin:10px 0 30px;
  color:#111827;
  font-size:32px;
">
Solicitação de Orçamento
</h1>

<div style="
  background:#fafafa;
  border:1px solid #eeeeee;
  border-radius:14px;
  padding:25px;
">

<div style="margin-bottom:22px;">
  <p style="margin:0;color:#888;font-size:12px;">CLIENTE</p>
  <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#111;">
    ${data.nome}
  </p>
</div>

<div style="margin-bottom:22px;">
  <p style="margin:0;color:#888;font-size:12px;">E-MAIL</p>
  <p style="margin:4px 0 0;font-size:16px;color:#111;">
    ${data.email}
  </p>
</div>

<div>
  <p style="margin:0;color:#888;font-size:12px;">TELEFONE</p>
  <p style="margin:4px 0 0;font-size:16px;color:#111;">
    ${data.telefone}
  </p>
</div>

</div>

<div style="
  margin-top:30px;
  background:#fff7f7;
  border-left:5px solid #dc2626;
  border-radius:12px;
  padding:25px;
">

<p style="
  margin:0 0 15px;
  font-weight:bold;
  color:#111;
  font-size:18px;
">
Mensagem do Cliente
</p>

<p style="
  margin:0;
  line-height:1.9;
  color:#444;
  font-size:15px;
  white-space:pre-line;
">
${data.mensagem}
</p>

</div>

<div style="
  margin-top:30px;
  text-align:center;
">

<a
  href="mailto:${data.email}"
  style="
    display:inline-block;
    background:#dc2626;
    color:#ffffff;
    text-decoration:none;
    padding:14px 24px;
    border-radius:10px;
    font-weight:bold;
  "
>
Responder Cliente
</a>

</div>

</td>
</tr>

<tr>
<td style="
  background:#111111;
  padding:">
Locações • Transportes • Terraplanagem • Gestão de Obras
</p>

<p style="
  margin:25px 0 0;
  color:#d1d5db;
">
📧 atendimento@grupomvconstrutora.com.br
</p>

<p style="
  margin:8px 0;
  color:#d1d5db;
">
📞 (98) 99236-8928
</p>

<p style="
  margin:8px 0;
  color:#d1d5db;
">
🌐 grupomvconstrutora.com.br
</p>

<p style="
  margin-top:25px;
  color:#888;
  font-size:12px;
">
Mensagem enviada automaticamente pelo site da MV Construtora.
</p>

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
