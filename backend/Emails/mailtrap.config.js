import { ENV_VARS } from "../config/envVars.js";

import { MailtrapClient } from "mailtrap";

export const mailtrapClient = new MailtrapClient({
  token: ENV_VARS.MAILTRAP_API_TOKEN,
});

export const sender = {
  email: "netflix@demomailtrap.co",
  name: "Netflix",
};
