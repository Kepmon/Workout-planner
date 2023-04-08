import type { Ref } from "vue";

export const handleModal = (modal: Ref<boolean>, disappear: boolean): void => {
  modal.value = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (disappear) {
    setTimeout(() => {
      modal.value = false;
    }, 3000);
  }
};
