<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleChange extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'old_role_id',
        'new_role_id',
        'changed_by',
        'reason'
    ];

    /**
     * Get the user that owns the role change.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the old role that was changed.
     */
    public function oldRole()
    {
        return $this->belongsTo(Role::class, 'old_role_id');
    }

    /**
     * Get the new role that was assigned.
     */
    public function newRole()
    {
        return $this->belongsTo(Role::class, 'new_role_id');
    }

    /**
     * Get the user who made the role change.
     */
    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
} 