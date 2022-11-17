<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    :width="200"
    :breakpoint="700"
    elevated
  >
    <q-list padding class="text-grey-8">
      <q-item
        class="GNL__drawer-item"
        v-ripple
        v-for="link in categoryList"
        :key="link.index"
        clickable
        @click="pagechange(link.address)"
      >
        <q-item-section>
          <q-item-label>{{ link.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Api from "../api/Api";

export default {
  setup() {
    const leftDrawerOpen = ref(true);
    const showing = ref(true);
    const router = useRouter();
    let categoryList = ref([]);

    function pagechange(place) {
      console.log(place);
      if (place === "write") {
        router.push({
          name: "write",
          params: { option: "write" },
        });
      } else {
        router
          .push({
            name: "blogCategory",
            params: { category: place },
          })
          .catch(() => {});
      }

      watch(
        //카테고리 변경사항을 감지하기 위해 코드 삽입.
        () => router.currentRoute.value.params.category,
        () => {
          // testfunction();
        }
      );
    }

    async function getCategoryList() {
      let result = await Api.getCategory();
      if (result.data.statusCode === 200) {
        let category = result.data.data;
        categoryList.value = category.map((item, index) => {
          return {
            name: item.categoryName,
            address: item.routerName,
          };
        });
        console.log(categoryList.value);
      }
    }
    getCategoryList();

    return {
      leftDrawerOpen,
      showing,
      categoryList,
      pagechange,
    };
  },
};
</script>

<style scoped></style>
