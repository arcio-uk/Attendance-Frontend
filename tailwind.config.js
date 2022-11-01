/* eslint-disable global-require */
module.exports = {
  content: ['./components/**/*.{html,js,jsx}', './public/index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    extend: {
      colors: {
        primary: '#eb641e',
      },
      minHeight: {
        48: '12rem',
      },
      animation: {
        buttonGradient: 'buttonGradient 0.5s ease infinite',
        errorOutline: 'errorOutline 1.5s ease-in-out',
      },
      keyframes: {
        buttonGradient: {
          '0%, 100%': {
            backgroundPosition: '81% 0%',
          },
          '50%': {
            backgroundPosition: '20% 100%',
          },
        },
        errorOutline: {
          '0%': {
            borderWidth: '20px',
            borderColor: '#A43D36',
            padding: '5px',
          },
          '100%': {
            borderWidth: '0px',
            borderColor: '#F80000',
            padding: '0px',
          },
        },
      },
      backgroundSize: {
        buttonGradient: '150% 150%',
      },
    },
  },
  plugins: [
    require('tailwindcss-animatecss')({
      classes: [
        'animate__animated',
        'animate__infinite',
        'animate__heartBeat',
        'animate__headShake',
        'animate__jello',
        'animate__tada',
        'animate__swing',
        'animate__bounce',
        'animate__flip',
        'animate__backOutDown',
        'animate__zoomOut',
        'animate__flipOutY',
        'animate__flipOutX',
      ],
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 2000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
      variants: ['responsive', 'hover', 'reduced-motion'],
    }),
    require('tailwindcss-textshadow'),
  ],
};
