import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div className="fixed text-sm md:text-base p-2 backdrop-blur-md rounded right-2 border border-zinc-700/30 shadow bottom-1 text-center text-gray-500 z-50">
          <p>
            © Made with ❤️ by{" "}
            <a
              href="#"
              target="_blank"
              className="text-zinc-200 hover:underline"
              rel="noopener noreferrer"
            >
              Siddhartha
            </a>{" "}🙇{" "}
          </p>
        </div>
      </body>
    </Html>
  )
}
