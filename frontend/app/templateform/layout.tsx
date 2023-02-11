"use client";
import "../../styles/globals.css";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
