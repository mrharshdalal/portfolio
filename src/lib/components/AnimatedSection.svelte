<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { quintOut, backOut } from 'svelte/easing';

  export let animationType: 'fade' | 'slide' | 'scale' | 'bounce' = 'fade';
  export let delay: number = 0;
  export let duration: number = 800;
  export let threshold: number = 0.1;
  export let className: string = '';

  let element: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isVisible = true;
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  });

  const getTransitionProps = () => {
    switch (animationType) {
      case 'slide':
        return { y: 50, duration, easing: quintOut };
      case 'scale':
        return { duration, easing: backOut };
      case 'bounce':
        return { y: 100, duration: duration * 1.2, easing: backOut };
      default:
        return { y: 30, duration, easing: quintOut };
    }
  };
</script>

<div bind:this={element} class="animated-section {className}">
  {#if isVisible}
    {#if animationType === 'scale'}
      <div in:scale={getTransitionProps()}>
        <slot />
      </div>
    {:else}
      <div in:fly={getTransitionProps()}>
        <slot />
      </div>
    {/if}
  {:else}
    <div class="opacity-0">
      <slot />
    </div>
  {/if}
</div>

<style>
  .animated-section {
    will-change: transform, opacity;
  }
</style> 