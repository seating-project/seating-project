export const metadata = {
  title: 'Seats',
  description: 'Allocating Seats for Exams',
  icons: {
    icon: 'favicon.ico',
    alt: 'seats',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-gray-100 scrollbar'>
      <body className='bg-gray-100'>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}
