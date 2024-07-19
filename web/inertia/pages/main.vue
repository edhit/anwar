<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue'
import Footer from './../components/Footer.vue'
</script>

<template>
  <Head title="Настройки Яндекс" />
  <Navbar />
  <main>
    <div class="container">
      <h1 class="display-5 mb-4">Все функции</h1>
      <div class="row">
        <div class="col-sm-6 p-2">
          <div class="card border-danger">
            <div class="card-body">
              <h5 class="card-title">Настройки Яндекс</h5>
              <p class="card-text">Необходимые настройки для работы с API Яндекс.Маркет</p>
              <a href="/yandex" class="btn btn-danger">Перейти</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 p-2">
          <div class="card border-success">
            <div class="card-body">
              <h5 class="card-title">Популярный товар</h5>
              <p class="card-text">Поиск популярного товара из файла поставщика в Яндекс.Маркет</p>
              <a href="/popular" class="btn btn-success">Перейти</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 p-2">
          <div class="card border-secondary">
            <div class="card-body">
              <h5 class="card-title">Стоп слова</h5>
              <p class="card-text">Удалить строки из файла Excel по ключивым словам</p>
              <a href="/stopwords" class="btn btn-secondary">Перейти</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 p-2">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">Автоматика</h5>
              <p class="card-text">Извлечь ифнормацию из страницы товара яндекс</p>
              <a href="/automatics" class="btn btn-warning">Перейти</a>
            </div>
          </div>
        </div>

        <div class="col-sm-6 p-2">
          <div class="card border-primary">
            <div class="card-body">
              <h5 class="card-title"><b>Скоро новая функция!!</b></h5>
              <p class="card-text">
                А пока можешь почитать инструкцию по функциям, которые здесь есть
              </p>
              <a href="/instructions" class="btn btn-primary">Читать</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
