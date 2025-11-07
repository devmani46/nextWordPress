export default function NavBar() {
  return (
    <section className="navbar py-2 w-full mb-8">
      <nav className="flex justify-center my-4">
        <div className="flex justify-between p2-regular text-gray">
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

      <nav className="flex items-center gap-28 justify-center">
        <div className="logo-container flex items-center gap-4">
          <div className="logo-image w-14 h-14  rounded-full bg-blue-500"></div>
          <div className="logo-text-container text-violet-dark p2-semi-bold">
            <p>Non-Residential Nepali</p>
            <p>Gourawala something something</p>
          </div>
        </div>

        <ul className="flex gap-4 text-gray p2-regular ">
          <li>About Us </li>
          <li>Reports & Publications</li>
          <li>News & Events</li>
          <li>Projects</li>
          <li>Gallery</li>
        </ul>
      </nav>
    </section>
  );
}
