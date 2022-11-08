<template>
  <div class="q-pa-lg">
    <h3>{{ categoryName }}</h3>
    <div class="row card_container">
      <q-card
        class="my-card q-ma-sm"
        v-for="item in categoryList"
        :key="item.title"
      >
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
        </q-card-section>

        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
    <q-pagination v-model="pageNumber" max="5" direction-links />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref, watch, reactive } from "vue";
export default {
  setup() {
    const route = useRouter();
    const categoryName = ref("");
    let pageNumber = ref(1);
    const categoryList = reactive([
      { title: "title 1", content: "content1" },
      { title: "title 2", content: "content2" },
      { title: "title 3", content: "content3" },
      { title: "title 4", content: "content4" },
      { title: "title 5", content: "content5" },
      { title: "title 6", content: "content6" },
      { title: "title 7", content: "content7" },
      { title: "title 8", content: "content8" },
      { title: "title 9", content: "content9" },
    ]);

    function setCatecoryName() {
      console.log(route.currentRoute.value.params.category);
      categoryName.value = route.currentRoute.value.params.category;
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
