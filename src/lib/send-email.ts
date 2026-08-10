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
<title>Novo Orçamento</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f4f5;
  font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="700" cellpadding="0" cellspacing="0" border="0" style="
  background:#ffffff;
  border-radius:16px;
  overflow:hidden;
  box-shadow:0 10px 35px rgba(0,0,0,.08);
">

<!-- CABEÇALHO -->

<tr>
<td align="center" style="
  background:#111111;
  padding:35px 25px;
  border-bottom:5px solid #dc2626;
">

<img
  src="https://grupomvconstrutora.com.br/assets/logomv.png"
  alt="MV Construtora"
  style="
    width:180px;
    max-width:100%;
    height:auto;
    display:block;
    margin:auto;
  "
>

</td>
</tr>

<!-- TÍTULO -->

<tr>
<td style="padding:40px;">

<h1   margin-top:15px;
  line-height:1.7;
  font-size:15px;
">
Um visitante enviou uma solicitação através do formulário do site da MV Construtora.
</p>

<!-- DADOS -->

<table width="100%" cellpadding="12" cellspacing="0" style="
  margin-top:25px;
  border:1px solid #e5e7eb;
  border-radius:10px;
  background:#fafafa;
">

<tr>
<td width="150">
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
  background:#fafafa;
  border-left:6px solid #dc2626;
  padding:22px;
  border-radius:8px;
">

<p style="
  color:#111827;
  font-size:16px;
  font-weight:bold;
  margin:0 0 12px 0;
">
Mensagem
</p>

<p style="
  margin:0;
  color:#374151;
  line-height:1.8;
  white-space:pre-line;
">
${data.mensagem}
</p>

</div>

</td>
</tr>

<!-- RODAPÉ -->

<tr>
<td style="
  background:#111111;
  color:#d4d4d8;
  text-align:center;
  padding:35px 25px;
">

<p style="
  margin:0;
  color:#ffffff;
  font-size:20px;
  font-weight:bold;
">
MV CONSTRUTORA
</p>

<p style="
  margin:15px 0;
  line-height:1.8;
">
Locações • Transportes • Terraplanagem • Gestão de Obras
</p>

<p style="margin:0;line-height:1.8;">
📧 atendimento@grupomvconstrutora.com.br
</p>

<p style="margin:0;line-height:1.8;">
📞 (98) 99236-8928
</p>

<p style="margin:0;line-height:1.8;">
🌐 www.grupomvconstrutora.com.br
</p>

<p style="
  margin-top:20px;
  font-size:12px;
  color:#a1a1aa;
">
Este e-mail foi gerado automaticamente pelo formulário do site.
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
