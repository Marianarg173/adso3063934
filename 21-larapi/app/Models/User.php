<?php

namespace App\Models;


use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    // 2. AQUÍ ES DONDE SE COPIA: Justo después de abrir la "class"
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Los atributos que se pueden llenar masivamente.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Los atributos que deben ocultarse para JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Formateo de tipos de datos.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
