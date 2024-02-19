import Router, {
  Router as RouterDefault,
  BlockConstructable,
} from "./Router.ts";
import { expect } from "chai";
import sinon from "sinon";

describe("Router", () => {
  let router: RouterDefault;
  global.window.history.back = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    router = new RouterDefault("#app");
    Router.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement("div"));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  describe(".back()", () => {
    it("should render a page on history back action", () => {
      Router.use("/", BlockMock).start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it("should render a page on start", () => {
    Router.use("/", BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it("should not attempt to render a block if the route is not found", () => {
    const pathname = "/unknown";
    Router.start();

    Router.go(pathname);

    expect(getContentFake.callCount).to.eq(1);
  });

  describe(".forward()", () => {
    it("should render a page on history forward action", () => {
      Router.use("/", BlockMock).start();

      Router.forward();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe(".go()", () => {
    const path = "/about";

    it("should go to the page with the correct path", () => {
      Router.use("/", BlockMock).start();

      Router.go(path);

      expect(window.location.pathname).to.eq(path);
    });

    it("should render a page on go action", () => {
      Router.use("/", BlockMock).start();

      Router.go(path);

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe(".use()", () => {
    it("should add a new route to the routes array", () => {
      const pathname = "/path";

      router.use(pathname, BlockMock);

      expect(router["routes"].length).to.eq(1);
    });
  });
});
