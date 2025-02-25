tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFCE00",
          light: "#FFA30F"
        },
        secondary: "#8B5E3C",
        dark: "#3C2F2F",
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      keyframes: {
        textRotate: {
          "0%": {
            transform: "rotate(0deg)",
            opacity: "0.5",
          },
          "100%": {
            transform: "rotate(-360deg)",
            opacity: "1",
          },
        },
        textRotateReverse: {
          "0%": {
            transform: "rotate(-360deg)",
            opacity: "1",
          },
          "100%": {
            transform: "rotate(0deg)",
            opacity: "0.5",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        spin: {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        },
        shimmer: {
          "0%": { 
            transform: "translateX(-100%)" 
          },
          "100%": { 
            transform: "translateX(100%)" 
          }
        }
      },
      animation: {
        textRotate: "textRotate 0.4s ease-out forwards",
        textRotateReverse: "textRotateReverse 0.4s ease-out forwards",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
    },
  },
}; 

const CONFIG = {
  WEATHER_API_KEY: 'YOUR_API_KEY', // Replace with actual API key
  RESTAURANT: {
      lat: 48.8737,
      lng: 2.3390,
      address: '30 Rue Le Peletier, 75009 Paris, France',
      phone: '+81123456789',
      email: 'contact@restaurant.com',
      hours: {
          open: 9,
          close: 17
      }
  }
};