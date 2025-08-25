<script lang="ts">
  import { fly, scale } from 'svelte/transition';
  import { quintOut, backOut } from 'svelte/easing';

  export let title: string;
  export let icon: string;
  export let skills: string[];
  export let color: 'blue' | 'green' | 'purple' | 'orange' | 'red' = 'blue';
  export let delay: number = 0;
  export let isVisible: boolean = false;

  const colorClasses = {
    blue: {
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      skillBg: 'bg-blue-50 dark:bg-blue-900/50',
      skillText: 'text-blue-700 dark:text-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      iconBg: 'bg-green-100 dark:bg-green-900',
      skillBg: 'bg-green-50 dark:bg-green-900/50',
      skillText: 'text-green-700 dark:text-green-200',
      gradient: 'from-green-500 to-green-600'
    },
    purple: {
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      skillBg: 'bg-purple-50 dark:bg-purple-900/50',
      skillText: 'text-purple-700 dark:text-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    orange: {
      iconBg: 'bg-orange-100 dark:bg-orange-900',
      skillBg: 'bg-orange-50 dark:bg-orange-900/50',
      skillText: 'text-orange-700 dark:text-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    },
    red: {
      iconBg: 'bg-red-100 dark:bg-red-900',
      skillBg: 'bg-red-50 dark:bg-red-900/50',
      skillText: 'text-red-700 dark:text-red-200',
      gradient: 'from-red-500 to-red-600'
    }
  };

  $: currentColors = colorClasses[color];
</script>

{#if isVisible}
  <div 
    in:fly={{ y: 50, duration: 800, easing: quintOut, delay }}
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group transform hover:-translate-y-2"
  >
    <!-- Background gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br {currentColors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
    
    <!-- Icon -->
    <div 
      class="w-16 h-16 {currentColors.iconBg} rounded-lg flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
    >
      <span class="text-2xl relative z-10">{icon}</span>
      <div class="absolute inset-0 bg-gradient-to-br {currentColors.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
    
    <!-- Title -->
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-{color}-600 dark:group-hover:text-{color}-400 transition-colors duration-300">
      {title}
    </h3>
    
    <!-- Skills -->
    <div class="flex flex-wrap gap-2">
      {#each skills as skill, index}
        {#if isVisible}
          <span 
            in:scale={{ 
              duration: 400, 
              delay: delay + 100 + index * 50,
              easing: backOut 
            }}
            class="px-3 py-1 {currentColors.skillBg} {currentColors.skillText} rounded-full text-sm font-medium 
                   hover:scale-105 transition-all duration-300 cursor-default
                   hover:shadow-md relative overflow-hidden group/skill"
          >
            <span class="relative z-10">{skill}</span>
            <div class="absolute inset-0 bg-gradient-to-r {currentColors.gradient} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300"></div>
          </span>
        {/if}
      {/each}
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br {currentColors.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
    <div class="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br {currentColors.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 blur-lg"></div>
  </div>
{:else}
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 opacity-0">
    <!-- Placeholder to maintain layout -->
    <div class="h-48"></div>
  </div>
{/if} 