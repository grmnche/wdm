import template from "./chat_feed.hbs";
import MessagesController, {
  Message as MessageInfo,
} from "../../../controllers/MessagesController.ts";
import { withStore } from "../../../utils/Store.ts";
import { Button } from "../../button/index.ts";
import Block from "../../../utils/Block.ts";
import { Input } from "../../input/index.ts";
import { Message } from "../../message/index.ts";
import { UserPreview } from "../../user_preview/index.ts";
import controller from "../../../controllers/ChatsController.ts";
import { UserAction } from "../../modals/user_action/index.ts";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
  onload: () => void;
  onsubmit: () => void;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({ ...props });
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.messageField = new Input({
      type: "text",
      placeholder: "Message",
      name: "message",
    });

    this.children.userPreview = new UserPreview({
      userName: "Chatname",
    });

    this.children.userAction = new UserAction({});

    this.children.chatSettingsBtn = new Button({
      class: "chat-feed-btn chat-settings-btn",
      type: "button",
      events: {
        click: () => {
          document
            .querySelector(".modal-user-action")
            ?.classList.toggle("show");
        },
      },
    });

    this.children.sendMessageBtn = new Button({
      class: "chat-feed-btn send-message-btn",
      type: "button",
      events: {
        click: () => {
          const input = this.children.messageField as Input;
          const message = input.getValue();

          input.setValue("");

          MessagesController.sendMessage(this.props.selectedChat!, message);
        },
      },
    });

    this.children.userID = new Input({
      name: "user-id",
      type: "text",
      placeholder: "Enter user ID",
    });

    this.children.addUserBtn = new Button({
      class: "add-user-btn btn btn-dark",
      label: "Add user",
      type: "button",
      events: {
        click: async () => {
          const chatId = this.props.selectedChat;
          const userIdInput = this.children.userID as Input;
          const userId = Number(userIdInput.getValue());

          if (chatId && userId) {
            await controller.addUserToChat(chatId, userId);
            const users = await controller.getChatUsers(chatId);
            console.log("users: ", users);

            document
              .querySelector(".add-user-modal")
              ?.classList.toggle("disable");

            alert("User added");
          } else {
            alert("There's no user with this ID");
          }
        },
      },
    });

    this.children.userToDelete = new Input({
      name: "user_to_delete",
      type: "text",
      placeholder: "Enter username",
    });

    this.children.deleteUserBtn = new Button({
      label: "delete",
      class: "delete-user-btn btn btn-dark",
      events: {
        click: async () => {
          const usernameInput = this.children.userToDelete as Input;
          const username = usernameInput.getValue();
          const chatId = this.props.selectedChat;

          if (username) {
            try {
              const users = await controller.getChatUsers(chatId);
              const user = users?.find((user) => user.first_name === username);

              if (user) {
                await controller.removeUserFromChat(chatId, user.id);

                const users = await controller.getChatUsers(chatId);
                console.log(users);

                document
                  .querySelector(".remove-user-modal")
                  ?.classList.add("disable");

                alert("user removed");
              } else {
                console.log("There's no user with this login");
              }
            } catch (error) {
              console.error("Error while retrieving user list:", error);
            }
          } else {
            console.log("Please enter login");
          }
        },
      },
    });

    this.children.addFilesBtn = new Button({
      class: "chat-feed-btn add-files-btn",
      type: "button",
    });
  }

  private prevent() {
    document
      .querySelector(".message-form")
      ?.addEventListener("submit", (event) => {
        alert("g");
        event.preventDefault();
        const input = this.children.messageField as Input;
        const message = input.getValue();

        if (message.trim()) {
          input.setValue("");
          MessagesController.sendMessage(this.props.selectedChat!, message);
        }
      });
  }

  protected componentDidUpdate(newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    const messages = props.messages;

    const updatedMessages = messages.map((data) => {
      const isMine = data.user_id === props.userId;
      const userName = isMine ? "You" : "Other User";

      return new Message({ ...data, isMine, userName });
    });

    return updatedMessages;
  }

  protected render(): DocumentFragment {
    this.prevent();

    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
