// @ts-expect-error svelte client-side component, should add types later
import Login from "frontend/src/lib/webcomponents/build/index.js"
interface LoginResult {
  web3Provider: any
}
export default function renderLoginComponent(): Promise<LoginResult> {
  return new Promise((resolve, reject) => {
    const render = () => {
      if (document.getElementById("shareweave-login-modal-container")) return
      const modal = document.createElement("div")
      modal.id = "shareweave-login-modal-container"
      const modalShadow = modal.attachShadow({ mode: "open" })
      const loginModal = new Login({
        target: modalShadow,
      })
      document.body.appendChild(modal)
      loginModal.$set({ show: true })
      let loggedIn
      const callback = (event: { detail: any }) => {
        loggedIn = true
        loginModal.$set({ show: false })
        resolve(event.detail)
      }
      if (true) callback({ detail: { web3Provider: window.ethereum } })
      const off = loginModal.$on("login", callback)
    }
    document.readyState === "complete"
      ? render()
      : window.addEventListener("load", () => render)
  })
}
