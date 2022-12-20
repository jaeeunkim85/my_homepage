<template>
  <q-dialog v-model="promptpopup" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ popuptitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-editor
          style="min-height: 70px"
          v-model="address"
          :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
          }"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup @click="closepopup" />
        <q-btn flat label="OK" v-close-popup @click="saveclosepopup" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";

export default {
  name: "InputDialog",
  props: {
    popuptitle: String,
    promptpopup: Boolean,
  },
  setup(props, context) {
    let address = ref("");
    props.promptpopup = false;
    const { emit } = context;

    function closepopup() {
      console.log(props.promptpopup);
      address.value = "";
      emit("comment", address.value);
    }

    function saveclosepopup() {
      console.log("comment " + address.value);
      emit("comment", address.value);
      address.value = "";
    }

    return {
      address,
      closepopup,
      saveclosepopup,
    };
  },
};
</script>

<style></style>
