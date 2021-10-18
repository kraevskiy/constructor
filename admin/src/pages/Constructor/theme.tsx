import { createTheme } from "@material-ui/core/styles";
// import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";

export default createTheme({
  typography: {
    // useNextVariants: true,
    allVariants: {
      color: "#fff",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#E535AB",
      // main: "#279dc9",
    },
    // secondary: amber,
    secondary: amber,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    // contrastText: "#fff",
    // background:'red'
  },
});
