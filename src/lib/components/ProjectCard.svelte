<script lang="ts">
  import { fly, scale } from 'svelte/transition';
  import { quintOut, backOut } from 'svelte/easing';

  export let project: {
    name: string;
    description: string;
    technologies: string[];
    features: string[];
    status: string;
  };
  export let delay: number = 0;
  export let isVisible: boolean = false;
</script>

{#if isVisible}
  <div 
    in:fly={{ y: 60, duration: 1000, easing: quintOut, delay }}
    class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl 
           transition-all duration-700 border border-white/20 dark:border-gray-700/30 
           relative overflow-hidden group transform hover:-translate-y-3 hover:rotate-1"
  >
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <!-- Glassmorphism overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent 
                opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
    
    <div class="relative z-10 p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 
                   dark:group-hover:text-blue-400 transition-colors duration-300">
          {project.name}
        </h3>
        <span 
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                 {project.status === 'Production' 
                   ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 group-hover:bg-green-200 dark:group-hover:bg-green-800/50' 
                   : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50'}"
        >
          {project.status}
        </span>
      </div>
      
      <!-- Description -->
      <p class="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg">
        {project.description}
      </p>
      
      <!-- Features -->
      <div class="mb-8">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
          Key Features
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {#each project.features as feature, index}
            {#if isVisible}
              <div 
                in:fly={{ x: -20, duration: 500, delay: delay + 200 + index * 100, easing: quintOut }}
                class="flex items-center bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-3 
                       hover:bg-gray-100/80 dark:hover:bg-gray-600/50 transition-all duration-300
                       border border-gray-200/50 dark:border-gray-600/30"
              >
                <div class="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3"></div>
                <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            {/if}
          {/each}
        </div>
      </div>
      
      <!-- Technologies -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
          Technologies
        </h4>
        <div class="flex flex-wrap gap-3">
          {#each project.technologies as tech, index}
            {#if isVisible}
              <span 
                in:scale={{ 
                  duration: 400, 
                  delay: delay + 400 + index * 80,
                  easing: backOut 
                }}
                class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 
                       dark:from-blue-900/50 dark:to-purple-900/50 
                       text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold
                       hover:from-blue-200 hover:to-purple-200 
                       dark:hover:from-blue-800/50 dark:hover:to-purple-800/50
                       transition-all duration-300 cursor-default transform hover:scale-110
                       shadow-md hover:shadow-lg border border-blue-200/50 dark:border-blue-700/30"
              >
                {tech}
              </span>
            {/if}
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Decorative floating elements -->
    <div class="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 
                rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
    <div class="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 
                rounded-full blur-xl group-hover:scale-125 transition-transform duration-1000"></div>
    
    <!-- Animated border -->
    <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm"></div>
  </div>
{:else}
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl 
             border border-white/20 dark:border-gray-700/30 opacity-0">
    <!-- Placeholder to maintain layout -->
    <div class="p-8 h-96"></div>
  </div>
{/if}

<style>
  .shadow-3xl {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
  }
</style> 