<template>
  <div class="q-pa-lg">
    <div class="row card_container">
      <q-card
        class="my-card q-ma-sm"
        v-for="item in categoryList"
        :key="item.title"
        @click="clickDetailpage(item.id)"
        style="cursor: pointer"
      >
        <q-card-section style="background-color: #1976d2; max-height: 80px">
          <div class="text-h7" style="color: white">{{ item.title }}</div>
        </q-card-section>

        <q-card-section
          v-html="item.content"
          style="max-height: 100px; text-overflow: ellipsis; overflow: hidden"
        />
      </q-card>
    </div>
    <q-pagination
      class="q-mt-md"
      v-model="pageNumber"
      max="5"
      direction-links
      :to-fn="changePagaeNumber(pageNumber)"
    />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref, watch, reactive } from "vue";
import Api from "../../api/Api";


export default {
  setup() {
    const route = useRouter();
    const categoryName = ref("");
    let pageNumber = ref(1);
    const categoryList = reactive([]);

    async function setCatecoryName() {
      categoryList.splice(0);
      console.log(route.currentRoute.value.params.category);

      let result = await Api.getCategoryList(
        pageNumber.value,
        6,
        route.currentRoute.value.params.category
      );
      if (result.data.statusCode === 200) {
        let categorylist = result.data.data;
        console.log(categorylist);
        categorylist.forEach((item, index) => {
          categoryList.push({
            key: index,
            title: item.title,
            content: item.content,
            id: item.id,
          });
        });

        console.log(categoryList);
      } else {
        console.log("error list...");
      }
    }

    function clickDetailpage(id) {
      route
        .push({
          name: "detail",
          params: { id: id },
        })
        .catch(() => {});
    }

    function changePagaeNumber() {
      console.log(pageNumber.value);
    }

    onMounted(() => {
      console.log("onMounted....");
    });

    watch(
      //카테고리 변경사항을 감지하기 위해 코드 삽입.
      () => route.currentRoute.value.params.category,
      () => {
        console.log(route.currentRoute.value.params.category);
        setCatecoryName();
      }
    );
    setCatecoryName();
    return {
      categoryName,
      categoryList,
      pageNumber,
      clickDetailpage,
      changePagaeNumber,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.card_container
  max-width: 800px
</style>
