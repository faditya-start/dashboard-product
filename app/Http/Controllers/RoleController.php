<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-roles')->only(['index', 'show']);
        $this->middleware('permission:create-roles')->only(['create', 'store']);
        $this->middleware('permission:edit-roles')->only(['edit', 'update']);
        $this->middleware('permission:delete-roles')->only('destroy');
        $this->middleware('permission:assign-permissions')->only(['assignPermission', 'removePermission']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string|max:255',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        DB::beginTransaction();
        try {
            $role = Role::create([
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);

            $role->permissions()->sync($validated['permissions']);

            DB::commit();

            return redirect()->route('roles.index')
                ->with('success', 'Role created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to create role.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        $role->load('permissions');
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Roles/Show', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $role->load('permissions');
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'description' => 'nullable|string|max:255',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        DB::beginTransaction();
        try {
            $role->update([
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);

            $role->permissions()->sync($validated['permissions']);

            DB::commit();

            return redirect()->route('roles.index')
                ->with('success', 'Role updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update role.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role->name === 'Super Admin') {
            return back()->with('error', 'Cannot delete Super Admin role.');
        }

        DB::beginTransaction();
        try {
            $role->permissions()->detach();
            $role->delete();

            DB::commit();

            return redirect()->route('roles.index')
                ->with('success', 'Role deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete role.');
        }
    }

    /**
     * Assign a permission to the role.
     */
    public function assignPermission(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permission_id' => 'required|exists:permissions,id'
        ]);

        try {
            $role->permissions()->attach($validated['permission_id']);

            return back()->with('success', 'Permission assigned successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to assign permission.');
        }
    }

    /**
     * Remove a permission from the role.
     */
    public function removePermission(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permission_id' => 'required|exists:permissions,id'
        ]);

        try {
            $role->permissions()->detach($validated['permission_id']);

            return back()->with('success', 'Permission removed successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to remove permission.');
        }
    }
} 