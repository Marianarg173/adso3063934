{{-- <x-guest-layout>
    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="('Password')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Reset Password') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}
@extends('layouts.home')

@section('title', 'Forgot your password: Larapets 🐶')

@section('content')
    <section class=" bg-[#0006] rounded-lg w-4/12 p-6 flex flex-col gap-4 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4-x1">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M48,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Zm92,54.5L120,117V96a8,8,0,0,0-16,0v21L84,110.5a8,8,0,0,0-5,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,140,110.5ZM246,115.64A8,8,0,0,0,236,110.5L216,117V96a8,8,0,0,0-16,0v21l-20-6.49a8,8,0,0,0-4.95,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,246,115.64Z"></path></svg>
    Password Reset
        </h1>
            <div class="card w-full max-w-sm">
            <form method="POST" action="{{ route('password.store') }}" class="card-body">
                @csrf
                <input type="hidden" name="token" value="{{ $request->route('token') }}">

                <label class="label">Email:</label>
                <input type="text" class="input bg-[#fff9] w-full" name="email" placeholder="Email@example.com" value="{{ old('email') }}" />
                @error('email')
                    <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                @enderror

                  <label class="label">Password:</label>
                <input type="password" class="input bg-[#fff9] w-full" name="password" placeholder="New Password" value="{{ old('password') }}" />
                @error('password')
                    <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                @enderror

                <label class="label">Password Confirmation:</label>
                <input type="password" class="input bg-[#fff9] w-full" name="password_confirmation" placeholder="Confirm New Password" value="{{ old('password_confirmation') }}" />
                @error('password_confirmation')
                    <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                @enderror

                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Reset Password</button>
            </form>
        </div>
    </section>
@endsection