<script setup lang="ts">
	import { array, number, object, string, type InferType } from "yup";
	import type { FormSubmitEvent } from "#ui/types";

	const toast = useToast();

	const { handleFileInput, files } = useFileStorage();

	const { status, data: count } = await useLazyAsyncData("count", () =>
		$fetch("/api/stopwords", {
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
					state.words = row.words;
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
		words: array().required(),
	});

	type Schema = InferType<typeof schema>;

	const state: {
		words: string[];
		[key: string]: any;
	} = reactive({
		path_file: "",
		words: [],

		name: "",
		file_error: "",
		form_error: "",
		input_word: "",
	});

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		const response = await $fetch("/api/stopwords", {
			method: "POST",
			body: event.data,
		});

		if (response) {
			toast.add({ title: "Данные сохранены" });
			state.name = "";
			state.path_file = "";
			state.words = [];

			state.input_word = "";
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
		<div class="p-5">Стоп-слова</div>
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
			<div class="grid grid-cols-3 pb-3">
				<div class="col-span-2">
					<label
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						for="file_input"
						>Вставь созданный файл</label
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
					label="Вставь стоп-слово и нажми Crtl+Enter"
					name="input_word"
				>
					<UInput
						v-model="state.input_word"
						@keyup.ctrl.enter="
							if (state.input_word != '')
								state.words.push(state.input_word.trim());
							state.input_word = '';
						"
					/>

					<div>
						<UBadge
							class="cursor-pointer me-2 my-1"
							color="white"
							variant="solid"
							v-for="item in state.words"
							@click="
								state.words = state.words.filter(
									(value) => value !== item
								)
							"
							>{{ item }}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								width="15px"
								height="15px"
							>
								<path
									fill="#F44336"
									d="M21.5 4.5H26.501V43.5H21.5z"
									transform="rotate(45.001 24 24)"
								/>
								<path
									fill="#F44336"
									d="M21.5 4.5H26.5V43.501H21.5z"
									transform="rotate(135.008 24 24)"
								/>
							</svg>
						</UBadge>
					</div>
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
