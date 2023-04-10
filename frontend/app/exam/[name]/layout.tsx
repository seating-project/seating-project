import Navbar from "../../../components/Navbar"

export default function ExamLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return (
        // <html lang="en">
        // <body>
        //     <Navbar />
        //     {children}
        // </body>
        // </html>
        <div>
            {/* <Navbar /> */}
            {children}
        </div>
    )
    }