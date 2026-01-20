import "../styles/globals.css";

export const metadata = {
  title: "Edibles Recipe",
  description: "Generate recipes from ingredients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
