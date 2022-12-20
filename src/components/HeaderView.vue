<template>
  <q-header>
    <q-toolbar class="bg-primary text-white q-pa-sm q-gutter-sm">
      <router-link to="/">
        <q-btn flat color="white" label="Main" />
      </router-link>
      <router-link to="/blog/all">
        <q-btn flat color="white" label="MyBlog" />
      </router-link>
      <router-link to="/guest">
        <q-btn flat color="white" label="Guest" />
      </router-link>
      <router-link to="/info">
        <q-btn flat color="white" label="Info" />
      </router-link>
      <q-space />
      <q-btn flat round dense icon="apps" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert">
        <q-menu auto-close>
          <q-list>
            <q-item clickable v-close-popup @click="login">
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="signupPage">
              <q-item-section>
                <q-item-label>Signup</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-dialog v-model="Loginprompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="inputID" autofocus hint="id" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="inPutPass"
          autofocus
          type="password"
          hint="Password"
          @keyup.enter="sendLogin()"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Login" v-close-popup @click="sendLogin()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import api from "../api/Api";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let Loginprompt = ref(false);
    let inputID = ref("");
    let inPutPass = ref("");
    const router = useRouter();

    const login = () => {
      Loginprompt.value = true;
    };

    const sendLogin = async () => {
      let loginInfo = new FormData();
      let body = `{ "id":"${inputID.value}",
                "pass":"${inPutPass.value}"
            }`;
      loginInfo.append("login", body);
      let result = await api.logining(loginInfo);
      Loginprompt.value = false;
    };

    const signupPage = () => {
      router.push({ path: "/signUp" });
    };

    return {
      Loginprompt,
      inputID,
      inPutPass,
      login,
      sendLogin,
      signupPage,
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
