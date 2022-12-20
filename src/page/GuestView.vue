<template>
  <div class="q-pa-lg pagemargin">
    <div
      class="q-ma-md q-gutter-sm row justify-between"
      style="max-width: 500px"
    >
      <q-input v-model="userName" label="name" />
      <q-input v-model="userPass" type="password" label="pass" />
    </div>
    <div class="q-pa-md q-gutter-sm" style="max-width: 600px">
      <q-editor
        style="max-height: 100px"
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

    <q-space />

    <q-card
      flat
      bordered
      class="my-card q-ma-sm"
      v-show="isShow"
      style="max-width: 600px"
      v-for="(item, index) in commentList"
      :key="index"
    >
      <q-card-section>
        <div class="row items-center no-wrap" style="height: 10px">
          <div class="col">
            <div class="text-subtitle2">작성자 이름 : {{ item.name }}</div>
          </div>

          <div class="row">
            <div class="text-subtitle2" style="padding-top: 10px">
              {{ item.updatedate }}
            </div>
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section
                      @click="commentPrompt(item.commentID, item.pass, 1)"
                      >Delete comment</q-item-section
                    >
                  </q-item>
                  <q-item clickable>
                    <q-item-section
                      @click="commentPrompt(item.commentID, item.pass, 2)"
                      >방명록 수정</q-item-section
                    >
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="displayprompt(item.commentID)"
                      >Add comment</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-html="item.content" />
      <q-space />
      <hr style="border: 0.3px dashed lightblue" v-show="item.isComment" />
      <q-card-section class="q-ml-md q-mt-sm" v-show="item.isComment">
        <div class="row guestComment">
          <span class="material-symbols-outlined"> arrow_right_alt </span>
          <div v-html="item.comment"></div>
        </div>
      </q-card-section>
    </q-card>

    <q-pagination
      class="q-mt-md"
      v-model="changePage"
      min="1"
      :max="totalPage"
      :max-pages="6"
      direction-links
      :to-fn="changePagaeNumber(changePage)"
    />
  </div>
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
          @keyup.enter="commentDelete(pass)"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Delete" v-close-popup @click="commentDelete(pass)" />
        <q-btn flat label="Cancel" v-close-popup @click="cancelPress" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="alert" @keyup.enter="alert = false">
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

  <InputDialogVue
    :popuptitle="popuptitle"
    :promptpopup="inputpopup"
    @comment="commentSave"
  />
</template>

<script>
import { ref, reactive } from "vue";
import Api from "../api/Api";
import InputDialogVue from "../components/InputDialog.vue";

