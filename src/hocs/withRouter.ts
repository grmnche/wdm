import Block from "../utils/Block.ts";
import Router from "../utils/Router.ts";

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<infer P | any> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router?: typeof Router;
  label?: string;
  to: string;
  class?: string;
}
