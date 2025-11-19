export default function NavBar() {
  return (
    <section className="navbar mb-8 w-full py-2">
      <nav className="my-4 flex justify-center">
        <div className="p2-regular m-auto flex w-[70%] justify-between gap-44 text-gray">
          <p>+977-014511530, 014526005</p>
          <ul className="flex gap-2">
            <li>Africa</li>
            <li>America</li>
            <li>Asia Pacific</li>
            <li>Europe</li>
            <li>Middle East</li>
            <li>Oceania</li>
          </ul>
        </div>
      </nav>

      <nav className="m-auto flex w-[70%] items-center justify-between gap-28">
        <div className="logo-container flex items-center gap-4">
          <div className="logo-image h-14 w-14">
            <img src="/logo.jpg" />
          </div>
          <div className="logo-text-container p2-semi-bold text-violet-dark">
            <p>Non-Residential Nepali</p>
            <p>Gourawala something something</p>
          </div>
        </div>

        <ul className="p2-regular flex items-center gap-4 text-gray">
          <li className="flex items-center gap-1">
            About Us
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li className="flex items-center gap-1">
            Resources{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li className="flex items-center gap-1">
            Reports & Publications{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li className="flex items-center gap-1">
            News & Events{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li className="flex items-center gap-1">Projects </li>
          <li>Gallery</li>
        </ul>
      </nav>
    </section>
  );
}
