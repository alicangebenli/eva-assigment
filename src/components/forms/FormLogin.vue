<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <template v-if="!isLoading">
      <Input placeholder="testusername" type="text" label="Email" @onChange="({value})=> forms.Email = value"
             :default-value="forms.Email"/>
      <div class="mt-2"></div>
      <Input placeholder="Password" type="text" label="Username" @onChange="({value})=> forms.Password = value"
             :default-value="forms.Password"/>
      <div class="mt-2"></div>
      <Button label="Login" @click="onSubmit"/>
    </template>
    <div v-else class="h-48 flex justify-center items-center">
      <Loading/>
    </div>
  </form>
</template>
<script setup lang="ts">
import {ref} from "vue";
import Input from "@/components/core/Input/Input.vue";
import Button from "@/components/core/Button/Button.vue";
import useAuth from "@/application/useAuth.ts";
import Loading from "@/components/shared/Loading.vue";

const {isLoading, login} = useAuth();
const forms = ref({
  "Email": "homework@eva.guru",
  "Password": "Homeworkeva1**",
})

const onSubmit = () => {
  login(forms.value)
}
</script>