export interface MessageUser {
  id: string;
  name: string;
}

export interface ApiMessage {
  id: string;
  content: string;
  user?: MessageUser;
}

export interface UiMessage {
  id: string;
  content: string;
  user: MessageUser;
}
