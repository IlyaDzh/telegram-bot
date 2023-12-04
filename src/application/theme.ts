import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                color: 'var(--tg-theme-text-color)',
                background: 'var(--tg-theme-bg-color)',
            },
        },
    },
    components: {
        Spinner: {
            variants: {
                initial: {
                    color: 'var(--tg-theme-button-color)',
                },
            },
            defaultProps: {
                variant: 'initial',
            },
        },
        Button: {
            // 2. We can add a new button size or extend existing
            sizes: {
                lg: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                solid: {
                    bg: 'var(--tg-theme-button-color)',
                    color: 'var(--tg-theme-button-text-color)',
                    _hover: {
                        bg: 'var(--tg-theme-button-color)',
                        color: 'var(--tg-theme-button-text-color)',
                    },
                    _active: {
                        bg: '#4490c9',
                        color: 'var(--tg-theme-button-text-color)',
                    },
                },
            },
            // 6. We can overwrite defaultProps
            defaultProps: {
                size: 'lg', // default is md
                variant: 'solid', // default is solid
            },
        },
    },
});
