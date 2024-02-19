import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport from "./HTTPTransport.ts";
import { expect } from "chai";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let httpInstance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    httpInstance = new HTTPTransport("/auth");
  });

  afterEach(() => {
    requests = [];
  });

  it(".get() should send GET request", () => {
    httpInstance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("Get");
  });

  it(".post() should send POST request with data", () => {
    const testData = { key: "value" };
    httpInstance.post("/user", testData);

    const [request] = requests;
    expect(request.method).to.eq("Post");
  });

  it(".put() should send PUT request with data", () => {
    const testData = { key: "value" };
    httpInstance.put("/user", testData);

    const [request] = requests;

    expect(request.method).to.eq("Put");
  });

  it(".patch() should send PATCH request with data", () => {
    const testData = { key: "value" };
    httpInstance.patch("/user", testData);

    const [request] = requests;

    expect(request.method).to.eq("Patch");
  });

  it(".delete() should send DELETE request", () => {
    httpInstance.delete("/user");

    const [request] = requests;

    expect(request.method).to.eq("Delete");
  });
});
