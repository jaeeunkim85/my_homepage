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
        v-for="link in links1"
        :key="link.text"
        clickable
        @click="pagechange(link.router)"
      >
        <q-item-section>
          <q-item-label>{{ link.text }}</q-item-label>
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

export default {
  setup() {
    const leftDrawerOpen = ref(true);
    const showing = ref(true);
    const router = useRouter();

    function pagechange(place) {
      console.log(place);
      if (place === "write") {
        router.push("/blog/" + place);
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

    return {
      leftDrawerOpen,
      showing,
      pagechange,

      links1: [
        { text: "Vue 3", router: "vue3" },
        { text: "Spring Boot", router: "springboot" },
        { text: "Data Base", router: "database" },
        { text: "Java Script", router: "javascript" },
        { text: "HTML & CSS", router: "htmlcss" },
        { text: "Cloud", router: "cloud" },
        { text: "자격증준비", router: "aws" },
        { text: "기타", router: "etc" },
        { text: "글쓰기", router: "write" },
      ],
    };
  },
};
</script>

<style scoped></style>
