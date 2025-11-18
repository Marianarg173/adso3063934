@extends('layouts.dashboard')

@section('title', 'Module Users: Larapets 🐈')

@section('content')

{{-- Título --}}
<h1 class="text-4xl font-extrabold text-rose-600 flex items-center gap-3 justify-center pb-6 mb-10">
    
    <span class="p-3 bg-rose-100 rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#E11D48" viewBox="0 0 256 256">
            <path
                d="M128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Zm118.92,92a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212Z">
            </path>
        </svg>
    </span>

    <span class="tracking-wide">Module Users</span>
</h1>

{{-- Tabla estilo adopción --}}
<div class="overflow-x-auto rounded-3xl border border-pink-200 bg-pink-50 shadow-xl p-4">

    <table class="table w-full">
        <thead>
            <tr class="bg-pink-200/60 text-pink-700 text-sm uppercase tracking-wide">
                <th class="font-semibold py-4">🐾 Id</th>
                <th class="font-semibold py-4">📄 Document</th>
                <th class="font-semibold py-4">🐶 Full Name</th>
                <th class="font-semibold py-4">✉️ Email</th>
                <th class="font-semibold py-4 text-center">Actions</th>
            </tr>
        </thead>

        <tbody class="text-gray-700 bg-white/70">
            @foreach($users as $user)
            <tr class="hover:bg-pink-100 transition border-b border-pink-100">
                <td class="py-4 font-bold text-pink-700">{{ $user->id }}</td>
                <td class="py-4">{{ $user->document }}</td>
                <td class="py-4 font-medium flex items-center gap-2 text-rose-600">
                    <span class="text-lg">🐱</span>
                    {{ $user->fullname }}
                </td>
                <td class="py-4">{{ $user->email }}</td>

                <td class="py-4 flex gap-2 justify-center">

                    <a class="btn btn-sm bg-rose-300 hover:bg-rose-400 text-white border-none shadow-md rounded-full px-5">
                        👁 Show
                    </a>

                    <a class="btn btn-sm bg-amber-300 hover:bg-amber-400 text-black border-none shadow-md rounded-full px-5">
                        ✏️ Edit
                    </a>

                    <a class="btn btn-sm bg-red-400 hover:bg-red-500 text-white border-none shadow-md rounded-full px-5">
                        🗑 Delete
                    </a>

                </td>
            </tr>
            @endforeach

            <tr>
                <td colspan="5" class="py-6">
                    <div class="flex justify-center">
                        {{ $users->links() }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

@endsection
