import API, { ChatsAPI } from "../api/ChatsAPI.ts";
import store from "../utils/Store.ts";
import MessagesController from "./MessagesController.ts";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      for (const chat of chats) {
        try {
          const token = await this.getToken(chat.id);
          await MessagesController.connect(chat.id, token);
        } catch (error) {
          console.error(`Failed to connect to chat ${chat.id}:`, error);
        }
      }

      store.set("chats", chats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
    } catch (error) {
      console.error(`Failed to add user ${userId} to chat ${id}:`, error);
    }
  }

  async removeUserFromChat(id: number | undefined, userId: number | undefined) {
    try {
      await this.api.removeUsers(id, [userId]);
    } catch (error) {
      console.error(`Failed to remove user ${userId} from chat ${id}:`, error);
    }
  }

  async getToken(id: number) {
    try {
      return await this.api.getToken(id);
    } catch (error) {
      console.error(`Failed to get token for chat ${id}:`, error);
      throw error;
    }
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }

  async getChatUsers(chatId: number | undefined) {
    if (chatId === undefined) {
      console.error("Chat ID is undefined");
      return;
    }
    try {
      return await this.api.getUsers(chatId);
    } catch (error) {
      console.error(`Failed to get users for chat ${chatId}:`, error);
      throw error;
    }
  }
}

const controller = new ChatsController();

// @ts-expect-error error
window.chatsController = controller;

export default controller;
