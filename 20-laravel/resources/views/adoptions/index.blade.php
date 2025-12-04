@extends('layouts.dashboard')

@section('title', 'Module Pets: Larapets 🐶')

@section('content')

{{-- Título --}}
<h1 class="text-3xl md:text-4xl font-extrabold text-[#5EC9A5] flex items-center gap-3 justify-center pb-6 mb-10">
    <span class="p-3 bg-[#A8F1D0] rounded-2xl shadow-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>
    </span>
    <span class="tracking-wide text-center">Module Pets</span>
</h1>

{{-- Options --}}
<div class="join mx-auto mb-6 flex flex-wrap gap-2 justify-center">
    <a class="btn join-item bg-[#5EC9A5] text-white hover:bg-[#3FA182] shadow-md" href="{{ url('export/pets/pdf') }}">
        Export PDF
    </a>

    <a class="btn join-item bg-[#5EC9A5] text-white hover:bg-[#3FA182] shadow-md" href="{{ url('export/pets/excel') }}">
        Export Excel
    </a>
</div>

{{-- Search --}}
<label
    class="input text-gray-700 bg-white border border-[#A8F1D0] shadow-md rounded-xl mb-10 w-full max-w-md mx-auto flex items-center gap-2">
    <svg class="h-5 opacity-70 text-[#5EC9A5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input id="qsearch" type="search" placeholder="Search..." name="qsearch"
        class="text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#5EC9A5] rounded" />
</label>

{{-- Adoptions --}}
@foreach ($adoptions as $adoption)
<div
    class="flex flex-col items-center mb-8 w-full max-w-lg mx-auto bg-gradient-to-br from-[#2d3748] to-[#1f2937] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="flex justify-center gap-4 -space-x-6">
        <div class="avatar">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#5EC9A5] shadow-inner">
                <img src="{{ asset('photos/'.$adoption->user->photo) }}" alt="User Photo" />
            </div>
        </div>
        <div class="avatar">
            <div class="w-32 h-32 rounded-xl overflow-hidden border-4 border-[#A8F1D0] shadow-inner">
                <img src="{{ asset('photos/'.$adoption->pet->image) }}" alt="Pet Photo" />
            </div>
        </div>
    </div>

    <h4 class="text-white text-center mt-4 text-lg">
        <span class="underline font-bold text-[#FDE68A]">{{ $adoption->pet->name }}</span>
        was adopted by
        <span class="underline font-bold text-[#34D399]">{{ $adoption->user->fullname }}</span>
        <br>
        <span class="text-gray-300 text-sm">{{ $adoption->created_at->diffForHumans() }}</span>
    </h4>

    <a href="{{ 'adoptions/'.$adoption->id }}"
        class="btn btn-outline text-white mt-4 flex items-center gap-2 hover:bg-[#3FA182] shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z">
            </path>
        </svg>
        Show More
    </a>

    <div class="border-t border-gray-500 mt-6 w-2/3"></div>
</div>
@endforeach

{{-- Alerts --}}
@if (session('success'))
<div role="alert"
    class="alert alert-success mt-6 bg-green-100 text-green-800 border border-green-400 rounded p-4 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{{ session('success') }}</span>
</div>
@endif

@if (session('error'))
<div role="alert"
    class="alert alert-error mt-6 bg-red-100 text-red-800 border border-red-400 rounded p-4 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2 2 2m-2-2v6M12 8v.01" />
    </svg>
    <span>{{ session('error') }}</span>
</div>
@endif

@endsection