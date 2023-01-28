<template>
  <div>
    <the-header />
    <why-section />
    <inspiration-section />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import WhySection from '../components/WhySection.vue';
import InspirationSection from '../components/InspirationSection.vue';

export default {
  name: 'HomeView',
  components: {
    TheHeader,
    WhySection,
    InspirationSection
  }
}
</script>
