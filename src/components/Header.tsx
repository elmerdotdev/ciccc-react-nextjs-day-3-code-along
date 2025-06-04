import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-3 bg-gray-600">
      <div className="logo">LOGO</div>
      <nav>
        <menu className="flex items-center gap-6">
          <li>
            <Link href="/" className="underline">Home</Link>
          </li>
          <li>
            <Link href="/todos" className="underline">To Dos</Link>
          </li>
        </menu>
      </nav>
    </header>
  )
}

export default Header