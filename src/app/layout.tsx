import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Jost } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.scss";
import Header from "@/shared/ui/Layout/Header";
import Footer from "@/shared/ui/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/shared/lib/redux/provider";
import { AuthProvider } from "@/shared/hook/AuthContext/ui/AuthContext";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIVENO",
  description: "SIVENO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <body className={`font-raleway antialiased`}>

      {/* Yandex.Metrika */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(100833094, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });
          `}
      </Script>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/100833094"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      {/* Yandex.Metrika */}

      {/* Top.Mail.Ru counter */}
      <Script id="top-mail-ru" strategy="afterInteractive">
        {`
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3640558", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
          `}
      </Script>
      <noscript>
        <div>
          <img
            src="https://top-fwz1.mail.ru/counter?id=3640558;js=na"
            style={{ position: "absolute", left: "-9999px" }}
            alt="Top.Mail.Ru"
          />
        </div>
      </noscript>
      {/* /Top.Mail.Ru counter */}

      <ReduxProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <ToastContainer />
              <Header />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
