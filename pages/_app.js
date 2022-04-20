import Layout from "../components/Layout";

// global css는 _app.js 파일에만 import 할 수 있다.
import "../styles/reset.scss";
import "../styles/common.scss";
import "../styles/article.scss";

export default function App({ Component, pageProps }) {
  console.log(pageProps);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
