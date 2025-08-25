<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let experiences = [
		{
			title: "Full Stack Developer",
			company: "Tech Inject LLP",
			period: "Jan 2024 – Present",
			location: "Punjab, India",
			description: "Leading full-stack development for e-commerce platforms and POS systems with focus on scalability and cost optimization",
			achievements: [
				"Scaled IP-based redirection system to handle 10k+ daily requests with Redis TTL caching and multi-token strategy",
				"Reduced Firestore read costs by 40× through query optimization and document structure improvements",
				"Automated packaging workflow with EshopBox integration, cutting fulfillment time and improving inventory accuracy",
				"Designed and launched POS system with Zoho invoice integration using SvelteKit + Firestore",
				"Built fault-tolerant notification system achieving 99% delivery success rate across email and WhatsApp",
				"Engineered reusable checkout flow supporting discounts, reward points, and Razorpay payments"
			],
			technologies: ["Java", "Spring Boot", "SvelteKit", "TypeScript", "Firestore", "Redis", "Razorpay", "EshopBox"],
			status: "Current",
			color: "from-emerald-500 to-emerald-600"
		},
		{
			title: "Full Stack Developer Intern",
			company: "Goldlane",
			period: "Jun 2023 – Nov 2023",
			location: "Bangalore, Karnataka",
			description: "Contributed to frontend development and API integration for large-scale applications",
			achievements: [
				"Developed user-friendly demo booking website, increasing bookings from zero to 3–5 daily",
				"Led frontend design of SIP Admin Webstore serving 20,000+ users",
				"Implemented file uploads and integrated APIs to improve user experience and data handling",
				"Collaborated with cross-functional teams to deliver features on time"
			],
			technologies: ["Angular", "JavaScript", "HTML", "CSS", "REST APIs"],
			status: "Previous",
			color: "from-violet-500 to-violet-600"
		}
	];

	let visibleItems: boolean[] = [];
	let shouldShow = false;

	onMount(() => {
		visibleItems = new Array(experiences.length).fill(false);
		
		// Fallback: Show content after 3 seconds if not triggered by parent
		setTimeout(() => {
			if (!isVisible) {
				shouldShow = true;
			}
		}, 3000);
	});

	$: shouldShow = isVisible || shouldShow;
	$: if (shouldShow) {
		experiences.forEach((_, index) => {
			setTimeout(() => {
				visibleItems[index] = true;
				visibleItems = [...visibleItems];
			}, index * 300);
		});
	}
</script>

<section id="experience" class="py-32 bg-white dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
				Experience Timeline
			</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-emerald-600 to-violet-600 mx-auto rounded-full mb-6"></div>
			<p class="text-xl text-slate-600 dark:text-slate-300">Building production-ready applications with modern technologies</p>
		</div>

		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-violet-500 to-amber-500"></div>
			
			<!-- Timeline items -->
			{#each experiences as exp, i}
				<div 
					class="relative flex items-center mb-16 md:mb-20"
				>
					<!-- Timeline dot -->
					<div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r {exp.color} rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10">
						{#if visibleItems[i]}
							<div 
								in:scale={{ duration: 600, easing: backOut }}
								class="absolute inset-0 bg-gradient-to-r {exp.color} rounded-full animate-ping opacity-75"
							></div>
						{/if}
					</div>

					<!-- Content card -->
					<div class="w-full md:w-5/12 {i % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16'} ml-20 md:ml-0">
						{#if visibleItems[i]}
							<div 
								in:fly={{ 
									x: i % 2 === 0 ? 50 : -50, 
									y: 30, 
									duration: 800, 
									easing: quintOut,
									delay: 100 
								}}
								class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group"
							>
								<!-- Gradient overlay -->
								<div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								
								<div class="relative z-10">
									<!-- Header -->
									<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
										<div>
											<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
												{exp.title}
											</h3>
											<p class="text-xl text-emerald-600 dark:text-emerald-400 font-semibold mb-2">{exp.company}</p>
											<p class="text-slate-600 dark:text-slate-300 font-medium">{exp.period}</p>
											<p class="text-slate-500 dark:text-slate-400 text-sm">{exp.location}</p>
										</div>
										<div class="mt-4 md:mt-0">
											<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold 
												{exp.status === 'Current' 
													? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' 
													: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200'}">
												{exp.status}
											</span>
										</div>
									</div>
									
									<!-- Description -->
									<p class="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
										{exp.description}
									</p>
									
									<!-- Achievements -->
									<div class="mb-6">
										<h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
											<span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
											Key Achievements
										</h4>
										<ul class="space-y-3">
											{#each exp.achievements as achievement, achievementIndex}
												<li 
													in:fly={{ 
														x: 20, 
														duration: 400, 
														delay: 200 + achievementIndex * 100,
														easing: quintOut 
													}}
													class="flex items-start group/item"
												>
													<span class="text-emerald-500 mr-3 mt-1 transition-transform group-hover/item:scale-125">
														<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
															<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
														</svg>
													</span>
													<span class="text-slate-700 dark:text-slate-300 leading-relaxed">
														{achievement}
													</span>
												</li>
											{/each}
										</ul>
									</div>
									
									<!-- Technologies -->
									<div>
										<h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
											<span class="w-2 h-2 bg-violet-500 rounded-full mr-3"></span>
											Technologies Used
										</h4>
										<div class="flex flex-wrap gap-2">
											{#each exp.technologies as tech, techIndex}
												<span 
													in:scale={{ 
														duration: 300, 
														delay: 400 + techIndex * 50,
														easing: backOut 
													}}
													class="px-3 py-1 bg-gradient-to-r from-emerald-100 to-violet-100 dark:from-emerald-900/50 dark:to-violet-900/50 
															text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-semibold 
															hover:from-emerald-200 hover:to-violet-200 dark:hover:from-emerald-800/50 dark:hover:to-violet-800/50
															transition-all duration-300 cursor-default transform hover:scale-105"
												>
													{tech}
												</span>
											{/each}
										</div>
									</div>
								</div>
							</div>
						{:else}
							<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 opacity-0">
								<div class="h-96"></div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@keyframes ping {
		75%, 100% {
			transform: scale(2);
			opacity: 0;
		}
	}
	
	.animate-ping {
		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
