import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <div className="transition-all duration-300 ease-in-out">
          {children}
        </div>
      </body>
    </html>
  );
}