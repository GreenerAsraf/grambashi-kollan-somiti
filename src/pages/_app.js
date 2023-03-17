import store from "@/app/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Footer></Footer>
    </Provider>
  );
}
