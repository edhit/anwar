<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue';
import Footer from './../components/Footer.vue';

defineProps<{
  commands: string
}>()
</script>

<template>
    <Head title="Настройки Яндекс" />
    <Navbar />
    <main>
        <div class="container my-5">
  <div class="p-5 text-center bg-body-tertiary rounded-3">
    <h1 class="text-body-emphasis">Данные успешно сохранены!</h1>
    <p class="col-lg-8 mx-auto fs-5 text-muted">
        Успешный успех!!! Можно продолжать работать 😎😎😎
    </p>
    <div class="d-inline-flex gap-2 mb-5 mt-3">
      <a href ="/" class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
        Вернуться на главную страницу
      </a>
    </div>
  </div>
</div>   
 </main>
 <Footer />
</template>

