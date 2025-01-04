import "./globals.css";
import MainHeaderBackground from "@/components/main-header/main-header-background";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground />

        {children}
      </body>
    </html>
  );
}
