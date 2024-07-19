<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from './../components/Navbar.vue'
import Footer from './../components/Footer.vue'
import Automatic from './../components/Automatic.vue'

import { InferPageProps } from '@adonisjs/inertia/types'
import type { AutomaticsController } from '../controllers/automatics_controller.ts'

defineProps<{
  commands: InferPageProps<AutomaticsController, 'index'>
}>()
</script>

<template>
  <Head title="Автоматика" />
  <Navbar />
  <main>
    <Automatic :command="commands" />
  </main>
  <Footer />
</template>
