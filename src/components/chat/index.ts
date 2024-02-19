import Block from "../../utils/Block.ts";
import template from "./chat.hbs";
import { withStore } from "../../utils/Store.ts";
import { ChatInfo } from "../../api/ChatsAPI.ts";
import { Button } from "../button/index.ts";
import ChatsController from "../../controllers/ChatsController.ts";

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  protected init() {
    this.children.deleteChat = new Button({
      label: "delete",
      class: "delete-chat-btn",
      events: {
        click: (event) => {
          event?.stopPropagation();
          return ChatsController.delete(this.props.id);
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase);
