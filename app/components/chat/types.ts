import { ActionConfig } from "@dialectlabs/blinks";
import { Message } from "ai";
import { ChangeEvent, FormEvent } from "react";

export interface UserChat {
  model: string;
  messages: Message[];
  input: string;
  isLoading: boolean;
  clearMessages: () => void,
  handleAppend: (content: string) => void,
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void,
  clearInput: () => void,
  submitMessage: (e: FormEvent<HTMLFormElement>) => void,
  adapter: ActionConfig
}
