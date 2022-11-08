<template>
  <q-page-container>
    <div class="q-pa-md q-gutter-md" style="max-width: 800px">
      <q-input v-model="inputTitle" label="title" />
      <q-editor
        v-model="editor"
        style="min-height: 500px; max-height: 800px"
        :toolbar="[
          ['left', 'center', 'right', 'justify'],
          ['bold', 'italic', 'underline', 'strike'],
          ['undo', 'redo'],
          ['insert_img'],
        ]"
        :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
          insert_img: {
            tip: '사진 첨부',
            label: '사진넣기',
            icon: 'photo',
            handler: insertImg,
          },
        }"
      />
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-input
          id="input"
          type="file"
          ref="fileInput"
          class="file-upload-input"
          @change="fileChange"
          accept="image/*"
          multiple
        />
        <!-- 업로드된 리스트 -->
        <div class="file-upload-list" id="productAddFile">
          <div
            class="file-upload-list__item"
            v-for="(files, index) in addFileList"
            :key="index"
          >
            <div class="file-upload-list__item__data">
              <img
                class="file-upload-list__item__data-thumbnail"
                :src="files.src"
              />
              <div class="file-upload-list__item__data-name">
                {{ files.name }}
              </div>
            </div>
            <button
              class="file-upload-list__item__btn-remove"
              @click="handleRemoveaddfile(index)"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-btn
        color="primary"
        icon="save"
        label="Save"
        @click="savecontents(0)"
      />

      <q-btn
        color="primary"
        icon="cancel"
        label="Cancel"
        @click="savecontents(1)"
      />
    </div>
  </q-page-container>
</template>

<script>
import { onMounted, ref, watch, reactive } from "vue";
export default {
  setup() {
    let editor = ref("--------");
    let fileadd = ref("");

    function savecontents(save) {
      if (save === 0) {
        console.log(editor.value);
      } else {
        editor.value = "";
      }
    }
    function insertImg() {
      // insertImg method
      const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".png, .jpg"; // file extensions allowed
      let file;
      input.onchange = (_) => {
        const files = Array.from(input.files);
        file = files[0];

        // lets load the file as dataUrl
        const reader = new FileReader();
        let dataUrl = "";
        reader.onloadend = function () {
          dataUrl = reader.result;

          // append result to the body of your post
          editor.value =
            editor.value + '<div><img src="' + dataUrl + '" /></div>';
        };
        console.log(editor);
        reader.readAsDataURL(file);
      };
      input.click();
    }
    return {
      savecontents,
      insertImg,
      editor,
      fileadd,
    };
  },
};
</script>

<style></style>
