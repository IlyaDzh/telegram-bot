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
        NumberInput: {
            variants: {
                outline: {
                    stepper: {
                        color: 'var(--tg-theme-text-color)',
                    },
                },
            },
        },
        Card: {
            variants: {
                outline: {
                    container: {
                        backgroundColor: 'var(--tg-theme-bg-color)',
                    },
                },
            },
        },
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
            sizes: {
                lg: {
                    minH: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
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
            defaultProps: {
                size: 'lg',
                variant: 'solid',
            },
        },
    },
});
