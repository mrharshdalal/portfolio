<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { fly, scale, fade } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';
	
	import Navigation from '$lib/components/Navigation.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	let mounted = false;
	let heroVisible = false;
	let aboutVisible = false;
	let experienceVisible = false;
	let projectsVisible = false;
	let skillsVisible = false;
	let contactVisible = false;
	let footerVisible = false;
	
	// Track which sections have been observed to prevent duplicate triggers
	let observedSections = new Set();
	
	onMount(() => {
		mounted = true;
		
		// Stagger hero animations
		setTimeout(() => {
			heroVisible = true;
		}, 300);
		
		// Setup intersection observers for sections with better timing
		setupIntersectionObservers();
		
		// Fallback: Show all sections after a delay if they haven't been triggered
		setTimeout(() => {
			if (!aboutVisible) aboutVisible = true;
			if (!experienceVisible) experienceVisible = true;
			if (!projectsVisible) projectsVisible = true;
			if (!skillsVisible) skillsVisible = true;
			if (!contactVisible) contactVisible = true;
			if (!footerVisible) footerVisible = true;
		}, 5000); // 5 second fallback
	});
	
	const setupIntersectionObservers = () => {
		if (!browser) return;
		
		const observerOptions = {
			threshold: 0.1, // Lower threshold for better detection
			rootMargin: '0px 0px -50px 0px' // Reduced margin
		};
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !observedSections.has(entry.target.id)) {
					observedSections.add(entry.target.id);
					const section = entry.target.id;
					
					switch (section) {
						case 'about':
							if (!aboutVisible) {
								setTimeout(() => aboutVisible = true, 100);
							}
							break;
						case 'experience':
							if (!experienceVisible) {
								setTimeout(() => experienceVisible = true, 100);
							}
							break;
						case 'projects':
							if (!projectsVisible) {
								setTimeout(() => projectsVisible = true, 100);
							}
							break;
						case 'skills':
							if (!skillsVisible) {
								setTimeout(() => skillsVisible = true, 100);
							}
							break;
						case 'contact':
							if (!contactVisible) {
								setTimeout(() => contactVisible = true, 100);
							}
							break;
					}
				}
			});
		}, observerOptions);
		
		// Function to observe sections with retry logic
		const observeSections = () => {
			const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
			let allFound = true;
			
			sections.forEach(sectionId => {
				const element = document.getElementById(sectionId);
				if (element) {
					observer.observe(element);
				} else {
					allFound = false;
				}
			});
			
			// If not all sections found, retry after a short delay
			if (!allFound) {
				setTimeout(observeSections, 500);
			}
		};
		
		// Start observing with initial delay
		setTimeout(observeSections, 500);
		
		// Footer visibility with delay
		setTimeout(() => {
			footerVisible = true;
		}, 3000);
	};
</script>

<svelte:head>
	<title>Harsh Dalal - Full Stack Developer</title>
	<meta name="description" content="Experienced Full Stack Developer specializing in SvelteKit, Spring Boot, and e-commerce solutions. 2+ years of professional experience building scalable web applications." />
	<meta property="og:title" content="Harsh Dalal - Full Stack Developer" />
	<meta property="og:description" content="Experienced Full Stack Developer specializing in SvelteKit, Spring Boot, and e-commerce solutions." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://harshdalal.dev" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Harsh Dalal - Full Stack Developer" />
	<meta name="twitter:description" content="Experienced Full Stack Developer specializing in SvelteKit, Spring Boot, and e-commerce solutions." />
</svelte:head>

<ThemeToggle />
<Navigation />

<div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
	<!-- Hero Section -->
	<Hero {mounted} {heroVisible} />

	<!-- About Section -->
	<About isVisible={aboutVisible} />

	<!-- Experience Section -->
	<Experience isVisible={experienceVisible} />

	<!-- Projects Section -->
	<Projects isVisible={projectsVisible} />

	<!-- Skills Section -->
	<Skills isVisible={skillsVisible} />

	<!-- Contact Section -->
	<Contact isVisible={contactVisible} />

	<!-- Footer -->
	<Footer isVisible={footerVisible} />
</div>

<style>
	/* Enhanced global styles for dark mode */
	:global(.dark) {
		color-scheme: dark;
	}
	
	/* Custom animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}
	
	@keyframes glow {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
	
	.animate-glow {
		animation: glow 2s ease-in-out infinite;
	}
	
	/* Smooth scrolling */
	:global(html) {
		scroll-behavior: smooth;
	}
	
	/* Custom scrollbar for dark theme */
	:global(::-webkit-scrollbar) {
		width: 12px;
	}
	
	:global(::-webkit-scrollbar-track) {
		background: #f1f5f9;
	}
	
	:global(.dark ::-webkit-scrollbar-track) {
		background: #0f172a;
	}
	
	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(to bottom, #10b981, #8b5cf6);
		border-radius: 6px;
		border: 2px solid #f1f5f9;
	}
	
	:global(.dark ::-webkit-scrollbar-thumb) {
		border-color: #0f172a;
	}
	
	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(to bottom, #059669, #7c3aed);
	}
	
	/* Prevent layout shift */
	:global(body) {
		overflow-x: hidden;
	}
	
	/* Enhanced focus states for accessibility */
	:global(a:focus-visible, button:focus-visible) {
		outline: 2px solid #10b981;
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>
