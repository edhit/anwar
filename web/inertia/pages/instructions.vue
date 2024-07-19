<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue'
import Footer from './../components/Footer.vue'

defineProps<{
  dirname: []
}>()
</script>

<template>
  <Head title="Инструкция" />
  <Navbar />
  <main>
    <div class="container">
      <h1 class="display-5 mb-4">Инструкция</h1>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Настройка Яндекс
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Для того, чтобы делать запросы в Яндекс и использовать функцию
                <a href="/popular">"популярный товар"</a>, нужно указать secret key, businessid и
                COOKIE. <br /><br />Внизу есть инструкция, как можно получить эти данные
              </p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  Открой Кабинет продавца в
                  <a href="https://partner.market.yandex.ru/">Яндекс.Маркет</a>
                </li>
                <li class="list-group-item">Перейди в "товары"->"каталог"</li>
                <li class="list-group-item">Нажми на "загрузить товары"->"один товар"</li>
                <li class="list-group-item">
                  Наведи мышь на поле ввода, потом нажми "правая кнопка мыши"->"просмотр кода
                  элемента"
                </li>
                <li class="list-group-item">
                  Наверху ввыбери вкладку Network(или сеть). Потом, введи любое значение в поле и
                  отправь, и в списке внизу, найди <code>search-market-sku</code>
                </li>
                <li class="list-group-item">
                  В появившемся окне, скопируй <b>COOKIE, secret key(sk)</b> и вставь
                  <a href="/yandex">сюда</a>
                </li>
                <li class="list-group-item">
                  Номер <b>businessid</b> можно получить из url-адреса кабинета продавца, после
                  <i>https://partner.market.yandex.ru/business/</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Популярный товар
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Это функция выбирает товар из файла поставщика, и ищет по параметрам нужный товар.
                Для ее корректной работы, запоните все поля. <br /><br /><a href="/popular"
                  >->Нажми на меня<-</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Стоп слова
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Это функция отсеивает товар по стоп словам. Эти товары не будут добавлены в новый файл.<br /><br />
                Для корректной работы этой функции, используй файл, который был создан внутри этой
                программы. Например из функции <a href="/popular">"популярной товар"</a
                ><br /><br /><a href="/stopwords">->Нажми на меня<-</a>
              </p>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Автоматика
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Эта функция будет сама переходить на страницу Яндекса, и получать из нее информацию.<br /><br />
                Для корректной работы этой функции, используй файл, который был создан внутри этой
                программы. Например из функции <a href="/popular">"популярной товар"</a
                ><br /><br /><a href="/automatics">->Нажми на меня<-</a>
              </p>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Запуск программы
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Чтобы запустить программу, скопируй код внизу<br /><br />
                <code
                  >{{ dirname[0] }} & cd <text v-for="item in dirname">{{ item }}/</text>web & npm
                  run dev</code
                >
                <br /><br />
                Создай на рабочем столе текстовый файл и вставь этот код, потом переменуй его на:
                <br /><br />
                <code>start.bat</code>
                <br /><br />или<br /><br />
                Вставь его в командную строку
              </p>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Обновление программы
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>
                Чтобы обновить программу, скопируй код внизу<br /><br />
                <code
                  >{{ dirname[0] }} & cd <text v-for="item in dirname">{{ item }}/</text> & git
                  pull</code
                >
                <br /><br />
                Создай на рабочем столе текстовый файл и вставь этот код, потом переменуй его на:
                <br /><br />
                <code>update.bat</code>
                <br /><br />или<br /><br />
                Вставь его в командную строку
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
