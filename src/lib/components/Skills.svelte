<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let skillCategories = {
		languages: {
			title: "Languages",
			icon: "💻",
			color: "emerald",
			skills: [
				{ name: "Java", level: 95 },
				{ name: "TypeScript", level: 90 },
				{ name: "JavaScript", level: 88 },
				{ name: "MySQL", level: 85 },
				{ name: "Firestore", level: 90 },
				{ name: "NoSQL", level: 85 },
				{ name: "HTML/CSS", level: 92 }
			]
		},
		frameworks: {
			title: "Frameworks",
			icon: "⚙️",
			color: "violet",
			skills: [
				{ name: "Spring Boot", level: 92 },
				{ name: "SvelteKit", level: 88 },
				{ name: "Node.js", level: 85 },
				{ name: "Firebase Functions", level: 90 }
			]
		},
		tools: {
			title: "Developer Tools",
			icon: "🛠️",
			color: "amber",
			skills: [
				{ name: "Git", level: 90 },
				{ name: "Vercel", level: 85 },
				{ name: "Google Cloud Platform", level: 80 },
				{ name: "VS Code", level: 95 },
				{ name: "WebStorm", level: 85 },
				{ name: "Cursor", level: 80 },
				{ name: "AI Tools", level: 75 }
			]
		},
		integrations: {
			title: "Integrations",
			icon: "🔌",
			color: "rose",
			skills: [
				{ name: "Razorpay", level: 85 },
				{ name: "Resend", level: 88 },
				{ name: "EshopBox", level: 82 },
				{ name: "WATI", level: 80 },
				{ name: "NodeMailer", level: 90 }
			]
		}
	};

	let animatedSkills: { [key: string]: boolean } = {};
	let hoveredSkill = "";
	let shouldShow = false;

	onMount(() => {
		// Initialize all skills as not animated
		Object.keys(skillCategories).forEach(category => {
			animatedSkills[category] = false;
		});
		
		// Fallback: Show content after 3 seconds if not triggered by parent
		setTimeout(() => {
			if (!isVisible) {
				shouldShow = true;
			}
		}, 3000);
	});

	$: shouldShow = isVisible || shouldShow;
	$: if (shouldShow) {
		// Animate skills with delay
		Object.keys(skillCategories).forEach((category, index) => {
			setTimeout(() => {
				animatedSkills[category] = true;
				animatedSkills = { ...animatedSkills };
			}, index * 300);
		});
	}
</script>

<section id="skills" class="py-32 bg-white dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
				Technical Skills
			</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-emerald-600 to-violet-600 mx-auto rounded-full mb-6"></div>
			<p class="text-xl text-slate-600 dark:text-slate-300">Modern full stack development expertise with proven technologies</p>
		</div>

		<div class="grid md:grid-cols-2 gap-12">
			{#each Object.entries(skillCategories) as [categoryKey, category], categoryIndex}
				{#if shouldShow}
					<div 
						in:fly={{ y: 50, duration: 800, delay: categoryIndex * 200, easing: quintOut }}
						class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
					>
						<!-- Category Header -->
						<div class="flex items-center mb-8">
							<div class="w-16 h-16 bg-gradient-to-br from-{category.color}-500 to-{category.color}-600 rounded-2xl flex items-center justify-center mr-6">
								<span class="text-3xl">{category.icon}</span>
							</div>
							<div>
								<h3 class="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
								<p class="text-slate-600 dark:text-slate-300">Expert level proficiency</p>
							</div>
						</div>

						<!-- Skills with Progress Bars -->
						<div class="space-y-6">
							{#each category.skills as skill, skillIndex}
								<div class="group"
									 on:mouseenter={() => hoveredSkill = `${categoryKey}-${skill.name}`}
									 on:mouseleave={() => hoveredSkill = ""}>
									<div class="flex justify-between items-center mb-2">
										<span class="text-slate-700 dark:text-slate-300 font-semibold transition-colors duration-300"
											  class:text-emerald-600={hoveredSkill === `${categoryKey}-${skill.name}`}
											  class:dark:text-emerald-400={hoveredSkill === `${categoryKey}-${skill.name}`}>
											{skill.name}
										</span>
										<span class="text-sm text-slate-500 dark:text-slate-400 font-mono transition-all duration-300"
											  class:scale-110={hoveredSkill === `${categoryKey}-${skill.name}`}>
											{#if animatedSkills[categoryKey]}
												{skill.level}%
											{:else}
												0%
											{/if}
										</span>
									</div>
									
									<!-- Progress Bar Container -->
									<div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
										<!-- Animated Progress Bar -->
										<div 
											class="h-full bg-gradient-to-r from-{category.color}-500 to-{category.color}-600 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
											style="width: {animatedSkills[categoryKey] ? skill.level : 0}%"
										>
											<!-- Animated shimmer effect -->
											{#if animatedSkills[categoryKey]}
												<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
											{/if}
										</div>
									</div>
									
									<!-- Skill level indicator -->
									<div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
										<span>Beginner</span>
										<span>Intermediate</span>
										<span>Advanced</span>
										<span>Expert</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 opacity-0">
						<div class="h-64"></div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Additional Skills Summary -->
		{#if shouldShow}
			<div 
				in:fly={{ y: 30, duration: 800, delay: 1000, easing: quintOut }}
				class="mt-20 bg-gradient-to-r from-emerald-600/10 to-violet-600/10 dark:from-emerald-600/20 dark:to-violet-600/20 rounded-3xl p-12 backdrop-blur-sm border border-emerald-500/20 dark:border-violet-500/20"
			>
				<h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Soft Skills</h3>
				<div class="grid md:grid-cols-4 gap-8">
					<div class="text-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">👑</span>
						</div>
						<h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Leadership</h4>
						<p class="text-slate-600 dark:text-slate-300">Leading teams and projects effectively</p>
					</div>
					<div class="text-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">🧩</span>
						</div>
						<h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Problem Solving</h4>
						<p class="text-slate-600 dark:text-slate-300">Analytical thinking and creative solutions</p>
					</div>
					<div class="text-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">🤝</span>
						</div>
						<h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Teamwork</h4>
						<p class="text-slate-600 dark:text-slate-300">Collaborative development and coordination</p>
					</div>
					<div class="text-center group">
						<div class="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
							<span class="text-2xl">💬</span>
						</div>
						<h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Communication</h4>
						<p class="text-slate-600 dark:text-slate-300">Clear and effective communication skills</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
	
	.animate-shimmer {
		animation: shimmer 2s infinite;
	}
</style>
