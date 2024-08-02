<script setup lang="ts">
	import { number, object, string, type InferType } from "yup";
	import type { FormSubmitEvent } from "#ui/types";

	const toast = useToast();

	const { status, data: count } = await useLazyAsyncData("count", () =>
		$fetch("/api/yandex", {
			method: "GET",
		})
	);

	const columns = [
		{
			key: "businessid",
			label: "Businessid",
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
				label: "Скопировать и вставить в форму",
				icon: "i-ic:round-content-paste-go",
				click: () => {
					state.businessid = row.businessid;
					state.sk = row.sk;
					state.cookie = row.cookie;
				},
			},
			// {
			// 	label: "Удалить",
			// 	icon: "i-heroicons-trash-20-solid",
			// 	click: () => {
			// 		console.log(row);
			// 	},
			// },
		],
	];

	const schema = object({
		businessid: number().required(),
		sk: string().required(),
		cookie: string().required(),
	});

	type Schema = InferType<typeof schema>;

	const state: {
		[key: string]: any;
	} = reactive({
		businessid: "",
		sk: "",
		cookie: "",

		form_error: "",
	});

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		const response = await $fetch("/api/yandex", {
			method: "POST",
			body: event.data,
		});

		if (response) {
			toast.add({ title: "Данные сохранены" });

			state.businessid = "";
			state.sk = "";
			state.cookie = "";

			state.form_error = "";

			refreshNuxtData("count");
		} else {
			toast.add({ title: "Произошла ошибка, попробуй повтороить" });
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
		<div class="p-5">Настройка Яндекс</div>
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
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4 pt-3"
				@submit="onSubmit"
				@error="onError"
			>
				<UFormGroup label="businessid" name="businessid">
					<UInput v-model="state.businessid" />
				</UFormGroup>

				<UFormGroup label="sk" name="sk">
					<UInput v-model="state.sk" />
				</UFormGroup>

				<UFormGroup label="cookie" name="cookie">
					<UTextarea resize class="w-full" v-model="state.cookie" />
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
