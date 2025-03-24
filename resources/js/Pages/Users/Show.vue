<template>
  <AdminLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          User Details
        </h2>
        <div class="flex space-x-3">
          <Link
            v-if="$page.props.auth.user.can.edit-users"
            :href="route('users.edit', user.id)"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Edit User
          </Link>
          <Link
            :href="route('users.index')"
            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
          >
            Back to Users
          </Link>
        </div>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- User Information -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">User Information</h3>
                <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.name }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Created At</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ new Date(user.created_at).toLocaleDateString() }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ new Date(user.updated_at).toLocaleDateString() }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Role Management -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Role Management</h3>
                <div v-if="user.roles.length > 0" class="mb-4">
                  <h4 class="text-sm font-medium text-gray-500 mb-2">Current Role</h4>
                  <div class="flex items-center space-x-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {{ user.roles[0].name }}
                    </span>
                    <button
                      v-if="$page.props.auth.user.can.edit-users"
                      @click="confirmRemoveRole"
                      class="text-sm text-red-600 hover:text-red-900"
                    >
                      Remove Role
                    </button>
                  </div>
                </div>
                <div v-else>
                  <h4 class="text-sm font-medium text-gray-500 mb-2">No Role Assigned</h4>
                </div>

                <div v-if="$page.props.auth.user.can.edit-users" class="mt-4">
                  <h4 class="text-sm font-medium text-gray-500 mb-2">Assign New Role</h4>
                  <form @submit.prevent="assignRole" class="flex space-x-2">
                    <select
                      v-model="form.role_id"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a role</option>
                      <option v-for="role in availableRoles" :key="role.id" :value="role.id">
                        {{ role.name }}
                      </option>
                    </select>
                    <PrimaryButton
                      :class="{ 'opacity-25': form.processing }"
                      :disabled="form.processing"
                    >
                      Assign
                    </PrimaryButton>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Role Confirmation Modal -->
    <Modal :show="showRemoveRoleModal" @close="closeRemoveRoleModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900">
          Are you sure you want to remove this role?
        </h2>

        <p class="mt-1 text-sm text-gray-600">
          This will remove the user's current role. You can assign a new role later.
        </p>

        <div class="mt-6 flex justify-end">
          <SecondaryButton @click="closeRemoveRoleModal">Cancel</SecondaryButton>

          <DangerButton
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="removeRole"
          >
            Remove Role
          </DangerButton>
        </div>
      </div>
    </Modal>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Modal from '@/Components/Modal.vue'
import DangerButton from '@/Components/DangerButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'

const props = defineProps({
  user: Object,
  roles: Array,
})

const showRemoveRoleModal = ref(false)

const form = useForm({
  role_id: '',
})

const availableRoles = computed(() => {
  return props.roles.filter(role => 
    !props.user.roles.some(userRole => userRole.id === role.id)
  )
})

const confirmRemoveRole = () => {
  showRemoveRoleModal.value = true
}

const closeRemoveRoleModal = () => {
  showRemoveRoleModal.value = false
}

const removeRole = () => {
  form.delete(route('users.remove-role', props.user.id), {
    preserveScroll: true,
    onSuccess: () => closeRemoveRoleModal(),
  })
}

const assignRole = () => {
  form.post(route('users.assign-role', props.user.id), {
    preserveScroll: true,
    onSuccess: () => form.reset('role_id'),
  })
}
</script> 