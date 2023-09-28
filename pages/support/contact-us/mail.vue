<template>
  <div>
    <NuxtLayout>
      <template v-slot:header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="white"
            @click="goBack"
            class="cursor-pointer"
          />
          <p class="text-white text-xl font-bold text-center w-full">
            Send us a mail
          </p>
        </div>
      </template>

      <div
        class="flex flex-col w-full h-full justify-center p-4 items-center gap-2"
      >
        <img src="/images/contact-us.jpg" class="w-[15rem] rounded-3xl" />
        <div class="text-center flex flex-col gap-4">
          <h3 class="text-gray-800 font-bold text-xl">
            Send us your complaint
          </h3>
          <!-- <p class="text-gray-800 font-thin text-sm">
              Our Phone lines are open from
              <span class="font-normal">8:00 AM</span>
              to
              <span class="font-normal">5:00PM</span>
            </p> -->

          <form
            class="flex flex-col gap-4 items-center"
            @submit.prevent="sendEmail"
          >
            <input
              placeholder="Enter your email"
              type="email"
              required
              class="border border-gray-500 focus:border-gray-500 focus:outline-gray-500 p-2 w-full rounded-md"
              v-model="complaint.email"
            />
            <input
              placeholder="Enter your full name"
              required
              class="border border-gray-500 focus:border-gray-500 focus:outline-gray-500 p-2 w-full rounded-md"
              v-model="complaint.full_name"
            />
            <input
              placeholder="Title"
              required
              class="border border-gray-500 focus:border-gray-500 focus:outline-gray-500 p-2 w-full rounded-md"
              v-model="complaint.title"
            />
            <textarea
              class="border border-gray-500 focus:border-gray-500 focus:outline-gray-500 rounded-md p-2 w-full"
              placeholder="Enter description.."
              v-model="complaint.description"
            >
            </textarea>
            <button
              class="border border-gray-500 focus:border-gray-500 focus:outline-gray-500 rounded-md p-2 w-[6rem] bg-[#003399] text-white"
              type="submit"
              >Send Mail</button
            >
          </form>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import { reactive } from "vue";
// import { Email } from "@/assets/smtp/smtp.js";
const $router = useRouter();
const goBack = () => $router.back();
const complaint = reactive({
  email: "",
  title: "",
  full_name: "",
  description: "",
});

const sendEmail = async () => {
  try {
    // const res = await Email.send({
    //   Host: "smtp.elasticemail.com",
    //   To: "eokocha0@gmail.com",
    //   From: complaint.email,
    //   name: complaint.full_name,
    //   Subject: complaint.title,
    //   Body: complaint.description,
    // });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
