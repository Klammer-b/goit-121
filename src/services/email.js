import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { getEnv } from '../helpers/getEnv.js';
import { ENV_VARS } from '../constants/env.js';
import { EMAIL_TEMPLATES_DIR } from '../constants/paths.js';

const transport = nodemailer.createTransport({
  host: getEnv(ENV_VARS.SMTP_HOST),
  port: getEnv(ENV_VARS.SMTP_PORT),
  secure: true,
  auth: {
    user: getEnv(ENV_VARS.SMTP_USER),
    pass: getEnv(ENV_VARS.SMTP_PASSWORD),
  },
});

await transport.verify();

const sendResetPasswordTemplate = fs
  .readFileSync(
    path.join(EMAIL_TEMPLATES_DIR, 'send-reset-password-email-template.html'),
  )
  .toString();

export const sendResetPasswordEmail = async ({ email, payload }) => {
  const template = Handlebars.compile(sendResetPasswordTemplate);

  const html = template(payload);

  await transport.sendMail({
    from: getEnv(ENV_VARS.SMTP_USER),
    to: email,
    subject: 'Reset your password!',
    html,
  });
};
