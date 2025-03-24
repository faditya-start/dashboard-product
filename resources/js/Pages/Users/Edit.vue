<template>
  <AdminLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Edit User
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900">
            <form @submit.prevent="submit">
              <div class="space-y-6">
                <!-- Name -->
                <div>
                  <InputLabel for="name" value="Name" />
                  <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                  />
                  <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <!-- Email -->
                <div>
                  <InputLabel for="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                  />
                  <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <!-- Password -->
                <div>
                  <InputLabel for="password" value="Password (leave blank to keep current)" />
                  <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    autocomplete="new-password"
                  />
                  <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <!-- Role -->
                <div>
                  <InputLabel for="role_id" value="Role" />
                  <select
                    id="role_id"
                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    v-model="form.role_id"
                    required
                  >
                    <option value="">Select a role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                      {{ role.name }}
                    </option>
                  </select>
                  <InputError class="mt-2" :message="form.errors.role_id" />
                </div>
              </div>

              <div class="flex items-center justify-end mt-4">
                <Link
                  :href="route('users.index')"
                  class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  Cancel
                </Link>

                <PrimaryButton
                  class="ml-4"
                  :class="{ 'opacity-25': form.processing }"
                  :disabled="form.processing"
                >
                  Update User
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import InputError from '@/Components/InputError.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
  user: Object,
  roles: Array,
})

const form = useForm({
  name: props.user.name,
  email: props.user.email,
  password: '',
  role_id: props.user.roles[0]?.id || '',
})

const submit = () => {
  form.put(route('users.update', props.user.id), {
    onFinish: () => form.reset('password'),
  })
}
</script> 