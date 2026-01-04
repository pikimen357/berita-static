import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";

import './globals.css';

interface LayoutProps {
    children: React.ReactNode;
}


export  default function Layout({ children } : LayoutProps) {
    return (
        <html lang="en" className={roboto.variable}>
            {/* <head>
                <title>Learn Next.js Fundamental</title>
            </head> */}
            <body className="flex flex-col min-h-screen bg-gray-50">

                <header className="bg-white shadow-md sticky top-0 z-50">
                    <Navbar />
                </header>

                <main className="grow w-full px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </main>

                <footer className="bg-gray-800 text-white mt-12">
                    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-300">© 2024 Next.js Fundamental</p>
                    </div>
                </footer>
                
            </body>
        </html>
    );
}