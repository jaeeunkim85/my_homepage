<template>
  <q-page-container class="q-pa-lg q-gutter-lg">
    <h3>회원 가입</h3>
    <div class="q-gutter-md" style="max-width: 600px">
      <q-input v-model="inputId" label="id" @blur="checkIDvaled" />

      <q-item-label v-model="isIDcheck" style="color: red; size: 6pt">{{
        checkId
      }}</q-item-label>
      <q-input v-model="inputPass" type="password" label="password" />
      <q-input
        v-model="inputPassCheck"
        type="password"
        label="password - 확인"
        @blur="checkPassWord"
      />
      <q-item-label v-model="isPasscheck" style="color: red; size: 6pt">{{
        checkPass
      }}</q-item-label>
      <q-input v-model="inputName" label="이름" />
      <q-input v-model="inputNickName" label="닉네임" />
      <q-input v-model="inputPhone" label="전화번호" />
      <q-input v-model="inputEmail" label="email" />
    </div>
    <div class="row">
      <q-btn label="회원 가입" color="primary" @click="signUpProcess" />
      <q-btn label="취소" color="primary" @click="cancel" />
    </div>
  </q-page-container>
</template>

<script>
import api from "../api/Api";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let inputId = ref("");
    let inputPass = ref("");
    let inputPassCheck = ref("");
    let inputName = ref("");
    let inputNickName = ref("");
    let inputPhone = ref("");
    let inputEmail = ref("");
    let checkId = ref("");
    let checkPass = ref("");
    let isIDcheck = ref(false);
    let isPasscheck = ref(false);
    const route = useRouter();

    const cancel = () => {
      route.go(-1);
    };

    const signUpProcess = async () => {
      let saveAccount = new FormData();
      console.log("inputId " + inputId);
      saveAccount.append(
        "SignupInfo",
        `{
            "userID": "${inputId.value}",
            "userPassword": "${inputPass.value}",
            "userName": "${inputName.value}",
            "userNickName": "${inputNickName.value}",
            "userPhoneNumber": "${inputPhone.value}",
            "userEmail": "${inputEmail.value}"
          }`
      );
      let result = await api.signupProcess(saveAccount);
      console.log(result);
    };

    const checkIDvaled = () => {
      console.log("checkIDvaled");
      checkId.value = "아이디가 중복입니다.";
      isIDcheck.value = true;
    };

    const checkPassWord = () => {
      isPasscheck.value = true;
      if (inputPass.value === inputPassCheck.value) {
        checkPass.value = "사용 가능합니다.";
      } else {
        checkPass.value = "패스워드가 다릅니다. 다시 확인해주세요.";
      }
    };

    return {
      inputId,
      inputPass,
      inputPassCheck,
      inputName,
      inputNickName,
      inputPhone,
      inputEmail,
      checkId,
      checkPass,
      isIDcheck,
      isPasscheck,
      cancel,
      signUpProcess,
      checkIDvaled,
      checkPassWord,
    };
  },
};
</script>

<style></style>
