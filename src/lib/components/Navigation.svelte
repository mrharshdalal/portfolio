<script lang="ts">
	import { onMount } from 'svelte';
	
	let scrollY = 0;
	let mobileMenuOpen = false;
	
	onMount(() => {
		const handleScroll = () => scrollY = window.scrollY;
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	
	const navItems = [
		{ href: '#about', label: 'About' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#contact', label: 'Contact' }
	];
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		mobileMenuOpen = false;
	}
	
	function handleNavClick() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window bind:scrollY />

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrollY > 50 ? 'bg-white/95 backdrop-blur shadow-lg' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-4">
			<!-- Logo/Name -->
			<button 
				on:click={scrollToTop}
				class="text-2xl font-bold transition-colors {scrollY > 50 ? 'text-gray-900' : 'text-white'} hover:text-blue-600"
			>
				Harsh Dalal
			</button>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex space-x-8">
				{#each navItems as item}
					<a 
						href={item.href}
						class="transition-colors duration-200 {scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'} font-medium"
						on:click={handleNavClick}
					>
						{item.label}
					</a>
				{/each}
			</div>
			
			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden p-2 rounded-lg transition-colors {scrollY > 50 ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}"
				on:click={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
		
		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden bg-white/95 backdrop-blur rounded-lg shadow-lg mb-4 p-4">
				{#each navItems as item}
					<a 
						href={item.href}
						class="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
						on:click={handleNavClick}
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav> 