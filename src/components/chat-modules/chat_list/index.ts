import { ChatInfo } from "../../../api/ChatsAPI.ts";
import Block from "../../../utils/Block.ts";
import { Chat } from "../../chat/index.ts";
import { Link } from "../../link/index.ts";
import template from "./chat_list.hbs";
import ChatsController from "../../../controllers/ChatsController.ts";
import { withStore } from "../../../utils/Store.ts";
import { Input } from "../../input/index.ts";
import { Button } from "../../button/index.ts";

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    this.children.profileLink = new Link({
      to: "/profile",
      label: "Profile",
      class: "to-profile-btn",
    });

    this.children.createChat = new Button({
      label: "New chat",
      class: "create-chat-btn",
      events: {
        click: () => {
          document
            .querySelector(".chat-list-modal-outer")
            ?.classList.add("active");
        },
      },
    });

    this.children.createChatBtn = new Button({
      label: "Add chat",
      class: "btn btn-dark",
      events: {
        click: () => {
          const input = this.children.chatName as Input;
          const chatName = input.getValue();

          ChatsController.create(chatName);
        },
      },
    });

    this.children.search = new Input({
      name: "message",
      type: "text",
      placeholder: "Search",
      inputError: "At least one letter",
    });

    this.children.chatName = new Input({
      name: "chat_name",
      type: "text",
      placeholder: "Enter chat name",
      value: "",
    });
  }

  protected componentDidUpdate(newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map((data) => {
      return new Chat({
        ...data,
        title: data.title,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
