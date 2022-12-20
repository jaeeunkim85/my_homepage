<template>
  <q-page-container>
    <div class="q-pa-md q-gutter-md" style="max-width: 800px">
      <q-input v-model="inputTitle" label="title" />
      <div style="max-width: 300px">
        <q-select
          v-model="select"
          :options="optionList"
          label="Select Category"
        />
      </div>
      <q-editor
        v-model="editor"
        style="min-height: 500px"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify'],
            },
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource', 'insert_img'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
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
import { useRouter } from "vue-router";
import Api from "../../api/Api";
import { onMounted, ref, watch, reactive } from "vue";
import router from "../../router/router";
export default {
  setup() {
    let editor = ref("");
    let fileadd = ref("");
    let select = ref("");
    let inputTitle = ref("");
    let optionList = ref([]);
    let imageName = "";
    let fileList = [];
    const route = useRouter();
    let editorOption;

    async function savecontents(save) {
      if (save === 0) {
        console.log(editor.value);

        let saveContent = new FormData();

        if (editorOption === "write") {
          let body = `{ "title":"${inputTitle.value}",
                "content" : ${JSON.stringify(editor.value)},
                "category" : "${select.value}",
                "imageName" : "${imageName}"
            }`;
          console.log(body);
          saveContent.append("blogInfo", body);
          let result = await Api.createBlog(saveContent);

          if (result.data.statusCode === 200) {
            editor.value = "";
            inputTitle.value = "";
            select.value = "";
          }
        } else {
          let body = `{ "title":"${inputTitle.value}",
                "content" : ${JSON.stringify(editor.value)},
                "category" : "${select.value}",
                "imageName" : "${imageName}",
                "id" : ${editorOption}
            }`;
          console.log(body);
          saveContent.append("blogEditInfo", body);
          let result = await Api.editBlog(saveContent);

          if (result.data.statusCode === 200) {
            router.go(-1);
          }
        }
      } else {
      }
    }

    function fileChange(event) {
      const files = event.target.files;
      this.addFiles(files);
    }
    async function addFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const src = await this.readFiles(files[i]);
        files[i].src = src;
        fileList.push(files[i]);
      }
    }

    async function readFiles(files) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(files);
      });
    }
    function handleRemove(index) {
      this.fileList.splice(index, 1);
    }

    function insertImg() {
      // insertImg method
      const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".png, .jpg"; // file extensions allowed
      let file;

      input.onchange = async (_) => {
        const files = Array.from(input.files);
        file = files[0];
        let formData = new FormData();
        formData.append("files", file);

        // 여기서 파일을 서버로 업로드 해서 url  받아서 사용하는 평식으로 바꿀수 있을것 같은데...
        // 추가 확인이 필요하다.
        console.log(formData);
        let result = await Api.boardImageFiles(formData);
        console.log(result);
        if (result.data.statusCode === 200) {
          const imageData = result.data.data;
          console.log(imageData);
          editor.value =
            editor.value +
            '<div><img src="' +
            imageData.filePullPath +
            '" /></div>';
          imageName = imageData.FileName;
        }
        console.log(editor);
      };
      input.click();
    }

    async function getCategoryList() {
      let result = await Api.getCategory();
      if (result.data.statusCode === 200) {
        let category = result.data.data;
        category.forEach((item) => {
          if (item.routerName != "write") {
            optionList.value.push(item.categoryName);
          }
        });
      }
      console.log(optionList.value);
    }

    async function editBlogDetail(id) {
      console.log(id);
      let response = await Api.getBlogDetail(id);
      if (response.data.statusCode === 200) {
        let blogData = response.data.data;
        inputTitle.value = blogData.title;
        editor.value = blogData.content;
        select.value = blogData.categoryName;
      }
    }
    getCategoryList();

    onMounted(() => {
      console.log(route.currentRoute.value.params.option);
      editorOption = route.currentRoute.value.params.option;
      if (editorOption === "write") {
        inputTitle.value = "";
        editor.value = "";
        select.value = "";
      } else {
        editBlogDetail(editorOption);
      }
    });

    watch(
      //카테고리 변경사항을 감지하기 위해 코드 삽입.
      () => route.currentRoute.value.params.option,
      () => {
        // testfunction();
      }
    );

    return {
      savecontents,
      insertImg,
      fileChange,
      editor,
      fileadd,
      optionList,
      select,
      inputTitle,
    };
  },
};
</script>

<style></style>
