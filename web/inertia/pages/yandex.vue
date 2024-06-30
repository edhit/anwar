<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue';
import Footer from './../components/Footer.vue';
import Yandex from './../components/Yandex.vue';


defineProps<{
  yandex: { cookie: string, sk: string, businessid: string }
}>()
</script>

<template>
    <Head title="Настройки Яндекс" />
    <Navbar />
    <main>
        <Yandex :cookie="yandex.cookie" :sk="yandex.sk" :businessid="yandex.businessid"/>
    </main>
    <Footer />
</template>

