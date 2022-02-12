// @ts-expect-error
import { Login } from "frontend/src/lib/webcomponents/build";

interface LoginResult {
  web3Provider: any;
}
export default function renderLoginComponent(): Promise<LoginResult> {
  return new Promise((resolve, reject) => {
    const render = () => {
      if (document.getElementById("shareweave-login-modal-container")) return;
      const modal = document.createElement("div");
      modal.id = "shareweave-login-modal-container";
      const modalShadow = modal.attachShadow({ mode: "open" });
      const loginModal = new Login({
        target: modalShadow,
      });
      document.body.appendChild(modal);
      loginModal.$set({ show: true });
      let loggedIn;
      const off = loginModal.$on("login", (event: { detail: any }) => {
        loggedIn = true;
        loginModal.$set({ show: false });
        resolve(event.detail);
      });
    };
    document.readyState === "complete"
      ? render()
      : window.addEventListener("load", () => render);
  });
}
