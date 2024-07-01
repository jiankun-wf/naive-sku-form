import { computed } from "vue";

export const useProviderConfig = ({ props }: { props: any }) => {
  const getConfigProviderProps = computed(() => ({
    abstract: props.abstract,
    themeOverrides: props.themeOverrides,
    clsPrefix: props.clsPrefix,
    breakpoints: props.breakpoints,
    theme: props.theme,
    inlineThemeDisabled: props.inlineThemeDisabled,
    tag: props.tag,
  }));

  return { getConfigProviderProps };
};
