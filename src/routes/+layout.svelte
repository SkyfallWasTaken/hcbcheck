<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="flex flex-col items-center mt-16 h-screen">
  {@render children()}
</main>
