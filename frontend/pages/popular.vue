<script setup lang="ts">
	import { number, object, string, type InferType } from "yup";
	import type { FormSubmitEvent } from "#ui/types";

	const toast = useToast();

	const { handleFileInput, files } = useFileStorage();

	const { status, data: count } = await useLazyAsyncData("count", () =>
		$fetch("/api/popular", {
			method: "GET",
		})
	);

	const columns = [
		{
			key: "name",
			label: "Name",
		},
		{
			key: "date",
			label: "Date",
		},
		{
			key: "actions",
		},
	];

	const items = (row: any) => [
		[
			{
				label: "Запустить команду",
				icon: "i-material-symbols:play-circle",
				click: () => {
					$fetch("/api/start", {
						method: "POST",
						body: `${row.command} ${row.id}`,
					});
				},
			},
			{
				label: "Скопировать и вставить в форму",
				icon: "i-ic:round-content-paste-go",
				click: () => {
					state.path_file = row.path_file;
					state.name = row.name;
					state.letter = row.letter;
					state.price = row.price;
					state.type = row.type;
					state.opinion = row.opinion;
					state.rate = row.rate;
				},
			},
			// {
			// 	label: "Удалить",
			// 	icon: "i-heroicons-trash-20-solid",
			// 	click: () => {},
			// },
		],
	];

	const schema = object({
		name: string().required(),
		path_file: string().required(),
		letter: string().required(),
		price: string().required(),
		type: string().required(),
		opinion: number().required(),
		rate: number().required(),
	});

	type Schema = InferType<typeof schema>;

	const state: {
		[key: string]: any;
	} = reactive({
		path_file: "",
		letter: "",
		price: "",
		type: "",
		opinion: 0,
		rate: 0,

		name: "",
		file_error: "",
		form_error: "",
	});

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		const response = await $fetch("/api/popular", {
			method: "POST",
			body: event.data,
		});

		if (response) {
			toast.add({ title: "Данные сохранены" });
			state.name = "";
			state.path_file = "";
			state.letter = "";
			state.price = "";
			state.type = "";
			state.opinion = 0;
			state.rate = 0;

			state.file_error = "";
			state.form_error = "";

			refreshNuxtData("count");
		} else {
			toast.add({ title: "Произошла ошибка, попробуй повтороить" });
		}
	}

	async function submit() {
		if (
			files.value[0].name.split(".")[
				files.value[0].name.split(".").length - 1
			] === "xlsx"
		) {
			const response = await $fetch("/api/test", {
				method: "POST",
				body: {
					files: files.value,
				},
			});

			if (response) {
				state.name = response.name;
				state.path_file = response.path;
			}
		} else {
			state.file_error = "Загрузи файл EXCEL";
		}
	}

	async function onError() {
		schema.validate(state).catch(function (err) {
			state.form_error = err.errors;
		});
	}

	function viewObject(object: any) {
		let text = "";
		for (const key in object) {
			let id = "";
			if (key === "command") id = object["id"];
			const item = `<div><b>${key}:</b> <span class="text-gray-500 dark:text-gray-400 text-sm">${object[key]} ${id}</span></div>`;
			text = text === "" ? `${item}` : `${text}${item}`;
		}

		return text;
	}
</script>

<template>
	<template>
		<UNotifications>
			<template #title="{ title }">
				<span v-html="title" />
			</template>

			<template #description="{ description }">
				<span v-html="description" />
			</template>
		</UNotifications>
	</template>
	<div class="col-span-2 divide-y">
		<div class="p-5">Популярный товар</div>
		<div class="p-5">
			<div v-if="state.form_error != ''">
				<UAlert
					icon="i-ic:twotone-error-outline"
					color="red"
					variant="solid"
					title="Ошибка"
					:description="state.form_error[0]"
					class="mb-5"
				/>
			</div>
			<UAlert
				description="Эта функция не работает без Настройки Яндекса"
				title="Внимание!"
				class="mb-5"
				icon="i-bi:exclamation-triangle"
				color="blue"
			/>
			<div class="grid grid-cols-3 pb-3">
				<div class="col-span-2">
					<label
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						for="file_input"
						>Вставь файл поставщика</label
					>
					<UInput
						type="file"
						size="sm"
						icon="i-heroicons-folder"
						@input="handleFileInput"
						accept=".xlsx"
					/>
					<p
						v-if="state.file_error != ''"
						class="mt-2 text-red-500 dark:text-red-400 text-sm"
					>
						{{ state.file_error }}
					</p>
				</div>
				<div class="col-span-1 px-2">
					<label
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-white"
						for="file_input"
						>s</label
					>
					<UButton
						type="submit"
						@click="submit"
						class="w-full text-center"
						>Загрузить</UButton
					>
				</div>
			</div>
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4 pt-3"
				@submit="onSubmit"
				@error="onError"
			>
				<UFormGroup label="Путь загруженного файла" name="file">
					<UInput v-model="state.path_file" disabled />
				</UFormGroup>

				<UFormGroup label="Название команды" name="name">
					<UInput v-model="state.name" />
				</UFormGroup>

				<UFormGroup
					label="Выбери букву, где находится штрихкод или SKU"
					name="letter"
				>
					<USelect
						v-model="state.letter"
						icon="i-ic:outline-text-rotate-vertical"
						color="white"
						size="sm"
						:options="[
							'A',
							'B',
							'C',
							'D',
							'E',
							'F',
							'G',
							'I',
							'J',
							'K',
							'L',
							'M',
							'O',
							'P',
							'Q',
							'R',
							'S',
							'T',
							'U',
							'V',
							'W',
							'X',
							'Y',
							'Z',
						]"
						placeholder="Буква"
					/>
				</UFormGroup>

				<UFormGroup label="В моем столбце указан:" name="type">
					<USelect
						v-model="state.type"
						icon="i-ic:outline-text-rotate-vertical"
						color="white"
						size="sm"
						:options="['SKU', 'BARCODE']"
						placeholder="Тип"
					/>
				</UFormGroup>

				<UFormGroup
					label="Выбери букву, где находится цена товара"
					name="price"
				>
					<USelect
						v-model="state.price"
						icon="i-ic:outline-text-rotate-vertical"
						color="white"
						size="sm"
						:options="[
							'A',
							'B',
							'C',
							'D',
							'E',
							'F',
							'G',
							'I',
							'J',
							'K',
							'L',
							'M',
							'O',
							'P',
							'Q',
							'R',
							'S',
							'T',
							'U',
							'V',
							'W',
							'X',
							'Y',
							'Z',
						]"
						placeholder="Буква"
					/>
				</UFormGroup>

				<UFormGroup
					label="Всего отзывов на карточке не меньше"
					name="opinion"
				>
					<UInput v-model="state.opinion" />
				</UFormGroup>

				<UFormGroup
					label="Искать товары по рейтингу не меньше"
					name="rate"
				>
					{{ state.rate }}
					<URange
						:min="0"
						:max="5"
						v-model="state.rate"
						:step="0.1"
					/>
				</UFormGroup>

				<UButton type="submit"> Отправить </UButton>
			</UForm>
		</div>
	</div>
	<div class="col-span-2 divide-y">
		<div class="p-5">История</div>
		<div v-if="count">
			<UTable :rows="count" :columns="columns">
				<template #expand="{ row }">
					<div class="p-4">
						<div v-html="viewObject(row)"></div>
					</div>
				</template>
				<template #actions-data="{ row }">
					<UDropdown :items="items(row)">
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-ellipsis-horizontal-20-solid"
						/>
					</UDropdown>
				</template>
			</UTable>
		</div>
	</div>
</template>
