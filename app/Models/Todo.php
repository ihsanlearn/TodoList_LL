<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // Kolom yang dapat diisi mass-assignable
    protected $fillable = ['task', 'description'];
}
