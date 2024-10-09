import { ChatRequestOptions, CreateMessage } from "ai";
import { Message } from "ai";
import { Dispatch, SetStateAction } from "react";

export interface UserChat {
  model: string;
  messages: Message[];
  input: string;
  isLoading: boolean;
  setInput: Dispatch<SetStateAction<string>>,
  secondSetInput: Dispatch<SetStateAction<string>>,
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  secondSetMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  secondHandleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  secondHandleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  secondAppend: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}
