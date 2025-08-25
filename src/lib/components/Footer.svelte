<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let socialLinks = [
		{ name: "GitHub", url: "https://github.com/mrharshdalal", icon: "💻" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/mrharshdalal/", icon: "💼" },
		{ name: "Email", url: "mailto:mrharshdalal@gmail.com", icon: "✉️" }
	];
</script>

<footer class="bg-slate-950 dark:bg-black text-white py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if isVisible}
			<div in:fly={{ y: 30, duration: 800, easing: quintOut }}>
				<div class="text-center">
					<!-- Logo/Brand -->
					<div class="mb-8">
						<h3 class="text-3xl font-black bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
							Harsh Dalal
						</h3>
						<p class="text-slate-400 mt-2">Full Stack Developer</p>
					</div>

					<!-- Social Links -->
					<div class="flex justify-center space-x-6 mb-8">
						{#each socialLinks as link}
							<a 
								href={link.url} 
								target="_blank" 
								rel="noopener noreferrer"
								class="w-12 h-12 bg-gradient-to-r from-emerald-600 to-violet-600 rounded-xl flex items-center justify-center hover:from-emerald-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25"
							>
								<span class="text-xl">{link.icon}</span>
							</a>
						{/each}
					</div>

					<!-- Made with love -->
					<div class="mb-8">
						<p class="text-slate-400 text-lg">
							Made with <span class="text-rose-500 animate-pulse">❤️</span> in 
							<span class="text-emerald-400 font-semibold">SvelteKit</span>
						</p>
					</div>

					<!-- Copyright -->
					<div class="border-t border-slate-800 pt-8">
						<p class="text-slate-500 text-sm">
							© 2024 Harsh Dalal. All rights reserved.
						</p>
						<p class="text-slate-600 text-xs mt-2">
							Full Stack Developer • E-commerce Specialist • Enterprise Solutions
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</footer>
