<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let projects = [
		{
			name: "BoltBill",
			description: "API-first service that generates custom-branded PDF invoices as array buffers, enabling seamless integration into existing business workflows with template selection and branding tools",
			shortDesc: "API-first PDF invoice generator with branding tools",
			technologies: ["TypeScript", "SvelteKit", "Firebase Functions", "Firestore"],
			features: ["Custom Branding", "Template Selection", "Array Buffer Output", "API Integration"],
			status: "In Development",
			logo: "📄",
			liveUrl: "#",
			githubUrl: "#",
			color: "from-emerald-500 to-emerald-600",
			gradient: "from-emerald-500/20 to-emerald-600/20"
		},
		{
			name: "Quick Neons",
			description: "Custom product ordering interface for personalized neon signs with dynamic checkout flow and responsive design, enhancing user experience through intuitive UI",
			shortDesc: "Custom neon sign ordering platform with dynamic checkout",
			technologies: ["TypeScript", "SvelteKit", "Firebase Functions", "Firestore"],
			features: ["Custom Design Tool", "Dynamic Checkout", "Responsive Design", "User Experience"],
			status: "In Development",
			logo: "✨",
			liveUrl: "#",
			githubUrl: "#",
			color: "from-violet-500 to-violet-600",
			gradient: "from-violet-500/20 to-violet-600/20"
		},
		{
			name: "E-commerce Platform",
			description: "Comprehensive e-commerce platform with secure authentication, intuitive product management, and enhanced customer experience that boosted engagement and retention",
			shortDesc: "Full-stack e-commerce platform with authentication",
			technologies: ["Java", "Spring Boot", "SvelteKit", "TypeScript", "Firestore"],
			features: ["Secure Authentication", "Product Management", "Customer Experience", "Engagement"],
			status: "Production",
			logo: "🛒",
			liveUrl: "#",
			githubUrl: "#",
			color: "from-amber-500 to-amber-600",
			gradient: "from-amber-500/20 to-amber-600/20"
		},
		{
			name: "POS System",
			description: "Point-of-sale system with Zoho invoice integration using SvelteKit + Firestore, streamlining billing and inventory tracking for seamless retail operations",
			shortDesc: "POS system with Zoho invoice integration",
			technologies: ["SvelteKit", "Firestore", "Zoho Integration", "TypeScript"],
			features: ["Zoho Integration", "Billing System", "Inventory Tracking", "Retail Operations"],
			status: "Production",
			logo: "💳",
			liveUrl: "#",
			githubUrl: "#",
			color: "from-rose-500 to-rose-600",
			gradient: "from-rose-500/20 to-rose-600/20"
		}
	];

	let hoveredProject = -1;
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

<section id="projects" class="py-32 bg-slate-50 dark:bg-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
				Featured Projects
			</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-emerald-600 to-violet-600 mx-auto rounded-full mb-6"></div>
			<p class="text-xl text-slate-600 dark:text-slate-300">Production applications and innovative solutions serving real users</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12">
			{#each projects as project, index}
				{#if shouldShow}
					<div 
						in:fly={{ y: 60, duration: 1000, delay: index * 200, easing: quintOut }}
						class="group relative"
						on:mouseenter={() => hoveredProject = index}
						on:mouseleave={() => hoveredProject = -1}
					>
						<!-- Project Card -->
						<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl 
									transition-all duration-700 border border-slate-200/50 dark:border-slate-700/50 
									relative overflow-hidden transform hover:-translate-y-3 hover:rotate-1">
							
							<!-- Animated background gradient -->
							<div class="absolute inset-0 bg-gradient-to-br {project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
							
							<!-- Glassmorphism overlay -->
							<div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
							
							<div class="relative z-10 p-8">
								<!-- Header -->
								<div class="flex items-center justify-between mb-6">
									<div class="flex items-center">
										<div class="w-16 h-16 bg-gradient-to-br {project.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-500">
											<span class="text-3xl">{project.logo}</span>
										</div>
										<div>
											<h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
												{project.name}
											</h3>
											<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold 
												{project.status === 'Production' 
													? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
													: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'}">
												{project.status}
											</span>
										</div>
									</div>
								</div>
								
								<!-- Description -->
								<p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-lg">
									{project.description}
								</p>
								
								<!-- Features -->
								<div class="mb-6">
									<h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
										<span class="w-2 h-2 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full mr-3"></span>
										Key Features
									</h4>
									<div class="grid grid-cols-2 gap-2">
										{#each project.features as feature}
											<div class="flex items-center bg-slate-50/80 dark:bg-slate-700/50 rounded-xl p-3 
														hover:bg-slate-100/80 dark:hover:bg-slate-600/50 transition-all duration-300
														border border-slate-200/50 dark:border-slate-600/30">
												<div class="w-2 h-2 bg-gradient-to-r from-emerald-400 to-violet-500 rounded-full mr-2"></div>
												<span class="text-slate-700 dark:text-slate-300 text-sm font-medium">{feature}</span>
											</div>
										{/each}
									</div>
								</div>
								
								<!-- Technologies -->
								<div class="mb-6">
									<h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
										<span class="w-2 h-2 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full mr-3"></span>
										Technologies
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each project.technologies as tech}
											<span class="px-3 py-1 bg-gradient-to-r from-emerald-100 to-violet-100 
														dark:from-emerald-900/50 dark:to-violet-900/50 
														text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-semibold
														hover:from-emerald-200 hover:to-violet-200 
														dark:hover:from-emerald-800/50 dark:hover:to-violet-800/50
														transition-all duration-300 cursor-default transform hover:scale-105
														shadow-md hover:shadow-lg border border-emerald-200/50 dark:border-emerald-700/30">
												{tech}
											</span>
										{/each}
									</div>
								</div>
								
								<!-- Action Buttons -->
								<div class="flex gap-4">
									<a href={project.liveUrl} 
										 class="flex-1 bg-gradient-to-r {project.color} text-white px-6 py-3 rounded-xl font-semibold 
												hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
										View Live
									</a>
									<a href={project.githubUrl} 
										 class="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold 
												hover:bg-slate-200 dark:hover:bg-slate-600 transform hover:scale-105 transition-all duration-300 text-center">
										GitHub
									</a>
								</div>
							</div>
							
							<!-- Decorative floating elements -->
							<div class="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br {project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
							<div class="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-rose-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:scale-125 transition-transform duration-1000"></div>
							
							<!-- Animated border -->
							<div class="absolute inset-0 rounded-3xl bg-gradient-to-r {project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"></div>
						</div>
					</div>
				{:else}
					<div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 opacity-0">
						<div class="p-8 h-96"></div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
