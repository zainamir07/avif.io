import Document, { Head, Html, Main, NextScript } from "next/document";

type LayoutProps = {};

class Layout extends Document<LayoutProps> {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="w-full text-base text-white bg-bg-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Layout;
