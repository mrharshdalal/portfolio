<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let isVisible: boolean = false;

	let formData = { name: '', email: '', message: '' };
	let isSubmitting = false;
	let submitSuccess = false;
	let formErrors = { name: '', email: '', message: '' };
	let shouldShow = false;

	const validateForm = () => {
		formErrors = { name: '', email: '', message: '' };
		let isValid = true;

		if (!formData.name.trim()) {
			formErrors.name = 'Name is required';
			isValid = false;
		}

		if (!formData.email.trim()) {
			formErrors.email = 'Email is required';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			formErrors.email = 'Please enter a valid email';
			isValid = false;
		}

		if (!formData.message.trim()) {
			formErrors.message = 'Message is required';
			isValid = false;
		}

		return isValid;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;
		await new Promise(resolve => setTimeout(resolve, 2000));
		isSubmitting = false;
		submitSuccess = true;
		
		setTimeout(() => {
			submitSuccess = false;
			formData = { name: '', email: '', message: '' };
		}, 3000);
	};

	let contactLinks = [
		{ icon: "✉️", title: "Email", value: "mrharshdalal@gmail.com", url: "mailto:mrharshdalal@gmail.com" },
		{ icon: "💼", title: "LinkedIn", value: "mrharshdalal", url: "https://www.linkedin.com/in/mrharshdalal/" },
		{ icon: "💻", title: "GitHub", value: "mrharshdalal", url: "https://github.com/mrharshdalal" },
		{ icon: "📱", title: "Phone", value: "+91 9896267961", url: "tel:+919896267961" }
	];

	let hoveredLink = -1;

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

<section id="contact" class="py-32 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
	
	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-black mb-6">Let's Work Together</h2>
			<div class="w-32 h-1 bg-white mx-auto rounded-full mb-6"></div>
			<p class="text-xl opacity-90">Ready to build something amazing? Let's connect!</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-16">
			{#if shouldShow}
				<div in:fly={{ x: -50, duration: 1000, easing: quintOut }}>
					<div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
						<h3 class="text-2xl font-bold mb-6">Send me a message</h3>
						
						{#if submitSuccess}
							<div class="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 mb-6 text-center">
								<p class="text-emerald-200">Thank you! Your message has been sent successfully.</p>
							</div>
						{/if}
						
						<form on:submit={handleSubmit} class="space-y-6">
							<div>
								<label for="name" class="block text-sm font-medium mb-2">Name</label>
								<input type="text" id="name" bind:value={formData.name} required
									class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
									class:border-red-500={formErrors.name}
									placeholder="Your name" />
								{#if formErrors.name}
									<p class="text-red-400 text-sm mt-1">{formErrors.name}</p>
								{/if}
							</div>
							
							<div>
								<label for="email" class="block text-sm font-medium mb-2">Email</label>
								<input type="email" id="email" bind:value={formData.email} required
									class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
									class:border-red-500={formErrors.email}
									placeholder="your.email@example.com" />
								{#if formErrors.email}
									<p class="text-red-400 text-sm mt-1">{formErrors.email}</p>
								{/if}
							</div>
							
							<div>
								<label for="message" class="block text-sm font-medium mb-2">Message</label>
								<textarea id="message" bind:value={formData.message} required rows="5"
									class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
									class:border-red-500={formErrors.message}
									placeholder="Tell me about your project..."></textarea>
								{#if formErrors.message}
									<p class="text-red-400 text-sm mt-1">{formErrors.message}</p>
								{/if}
							</div>
							
							<button type="submit" disabled={isSubmitting}
								class="w-full bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
								{#if isSubmitting}
									<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Sending...
								{:else}
									Send Message
								{/if}
							</button>
						</form>
					</div>
				</div>

				<div in:fly={{ x: 50, duration: 1000, delay: 200, easing: quintOut }}>
					<div class="space-y-6">
						<h3 class="text-2xl font-bold mb-8">Get in touch</h3>
						
						{#each contactLinks as link, index}
							<a href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
								class="group bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 flex items-center"
								on:mouseenter={() => hoveredLink = index}
								on:mouseleave={() => hoveredLink = -1}>
								<div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-violet-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
									<span class="text-2xl">{link.icon}</span>
								</div>
								<div>
									<h4 class="text-xl font-semibold mb-1">{link.title}</h4>
									<p class="opacity-80 break-all">{link.value}</p>
								</div>
								<div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
									</svg>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		{#if shouldShow}
			<div in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }} class="text-center mt-20">
				<div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
					<h3 class="text-2xl font-bold mb-4">Open to Opportunities</h3>
					<p class="text-lg opacity-80 mb-6">
						I'm currently available for <span class="font-semibold">full-time positions</span> and 
						<span class="font-semibold">freelance projects</span> in:
					</p>
					<div class="flex flex-wrap justify-center gap-4">
						<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Full Stack Development</span>
						<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">E-commerce Solutions</span>
						<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Enterprise Applications</span>
						<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">API Development</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
