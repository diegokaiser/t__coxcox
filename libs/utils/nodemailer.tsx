'use server';

import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.NEXT_PUBLIC__NODEMAILER_server_host;
const SMTP_SERVER_USERNAME =
  process.env.NEXT_PUBLIC__NODEMAILER_server_username;
const SMTP_SERVER_PASSWORD =
  process.env.NEXT_PUBLIC__NODEMAILER_server_password;
const SITE_MAIL_RECIEVER =
  process.env.NEXT_PUBLIC__NODEMAILER_site_mail_reciever;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD
  }
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Hubo un error:', error);
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: html ? html : ''
  });
  return info;
}
