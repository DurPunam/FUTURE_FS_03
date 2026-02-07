import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bihar Bhojan - Authentic Bihari Cuisine in Patna",
    template: "%s | Bihar Bhojan"
  },
  description: "Experience authentic Bihari cuisine in the heart of Patna. Traditional dishes, cultural dining, and the rich flavors of Bihar.",
  keywords: ["Bihari cuisine", "Patna restaurant", "authentic Bihari food", "Bihar Bhojan", "traditional Indian food", "Bihari thali"],
  authors: [{ name: "Bihar Bhojan" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://biharbhojan.com",
    siteName: "Bihar Bhojan",
    title: "Bihar Bhojan - Authentic Bihari Cuisine",
    description: "Experience authentic Bihari cuisine in the heart of Patna",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bihar Bhojan Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Bhojan - Authentic Bihari Cuisine",
    description: "Experience authentic Bihari cuisine in the heart of Patna",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
