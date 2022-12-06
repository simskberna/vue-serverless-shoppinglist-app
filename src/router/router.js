
import HomeView from "@/views/HomeView.vue"
import SignUpView from "@/views/SignUpView.vue"
import ListView from "@/views/ListView.vue"
export default [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
   
  {
    path: "/signup",
    name: "SignUp",
    component : SignUpView
  },
  {
    path: "/list",
    name: "List",
    component : ListView
  }
];
