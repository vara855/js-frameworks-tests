import ChatMessage from "./chat-message";
import { render, screen, cleanup } from "@solidjs/testing-library";

describe("<ChatMessage/>", () => {
  afterEach(() => cleanup());
  test("should render correct classnames depends on the meesage type", () => {
    let api = render(() => (
      <ChatMessage
        message={{
          message: "Hello",
          color: "black",
          type: "message",
          user: {
            email: "",
            name: "varadotdev",
          },
        }}
      />
    ));

    expect(api.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chat-message"
        >
          <span
            style="color: black;"
          >
            varadotdev
          </span>
           
          <span>
            Hello
          </span>
        </div>
      </div>
    `);
    expect(api.getByText("varadotdev")).toBeDefined();

    api = render(() => (
      <ChatMessage
        message={{
          message: "Hello",
          color: "black",
          type: "admin-message",
          user: {
            email: "",
            name: "varadotdev",
          },
        }}
      />
    ));

    expect(api.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chat-message chat-message__admin"
        >
          <span
            style="color: black;"
          >
            varadotdev
          </span>
           
          <span>
            Hello
          </span>
        </div>
      </div>
    `);
  });
});
