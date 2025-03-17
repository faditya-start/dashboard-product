<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Product permissions
            'view-products',
            'create-products',
            'edit-products',
            'delete-products',
            
            // Order permissions
            'view-orders',
            'create-orders',
            'edit-orders',
            'delete-orders',
            
            // Report permissions
            'view-reports',
            
            // User management permissions
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'slug' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'Admin', 'slug' => 'admin']);
        $adminRole->permissions()->attach(Permission::all());

        $userRole = Role::create(['name' => 'User', 'slug' => 'user']);
        $userRole->permissions()->attach(
            Permission::whereIn('slug', [
                'view-products',
                'view-orders',
                'create-orders',
                'view-reports'
            ])->get()
        );
    }
} 