<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { quintOut, backOut } from 'svelte/easing';

  export let experiences: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;

  let timelineElement: HTMLElement;
  let visibleItems: boolean[] = [];

  onMount(() => {
    visibleItems = new Array(experiences.length).fill(false);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              visibleItems[index] = true;
              visibleItems = [...visibleItems];
            }, index * 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = timelineElement?.querySelectorAll('.timeline-item');
    items?.forEach(item => observer.observe(item));

    return () => {
      items?.forEach(item => observer.unobserve(item));
    };
  });
</script>

<div bind:this={timelineElement} class="relative">
  <!-- Timeline line -->
  <div class="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
  
  <!-- Timeline items -->
  {#each experiences as exp, i}
    <div 
      class="timeline-item relative flex items-center mb-16 md:mb-20"
      data-index={i}
    >
      <!-- Timeline dot -->
      <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10">
        {#if visibleItems[i]}
          <div 
            in:scale={{ duration: 600, easing: backOut }}
            class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-75"
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
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
          >
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10">
              <!-- Header -->
              <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p class="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {exp.company}
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 font-medium">
                    {exp.period}
                  </p>
                </div>
                <div class="mt-4 md:mt-0">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                    {i === 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}">
                    {i === 0 ? 'Current' : 'Previous'}
                  </span>
                </div>
              </div>
              
              <!-- Description -->
              <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {exp.description}
              </p>
              
              <!-- Achievements -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Key Achievements
                </h4>
                <ul class="space-y-3">
                  {#each exp.achievements as achievement, achievementIndex}
                    {#if visibleItems[i]}
                      <li 
                        in:fly={{ 
                          x: 20, 
                          duration: 400, 
                          delay: 200 + achievementIndex * 100,
                          easing: quintOut 
                        }}
                        class="flex items-start group/item"
                      >
                        <span class="text-green-500 mr-3 mt-1 transition-transform group-hover/item:scale-125">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        </span>
                        <span class="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {achievement}
                        </span>
                      </li>
                    {/if}
                  {/each}
                </ul>
              </div>
              
              <!-- Technologies -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Technologies Used
                </h4>
                <div class="flex flex-wrap gap-2">
                  {#each exp.technologies as tech, techIndex}
                    {#if visibleItems[i]}
                      <span 
                        in:scale={{ 
                          duration: 300, 
                          delay: 400 + techIndex * 50,
                          easing: backOut 
                        }}
                        class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 
                               text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium 
                               hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800 dark:hover:to-purple-800
                               transition-all duration-300 cursor-default transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    {/if}
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 opacity-0">
            <!-- Placeholder to maintain layout -->
            <div class="h-96"></div>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

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