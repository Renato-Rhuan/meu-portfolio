import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nome, email, telefone, descricao } = req.body;

  if (!nome || !email || !telefone || !descricao) {
    return res.status(400).json({ message: 'Preencha todos os campos!' });
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.seuprovedor.com',  // Exemplo: smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Site Portfolio" <${process.env.SMTP_USER}>`,
    to: 'renatoclahs12@gmail.com',
    subject: 'Fale comigo - Portfolio',
    text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nDescrição: ${descricao}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao enviar o email.', error: error.toString() });
  }
}
