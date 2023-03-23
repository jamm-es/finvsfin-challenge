import './navbar.css';
import React from "react";

const NavbarWrapped = React.forwardRef<HTMLElement>(Navbar);

function Navbar(_: {}, ref: React.ForwardedRef<HTMLElement>) {
  return <nav className='navbar navbar-expand-md px-4 py-2 position-sticky top-0' ref={ref}>
    <a className='navbar-brand' href='#'>
      <h2 className='fw-bold'>
        AuthorityGenius
        <span className='badge'>Beta</span>
      </h2>
    </a>

    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar-links'>
      <span className='navbar-toggler-icon'></span>
    </button>

    <div className='collapse navbar-collapse justify-content-end' id='navbar-links'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <a className='nav-link active' href='#'>Find an Expert</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>Manage Account</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
}

export default NavbarWrapped;