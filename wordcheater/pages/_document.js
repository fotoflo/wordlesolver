import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx){
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
      return (
            <Html>
              <Head>
                <meta charset="utf-8" />
                <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                  name="description"
                  content="Web site created using create-react-app"
                />
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
                {/* <!--
                  manifest.json provides metadata used when your web app is installed on a
                  user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
                --> */}
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                {/* <!--
                  Notice the use of %PUBLIC_URL% in the tags above.
                  It will be replaced with the URL of the `public` folder during the build.
                  Only files inside the `public` folder can be referenced from the HTML.

                  Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                  work correctly both with client-side routing and a non-root public URL.
                  Learn how to configure a non-root public URL by running `npm run build`.
                --> */}
                {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

                <script async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ACTIVE}`}
                />

                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ACTIVE}', {
                    page_path: window.location.pathname,
                  });
                `,
                  }}
                />

                <meta property="og:title" content="WordCheater - The Wordle Solver" />
                <meta property="og:image" content="%PUBLIC_URL%/assets/WordCheaterOgImg.jpg" />
                <meta property="og:description" content="WordCheater helps you find 5 letter words!" />

              </Head>
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
        )
      }
    }
export default MyDocument
