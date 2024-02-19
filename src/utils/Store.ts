import { set } from "./helpers.ts";
import { EventBus } from "./EventBus.ts";
import Block from "./Block.ts";
import { User } from "../api/AuthAPI.ts";
import { ChatInfo } from "../api/ChatsAPI.ts";
import { Message } from "../controllers/MessagesController.ts";

export enum StoreEvents {
  Updated = "updated",
}

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();
console.log("store: ", store);

// @ts-expect-error error
window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<(SP & P) | any>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps! });
        });
      }
    };
  };
}

export default store;
