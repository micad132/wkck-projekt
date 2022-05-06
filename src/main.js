import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Toast, { POSITION } from "vue-toastification";
import naive from "naive-ui";
import "vue-toastification/dist/index.css";
import naive from "naive-ui";

library.add(fas);

createApp(App)
  .use(router)
  .use(naive)
  .use(Toast, {
    position: POSITION.TOP_LEFT,
  })
  .component("fa", FontAwesomeIcon)
  .mount("#app");
