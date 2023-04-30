import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Seats',
  description: 'Allocating Seats for Exams',
  icons: {
    icon: '/seats.ico',
    alt: 'seats',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-[#8080FF] scrollbar'>
      <body className='bg-[#8080ff]'>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}
