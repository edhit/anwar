<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue';
import Footer from './../components/Footer.vue';

defineProps<{
  commands: string
}>()
</script>

<template>
    <Head title="Команда сохранена" />
    <Navbar />
    <main>
        <div class="container my-5">
  <div class="p-5 text-center bg-body-tertiary rounded-3">
    <h1 class="text-body-emphasis">Команда для запуска программы сохранена!</h1>
    <p class="col-lg-8 mx-auto fs-5 text-muted">
       Если программа не запустилась автоматически, открой командную строку и введи эту команду <div class="pt-3 pb-3"><code>{{ commands }}</code></div>После этого, нужно будет подождать 😊😊😊
    </p>
    <div class="d-inline-flex gap-2 mb-5 mt-3">
      <a href="javascript:window.location.href=window.location.href" class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
        Запустить еще одну команду
      </a>
      <a href ="/" class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
        Вернуться на главную страницу
      </a>
    </div>
  </div>
</div>    </main>
<Footer />
</template>

