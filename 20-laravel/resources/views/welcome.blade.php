@extends('layouts.home')

@section('title', 'Welcome: Larapets')

@section('content')
<section
    class="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl w-[420px] p-8 flex flex-col gap-6 items-center justify-center border border-white/40 text-center mx-auto">

    <!-- LOGO -->
    <img src="{{ asset('photos/logo.png') }}" class="w-[360px] drop-shadow-lg" alt="logo">

    <!-- TEXTO DE BIENVENIDA -->
    <p class="text-gray-800 text-lg font-medium leading-relaxed">
        ¡Hola y bienvenidos a <span class="text-amber-600 font-semibold">Larapets</span>! 🐾<br><br>
        Estamos encantados de que te unas a nuestra comunidad dedicada a dar una segunda oportunidad.<br><br>
        En Larapets creemos que cada animal merece un hogar lleno de amor. Explora, conoce a los
        maravillosos animalitos que esperan una familia, ¡y prepárate para cambiar una vida a través de la adopción
        responsable!
    </p>

    <!-- BOTONES -->
    <div class="flex gap-4 mt-4 justify-center flex-wrap">
        @guest()
        <a class="w-[160px] bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 py-2 transition-all duration-200"
            href="{{ url('login') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM200,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V40A8,8,0,0,0,200,32Z">
                </path>
            </svg>
            Login
        </a>

        <a class="w-[160px] bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 py-2 transition-all duration-200"
            href="{{ url('register') }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z">
                </path>
            </svg>
            Register
        </a>
        @endguest

        @auth()
        <a class="w-[160px] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md flex items-center justify-center py-2 transition-all duration-200"
            href="{{ url('dashboard') }}">
            Dashboard
        </a>
        @endauth
    </div>
</section>
@endsection
