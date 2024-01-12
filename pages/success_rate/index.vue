<template>
    <div>
        <NuxtLayout name="success-rate">
            <div class="flex flex-col gap-[1rem] px-[0.5rem] mt-3">

                <!-- time filters  -->
                <div class="flex justify-between">
                    <success_rate-time-filter-btn text="Today" :active-text="activeFilter" @update-filter="updateFilter" />
                    <success_rate-time-filter-btn text="Last 1 hour" :active-text="activeFilter"
                        @update-filter="updateFilter" />
                    <success_rate-time-filter-btn text="Last 10 mins" :active-text="activeFilter"
                        @update-filter="updateFilter" />
                </div>

                <!-- tabs fo the various transaction types -->
                <success_rate-tabs />

            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

const activeFilter = ref("Today")

const updateFilter = (text: string) => {
    activeFilter.value = text;
}


import { useMyAuthDataStore } from "../../stores/authData";

// import { useMyAuthDataStore } from "../stores/authData.ts";

const { $decryptKey, $encryptKey } = useNuxtApp();
const route = useRoute();

const dataStore = useMyAuthDataStore();

const $router = useRouter();

watchEffect(() => {
    if (route?.query?.data) {
        dataStore.setDataState(
            JSON.parse(
                $decryptKey(route.query.data?.replace(/-/g, "+").replace(/_/g, "/"))
                // route?.query?.data
            )
        );
    }
});

const goBack = () => $router.back();

const userToken = ref<string | null>(dataStore.token);

</script>

<style scoped></style>