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
	
	onMount(() => {
		mounted = true;
		
		// Stagger hero animations
		setTimeout(() => {
			heroVisible = true;
		}, 300);
		
		// Setup intersection observers for sections
		setupIntersectionObservers();
	});
	
	const setupIntersectionObservers = () => {
		const observerOptions = {
			threshold: 0.2,
			rootMargin: '0px 0px -100px 0px'
		};
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const section = entry.target.id;
					switch (section) {
						case 'about':
							setTimeout(() => aboutVisible = true, 200);
							break;
						case 'experience':
							setTimeout(() => experienceVisible = true, 200);
							break;
						case 'projects':
							setTimeout(() => projectsVisible = true, 200);
							break;
						case 'skills':
							setTimeout(() => skillsVisible = true, 200);
							break;
						case 'contact':
							setTimeout(() => contactVisible = true, 200);
							break;
					}
				}
			});
		}, observerOptions);
		
		// Observe sections
		setTimeout(() => {
			const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
			sections.forEach(sectionId => {
				const element = document.getElementById(sectionId);
				if (element) observer.observe(element);
			});
		}, 1000);
		
		// Footer visibility
		setTimeout(() => {
			footerVisible = true;
		}, 2000);
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
