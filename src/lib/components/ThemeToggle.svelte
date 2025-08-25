<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/theme';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<button
  on:click={toggleTheme}
  class="fixed top-6 right-6 z-50 w-14 h-14 rounded-full backdrop-blur-md border-2 transition-all duration-300 hover:scale-110 active:scale-95 group
    {$theme === 'dark' 
      ? 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/80' 
      : 'bg-white/80 border-gray-200 hover:bg-gray-50/80'}"
  aria-label="Toggle theme"
>
  <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
    {#if $theme === 'light'}
      <div
        in:fly={{ y: -20, duration: 300, easing: quintOut }}
        out:fly={{ y: 20, duration: 300, easing: quintOut }}
        class="absolute"
      >
        <svg class="w-6 h-6 text-yellow-500 transition-transform group-hover:rotate-180 duration-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
      </div>
    {:else}
      <div
        in:fly={{ y: -20, duration: 300, easing: quintOut }}
        out:fly={{ y: 20, duration: 300, easing: quintOut }}
        class="absolute"
      >
        <svg class="w-6 h-6 text-blue-400 transition-transform group-hover:rotate-12 duration-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    {/if}
  </div>
</button>

<style>
  button {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
  
  button:hover {
    box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -8px rgba(0, 0, 0, 0.1);
  }
  
  :global(.dark) button {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
  }
  
  :global(.dark) button:hover {
    box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.4), 0 10px 15px -8px rgba(0, 0, 0, 0.3);
  }
</style> 