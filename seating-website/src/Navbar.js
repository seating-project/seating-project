import React from 'react'

const Navbar = () => {

    
    const navBar = document.querySelector("nav"),
    menuBtns = document.querySelectorAll(".menu-icon"),
    overlay = document.querySelector(".overlay");

    menuBtns.forEach((menuBtn) => {
        menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
        });
    });

    overlay.addEventListener("click", () => {
        navBar.classList.remove("open");
    });

  return (

    <div>
            <nav>
            <div class="logo">
                <i class="bx bx-menu menu-icon"></i>
                <span class="logo-name">Seating project</span>
            </div>
            <div class="sidebar">
                <div class="logo">
                <i class="bx bx-menu menu-icon"></i>
                <span class="logo-name"></span>
                </div>
                <div class="sidebar-content">
                <ul class="lists">
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-home-alt icon"></i>
                        <span class="link">Dashboard</span>
                    </a>
                    </li>
                    
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-spreadsheet icon"></i>
                        <span class="link">Master Sheet</span>
                    </a>
                    </li>
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-clipboard icon"></i>
                        <span class="link">Notice board sheet</span>
                    </a>
                    </li>
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-pie-chart-alt-2 icon"></i>
                        <span class="link">Attendance</span>
                    </a>
                    </li>
                    <li class="list">
                        <a href="#" class="nav-link">
                        <i class="bx bxs-chalkboard icon"></i>
                        <span class="link">Rooms</span>
                        </a>
                    </li>
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-folder-open icon"></i>
                        <span class="link">User Management</span>
                    </a>
                    </li>
                </ul>

                <div class="bottom-cotent">
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-cog icon"></i>
                        <span class="link">Plug-ins</span>
                    </a>
                    </li>
                    <li class="list">
                    <a href="#" class="nav-link">
                        <i class="bx bx-log-out icon"></i>
                        <span class="link">Logout</span>
                    </a>
                    </li>
                </div>
                </div>
            </div>
            </nav>

            <section class="overlay"></section>

    </div>
  )
}

export default Navbar