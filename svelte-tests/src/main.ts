import './app.css'
import MainApp from "./MainApp.svelte";

const app = new MainApp({
  target: document.getElementById("app"),
});

export default app