export default {
  components: {
    InputDialogVue,
  },
  setup() {
    let commentList = reactive([]);

    let comment = ref("");
    let userName = ref("");
    let userPass = ref("");
    let prompt = ref(false);
    let alert = ref(false);
    let deleteIndexTemp = -1;
    let deletePassTemp = "";
    let inPutPass = ref("");
    let isShow = ref(false);
    let currentPage = ref(1);
    let changePage = ref(1);
    let inputpopup = ref(false);
    let popuptitle = ref("");
    let savecommentIndex = -1;
    let totalPage = ref(1);
    let isClickMenu = 0;

    async function savecomment(issave) {
      let saveContent = new FormData();
      let body = `{ "content":${JSON.stringify(comment.value)},
                "name" : "${userName.value}",
                "pass" : "${userPass.value}"
            }`;
      console.log(body);
      saveContent.append("guestInfo", body);
      let result = await Api.saveGuest(saveContent);
      init();
      getGuestList();
    }

    function init() {
      console.log("list size..");
      console.log(commentList.length);
      comment.value = "";
      userName.value = "";
      userPass.value = "";
      console.log(commentList);
    }

    function changePagaeNumber() {
      console.log("currentPage " + currentPage.value);
      console.log("changePage " + changePage.value);

      if (changePage.value != currentPage.value) {
        currentPage.value = changePage.value;
        getGuestList();
      }
    }

    async function getGuestList() {
      commentList.splice(0);
      let result = await Api.getGuestList(changePage.value, 5);
      if (result.data.statusCode === 200) {
        let guest = result.data.data.guestList;
        if (guest.length > 0) {
          isShow.value = true;
        }
        guest.forEach((item, index) => {
          let isShowComment = false;
          if (item.comment != null) {
            isShowComment = true;
          }
          commentList.push({
            key: index,
            content: item.content,
            name: item.name,
            pass: item.pass,
            updatedate: item.updatedate,
            comment: item.comment,
            isComment: isShowComment,
            commentID: item.id,
          });
        });

        totalPage.value = result.data.data.totalCount / 5;
        totalPage.value = Math.ceil(totalPage.value); // 소수점 자리 숫자가 있을경우 올림 해서 페이지 표시하도록 한다.
        console.log("result totalcount " + totalPage.value);
      }
    }

    function commentPrompt(index, pass, ismenu) {
      isClickMenu = ismenu;
      prompt.value = true;
      deleteIndexTemp = index;
      deletePassTemp = pass;
      inputpopup.value = false;
      console.log("isClickMenu " + isClickMenu);
    }

    async function commentDelete() {
      prompt.value = false;
      let deleteContent = new FormData();
      if (isClickMenu === 1) {
        if (inPutPass.value === deletePassTemp) {
          console.log("delete" + deleteIndexTemp);
          let body = `{ "id": ${deleteIndexTemp},
                "content" : ""
            }`;
          console.log(body);
          deleteContent.append("guestUpdate", body);
          let result = await Api.deleteGuest(deleteContent);
          if (result.data.statusCode === 200) {
            getGuestList();
          }
        } else {
          console.log("different passworld....");
          alert.value = true;
        }
        inPutPass.value = "";
        isClickMenu = 0;
      } else if (isClickMenu === 2) {
        if (inPutPass.value != deletePassTemp) {
          console.log("different passworld....");
          alert.value = true;
        } else {
          popuptitle.value = "수정 comment 입력";
          inputpopup.value = true;
        }
      }
      inPutPass.value = "";
    }

    function cancelPress() {
      inPutPass.value = "";
    }

    function displayprompt(index) {
      console.log("displayprompt");
      popuptitle.value = "comment 답변 입력";
      inputpopup.value = true;

      savecommentIndex = index;
      console.log("index" + savecommentIndex);
    }

    async function commentSave(save) {
      console.log("index ==== " + savecommentIndex);
      console.log("isClickMenu" + isClickMenu);
      if (savecommentIndex > 0 && isClickMenu === 0) {
        if (save === "") {
        } else {
          if (savecommentIndex != -1) {
            let saveContent = new FormData();
            let body = `{ "comment": "${save}",
                "id" : ${savecommentIndex} 
            }`;
            console.log(body);
            saveContent.append("guestComment", body);
            let result = await Api.updateGuestComment(saveContent);
            console.log(result);
            if (result.data.statusCode === 200) {
              getGuestList();
            }
          }
        }
        inputpopup.value = false;
        console.log(save);
        savecommentIndex = -1;
      } else if (isClickMenu === 2) {
        console.log("update guest..." + save);
        let updateGuest = new FormData();
        console.log("delete" + deleteIndexTemp);
        let body = `{ "id": ${deleteIndexTemp},
                "content" : "${save}"
            }`;
        console.log(body);
        updateGuest.append("guestUpdate", body);
        let result = await Api.updateGuest(updateGuest);
        if (result.data.statusCode === 200) {
          getGuestList();
        }
        isClickMenu = 0;
      }
    }

    getGuestList();
    init();

    return {
      commentList,
      userName,
      userPass,
      comment,
      prompt,
      alert,
      inPutPass,
      isShow,
      inputpopup,
      popuptitle,
      changePage,
      totalPage,
      savecomment,
      commentPrompt,
      commentDelete,
      changePagaeNumber,
      displayprompt,
      commentSave,
      cancelPress,
      InputDialogVue,
    };
  },
};
</script>

<style lang="scss" scoped>
.guestComment {
  font-weight: bold;
}
.pagemargin {
  margin: auto;
  width: 100vh;
}
</style>
