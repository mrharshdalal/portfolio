<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let achievements = [
		{
			icon: "🚀",
			title: "Scaled IP Redirection System",
			description: "Scaled system to handle 10k+ daily requests with Redis TTL caching and multi-token strategy",
			color: "from-emerald-500 to-emerald-600"
		},
		{
			icon: "💰",
			title: "Reduced Firestore Costs",
			description: "Reduced Firestore read costs by 40× through query optimization and document structure improvements",
			color: "from-violet-500 to-violet-600"
		},
		{
			icon: "⚡",
			title: "Automated Workflows",
			description: "Automated packaging workflow with EshopBox integration, cutting fulfillment time significantly",
			color: "from-amber-500 to-amber-600"
		},
		{
			icon: "🎯",
			title: "99% Delivery Success Rate",
			description: "Built fault-tolerant notification system achieving 99% delivery success rate across email and WhatsApp",
			color: "from-rose-500 to-rose-600"
		}
	];

	let stats = [
		{ number: "2+", label: "Years Experience", color: "from-emerald-500 to-emerald-600" },
		{ number: "10K+", label: "Daily Requests Handled", color: "from-violet-500 to-violet-600" },
		{ number: "40×", label: "Cost Reduction", color: "from-amber-500 to-amber-600" },
		{ number: "99%", label: "Delivery Success Rate", color: "from-rose-500 to-rose-600" }
	];

	let hoveredAchievement = -1;
	let shouldShow = false;

	onMount(() => {
		// Fallback: Show content after 3 seconds if not triggered by parent
		setTimeout(() => {
			if (!isVisible) {
				shouldShow = true;
			}
		}, 3000);
	});

	$: shouldShow = isVisible || shouldShow;
</script>

<section id="about" class="py-32 relative bg-slate-50 dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
				About Me
			</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-emerald-600 to-violet-600 mx-auto rounded-full"></div>
		</div>
		
		<div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
			<div class="space-y-8">
				<p class="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
					As a passionate <strong class="text-emerald-600 dark:text-emerald-400">Full Stack Developer</strong> with 
					<strong class="text-violet-600 dark:text-violet-400">2 years of experience</strong>, 
					I specialize in solving complex engineering challenges and delivering scalable, production-ready web applications.
				</p>
				<p class="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
					My expertise lies in <strong class="text-emerald-600 dark:text-emerald-400">Java</strong>, 
					<strong class="text-violet-600 dark:text-violet-400">Spring Boot</strong>, 
					<strong class="text-amber-600 dark:text-amber-400">REST APIs</strong>, 
					<strong class="text-rose-600 dark:text-rose-400">TypeScript</strong>, and 
					<strong class="text-cyan-600 dark:text-cyan-400">SvelteKit</strong>. I'm adept at quickly learning and applying new technologies to build robust e-commerce and POS platforms.
				</p>
				<p class="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
					I have a proven track record of reducing infrastructure costs, optimizing performance, and improving customer experience through clean architectures, efficient backend engineering, and innovative problem-solving.
				</p>
			</div>
			
			<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-slate-200/50 dark:border-slate-700/50">
				<h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Quick Facts</h3>
				<div class="space-y-6">
					<div class="flex items-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">🎓</span>
						</div>
						<div>
							<p class="font-semibold text-slate-900 dark:text-white text-lg">Education</p>
							<p class="text-slate-600 dark:text-slate-300">BTech CSE, Lovely Professional University</p>
						</div>
					</div>
					<div class="flex items-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">💼</span>
						</div>
						<div>
							<p class="font-semibold text-slate-900 dark:text-white text-lg">Experience</p>
							<p class="text-slate-600 dark:text-slate-300">2 years professional</p>
						</div>
					</div>
					<div class="flex items-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">🌍</span>
						</div>
						<div>
							<p class="font-semibold text-slate-900 dark:text-white text-lg">Location</p>
							<p class="text-slate-600 dark:text-slate-300">Bengaluru, India</p>
						</div>
					</div>
					<div class="flex items-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">⚡</span>
						</div>
						<div>
							<p class="font-semibold text-slate-900 dark:text-white text-lg">Specialization</p>
							<p class="text-slate-600 dark:text-slate-300">E-commerce & POS Platforms</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Key Achievements -->
		<div class="mb-20">
			<h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Key Achievements</h3>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each achievements as achievement, index}
					{#if shouldShow}
						<div 
							in:fly={{ y: 50, duration: 800, delay: index * 150, easing: quintOut }}
							class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 text-center hover:transform hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
							on:mouseenter={() => hoveredAchievement = index}
							on:mouseleave={() => hoveredAchievement = -1}
						>
							<div class="w-16 h-16 bg-gradient-to-br {achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<span class="text-3xl">{achievement.icon}</span>
							</div>
							<h4 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{achievement.title}</h4>
							<p class="text-slate-600 dark:text-slate-300 leading-relaxed">{achievement.description}</p>
							
							<!-- Hover effect overlay -->
							{#if hoveredAchievement === index}
								<div class="absolute inset-0 bg-gradient-to-br {achievement.color} opacity-10 rounded-2xl transition-opacity duration-300"></div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Statistics -->
		<div class="bg-gradient-to-r from-emerald-600/10 to-violet-600/10 dark:from-emerald-600/20 dark:to-violet-600/20 rounded-3xl p-12 backdrop-blur-sm border border-emerald-500/20 dark:border-violet-500/20">
			<h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Impact Numbers</h3>
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
				{#each stats as stat, index}
					{#if shouldShow}
						<div 
							in:scale={{ duration: 600, delay: index * 200, easing: backOut }}
							class="text-center group"
						>
							<div class="text-4xl md:text-5xl font-black bg-gradient-to-r {stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
								{stat.number}
							</div>
							<p class="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</p>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
