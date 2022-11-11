<template>
  <q-page-container>
    <div
      class="q-ma-md q-gutter-sm row justify-between"
      style="max-width: 600px"
    >
      <q-input v-model="userName" label="name" />
      <q-input v-model="userPass" type="password" label="pass" />
    </div>
    <div class="q-pa-md q-gutter-sm" style="max-width: 800px">
      <q-editor
        v-model="comment"
        placeholder="여기에 내용 입력 해주세요."
        :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
        }"
      />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" icon="save" label="Save" @click="savecomment(0)" />

      <q-btn
        color="primary"
        icon="cancel"
        label="Cancel"
        @click="savecomment(1)"
      />
    </div>

    <q-card
      flat
      bordered
      class="my-card bg-grey-1 q-ma-sm"
      style="max-width: 800px"
      v-show="isShow"
      v-for="(item, index) in commentList"
      :key="index"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ item.name }}</div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section @click="commentPrompt(index, item.pass)"
                      >Delete comment</q-item-section
                    >
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Add comment</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-html="item.comment" />
    </q-card>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter Password.</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="inPutPass"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            v-close-popup
            @click="commentDelete(pass)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          패스워드가 틀렸습니다. 다시 확인 해 주세요.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let commentList = ref([]);
    let isShow = ref(false);
    let comment = ref("");
    let userName = ref("");
    let userPass = ref("");
    let prompt = ref(false);
    let alert = ref(false);
    let deleteIndexTemp = -1;
    let deletePassTemp = "";
    let inPutPass = ref("");

    function savecomment(issave) {
      console.log(comment.value);
      console.log(commentList.value.length);

      commentList.value.push({
        name: userName.value,
        comment: comment.value,
        pass: userPass.value,
        index: commentList.value.length,
      });
      console.log(commentList);

      init();
    }

    function init() {
      console.log("list size..");
      console.log(commentList.value.length);
      if (commentList.value.length <= 0) {
        isShow.value = false;
      } else {
        isShow.value = true;
      }
      comment.value = "";
      userName.value = "";
      userPass.value = "";
      console.log("init " + isShow.value);
      console.log(commentList);
    }

    function commentPrompt(index, pass) {
      prompt.value = true;
      deleteIndexTemp = index;
      deletePassTemp = pass;
    }

    function commentDelete() {
      if (inPutPass.value === deletePassTemp) {
        console.log(deleteIndexTemp);
        commentList.value.splice(deleteIndexTemp, 1);
        console.log(commentList);
      } else {
        console.log("different passworld....");
        alert.value = true;
      }
      inPutPass.value = "";
    }

    init();
    return {
      commentList,
      isShow,
      userName,
      userPass,
      comment,
      prompt,
      alert,
      inPutPass,
      savecomment,
      commentPrompt,
      commentDelete,
    };
  },
};
</script>

<style></style>
