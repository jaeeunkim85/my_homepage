<template>
  <div class="q-pa-lg">
    <q-field stack-label readonly style="max-width: 800px">
      <div
        class="self-center full-width no-outline"
        tabindex="0"
        style="font-size: 20pt"
      >
        {{ blogDetail.title }}
      </div>
    </q-field>
    <div style="text-align: right; max-width: 800px">
      최종 수정 {{ blogDetail.updateDate }}
      <q-btn square color="primary" icon="edit" size="sm" @click="detailEdit" />
    </div>

    <q-scroll-area class="q-pt-sm" style="height: 1000px; max-width: 800px">
      <div v-html="blogDetail.content"></div>
    </q-scroll-area>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref, watch, reactive } from "vue";
import Api from "../../api/Api";
export default {
  setup() {
    const router = useRouter();
    const blogDetail = reactive([]);
    let blogDetailID = 0;

    async function getDetail(id) {
      let result = await Api.getBlogDetail(id);
      if (result.data.statusCode === 200) {
        console.log(result.data.data);
        blogDetail.title = result.data.data.title;
        blogDetail.content = result.data.data.content;
        blogDetail.createDate = result.data.data.createDate;
        blogDetail.updateDate = result.data.data.updateDate;
        console.log(blogDetail);
      }
    }
    function detailEdit() {
      router.push({
        name: "write",
        params: { option: blogDetailID },
      });
    }

    onMounted(() => {
      console.log(router.currentRoute.value.params.id);
      blogDetailID = router.currentRoute.value.params.id;
      getDetail(blogDetailID);
    });
    return {
      blogDetail,
      detailEdit,
    };
  },
};
</script>

<style></style>
