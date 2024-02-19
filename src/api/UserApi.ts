import BaseAPI from "./BaseAPI.ts";
import { User } from "./AuthAPI.ts";
import HTTPTransport from "../utils/HTTPTransport.ts";

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  read(id: any): Promise<User> {
    return this.http.get(`/${id}`);
  }

  update(data: any): Promise<User> {
    return this.http.put(`/profile`, data);
  }

  updatePassword(oldPassword: string, newPassword: string): Promise<void> {
    return this.http.put(`/password`, { oldPassword, newPassword });
  }

  uploadAvatar(avatar: FormData): Promise<void> {
    return this.http.put("/profile/avatar", avatar);
  }

  getResources(path: string | undefined) {
    return `${HTTPTransport.API_URL}/resources/${path}`;
  }

  create = undefined;
  delete = undefined;
}

export default new UserAPI();
