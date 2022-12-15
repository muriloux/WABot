import { Whatsapp } from "venom-bot";

export interface ICommand {
  command: string;
  pattern: RegExp;
  description: string;
  exec: typeof execFunction;
}

declare function execFunction(client: Whatsapp): void;
