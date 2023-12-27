// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button() {
  const disabledStyle = {
    '&.Mui-disabled': {}
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 100
        },

        outlined: {
          ...disabledStyle
        }
      }
    }
  };
}
