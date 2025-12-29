import Link from "next/link";

export default function Navbar() {
    return (
                    <nav className="px-4 py-5 sm:px-6 lg:px-8 bg-gray-300">
                        <ul className="flex gap-8 items-center justify-start">
                            <li>
                                <Link href="/" className="text-gray-800 hover:text-blue-600 hover:underline font-semibold transition duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-800 hover:text-blue-600 hover:underline font-semibold transition duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-800 hover:text-blue-600 hover:underline font-semibold transition duration-200">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-800 hover:text-blue-600 hover:underline font-semibold transition duration-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
    )};