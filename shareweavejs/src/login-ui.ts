// @ts-expect-error (add types later, it's a svelte component class)
import Login from 'frontend/src/lib/webcomponents/build'
// @ts-expect-error
globalThis.Login = Login

export default function renderLoginComponent() {

}
