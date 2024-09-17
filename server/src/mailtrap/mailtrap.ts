import { MailtrapClient } from "mailtrap";
import { config } from "../config/config";

export const client = new MailtrapClient({
  token: config.mailtrap_api_token!,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Restaurant App",
};
