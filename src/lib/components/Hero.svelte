<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale, fade } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	export let mounted: boolean = false;
	export let heroVisible: boolean = false;

	let codeSnippets = [
		{ code: 'const developer = {', x: 8, y: 15, delay: 0 },
		{ code: '  name: "Harsh Dalal",', x: 75, y: 12, delay: 1 },
		{ code: '  role: "Full Stack Developer",', x: 12, y: 75, delay: 2 },
		{ code: '  skills: ["Java", "Spring Boot", "SvelteKit"]', x: 70, y: 70, delay: 3 },
		{ code: '};', x: 82, y: 20, delay: 4 },
		{ code: 'function buildAmazing() {', x: 18, y: 55, delay: 5 },
		{ code: '  return "Scalable Apps";', x: 65, y: 35, delay: 6 },
		{ code: '}', x: 88, y: 80, delay: 7 }
	];

	let floatingShapes = [
		{ type: 'circle', x: 12, y: 22, size: 'w-3 h-3', color: 'bg-emerald-400/30', delay: 0 },
		{ type: 'square', x: 88, y: 18, size: 'w-4 h-4', color: 'bg-violet-400/40', delay: 1 },
		{ type: 'triangle', x: 15, y: 82, size: 'w-2 h-2', color: 'bg-rose-400/35', delay: 2 },
		{ type: 'circle', x: 85, y: 65, size: 'w-2 h-2', color: 'bg-amber-400/30', delay: 3 },
		{ type: 'square', x: 8, y: 58, size: 'w-3 h-3', color: 'bg-cyan-400/25', delay: 4 }
	];

	let typingText = "Full Stack Developer";
	let currentText = "";
	let currentIndex = 0;
	let typingStarted = false;

	onMount(() => {
		// Start typing animation after a delay, regardless of heroVisible state
		setTimeout(() => {
			startTyping();
		}, 1500);
	});

	const startTyping = () => {
		if (typingStarted) return;
		typingStarted = true;
		
		const typeWriter = () => {
			if (currentIndex < typingText.length) {
				currentText += typingText[currentIndex];
				currentIndex++;
				setTimeout(typeWriter, 100);
			}
		};
		typeWriter();
	};

	// Also start typing when heroVisible becomes true (as a fallback)
	$: if (heroVisible && !typingStarted) {
		setTimeout(() => {
			startTyping();
		}, 500);
	}
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Dark gradient background -->
	<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
	
	<!-- Animated grid pattern -->
	<div class="absolute inset-0 opacity-5">
		<div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 60px 60px;"></div>
	</div>
	
	<!-- Floating code snippets -->
	{#if mounted && heroVisible}
		{#each codeSnippets as snippet, i}
			<div 
				class="absolute font-mono text-xs md:text-sm text-emerald-400/60 pointer-events-none select-none"
				style="left: {snippet.x}%; top: {snippet.y}%;"
				in:fly={{ y: 50, duration: 1200, delay: snippet.delay * 200, easing: quintOut }}
			>
				<span class="animate-pulse">{snippet.code}</span>
			</div>
		{/each}
	{/if}
	
	<!-- Floating geometric elements -->
	{#if mounted}
		{#each floatingShapes as shape, i}
			<div 
				class="absolute {shape.size} {shape.color} rounded-full animate-float pointer-events-none"
				style="left: {shape.x}%; top: {shape.y}%; animation-delay: {shape.delay}s;"
				in:scale={{ duration: 1500, delay: shape.delay * 300, easing: backOut }}
			></div>
		{/each}
	{/if}
	
	<!-- Main content -->
	<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
		{#if heroVisible}
			<!-- Name -->
			<div in:fly={{ y: 100, duration: 1400, easing: quintOut }}>
				<h1 class="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-white via-emerald-200 to-violet-200 bg-clip-text text-transparent leading-tight tracking-tight">
					Harsh Dalal
				</h1>
			</div>
			
			<!-- Title with typing effect -->
			<div in:fly={{ y: 50, duration: 1200, easing: quintOut, delay: 200 }}>
				<p class="text-3xl md:text-4xl lg:text-5xl mb-6 font-light opacity-90 tracking-wide">
					{currentText}<span class="animate-pulse">|</span>
				</p>
			</div>
			
			<!-- One-liner -->
			<div in:fly={{ y: 30, duration: 1000, easing: quintOut, delay: 400 }}>
				<p class="text-lg md:text-xl lg:text-2xl mb-16 max-w-4xl mx-auto opacity-80 leading-relaxed font-light">
					Solving <span class="font-semibold text-emerald-300">complex engineering challenges</span> and delivering 
					<span class="font-semibold text-violet-300">scalable, production-ready applications</span> with 
					<span class="font-semibold text-amber-300">clean architectures</span> and innovative problem-solving
				</p>
			</div>
			
			<!-- Call-to-action buttons -->
			<div in:fly={{ y: 20, duration: 800, easing: quintOut, delay: 600 }} class="flex flex-wrap justify-center gap-6">
				<a href="#projects" 
					 class="group px-10 py-4 bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-700 hover:to-violet-700 
								backdrop-blur-md border border-emerald-500/30 rounded-2xl font-semibold text-lg 
								transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
								shadow-2xl hover:shadow-emerald-500/25">
					<span class="flex items-center">
						View Projects
						<svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
						</svg>
					</span>
				</a>
				
				<a href="/HarshDalalResume.pdf" target="_blank" 
					 class="group px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl font-semibold text-lg 
								hover:bg-white hover:text-slate-900 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
								shadow-2xl hover:shadow-white/25">
					<span class="flex items-center">
						Download Resume
						<svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
					</span>
				</a>
				
				<a href="#contact" 
					 class="group px-10 py-4 bg-transparent border-2 border-white/50 rounded-2xl font-semibold text-lg 
								hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
								backdrop-blur-sm shadow-2xl hover:shadow-white/25">
					<span class="flex items-center">
						Get in Touch
						<svg class="w-5 h-5 ml-2 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
						</svg>
					</span>
				</a>
			</div>
		{/if}
	</div>
	
	<!-- Scroll indicator -->
	{#if heroVisible}
		<div in:fade={{ duration: 1000, delay: 1200 }} class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
			<div class="flex flex-col items-center animate-bounce">
				<span class="text-sm mb-2 font-light tracking-wide">Scroll Down</span>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
				</svg>
			</div>
		</div>
	{/if}
</section>

<style>
	@keyframes float {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg); 
		}
		50% { 
			transform: translateY(-25px) rotate(180deg); 
		}
	}
	
	.animate-float {
		animation: float 8s ease-in-out infinite;
	}
</style>
