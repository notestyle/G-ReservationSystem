<template>
  <Container/>
</template>

<script>
import Container from "@/components/Container.vue";
import Login from "@/pages/Login.vue";

export default {
  name: "PageController",
  components: { Container },
  computed: {
    get_is_logged() {
      return this.$store.getters.get_is_logged;
    },
    get_router: function() {
      return this.$route;
    }
  },
  mounted() {
    if (this.$store.getters.get_is_logged != 1) {
      this.$router.push("/login");
    } else if (this.$route.path === "/") {
      this.$router.push("/dashboard");
    }
  }
};
</script>