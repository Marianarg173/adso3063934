<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'kind',
        'weight',
        'age',
        'breed',
        'location',
        'description',
        'active',
        'status',
        'owner_id', // AÑADIR ESTO
    ];

    // RELACIÓN: una mascota pertenece a un usuario (dueño)
    public function owner()
    {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }

    // Relación con adopciones
    public function adoptions()
    {
        return $this->hasOne(Adoption::class);
    }
}
