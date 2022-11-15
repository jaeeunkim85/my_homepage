<template>
  <div class="q-pa-lg">
    <h3>{{ categoryName }}</h3>
    <div class="row card_container">
      <q-card
        class="my-card q-ma-sm"
        v-for="item in categoryList"
        :key="item.title"
      >
        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
        </q-card-section>

        <q-card-section
          v-html="item.content"
          style="max-height: 100px; text-overflow: ellipsis; overflow: hidden"
        />
      </q-card>
    </div>
    <q-pagination v-model="pageNumber" max="5" direction-links />
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
        1,
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
          });
        });

        console.log(categoryList);
      } else {
        console.log("error list...");
      }
    }

    onMounted(() => {
      console.log("onMounted....");
    });

    watch(
      //카테고리 변경사항을 감지하기 위해 코드 삽입.
      () => route.currentRoute.value.params.category,
      () => {
        setCatecoryName();
      }
    );

    setCatecoryName();
    return {
      categoryName,
      categoryList,
      pageNumber,
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
