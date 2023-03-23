import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Profile from './Profile';
import Navbar from './Navbar';
import Description from './Description';
import { Data } from './types';
import './app.css';

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);

  // load test data
  useEffect(() => {
    fetch('/test_data.json')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    })
  }, []);

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  // ensure horizontal rule sticks below navbar
  const updateNavbarHeight = navbarRef.current !== null ? navbarRef.current.getBoundingClientRect().height : 0;
  useLayoutEffect(() => {
    const curNavbarHeight = navbarRef.current !== null ? navbarRef.current.getBoundingClientRect().height : 0;
    if(hrRef.current !== null && profileRef.current !== null && navbarRef.current !== null) {
      if(windowWidth > 1170) {
        hrRef.current.style.top = `${curNavbarHeight}px`;
      }
      else if(windowWidth > 580) {
        profileRef.current.style.top = `${curNavbarHeight}px`;
        hrRef.current.style.top = `${curNavbarHeight+148}px`;
      }
      else if(windowWidth > 450) {
        profileRef.current.style.top = `${curNavbarHeight}px`;
        hrRef.current.style.top = `${curNavbarHeight+134}px`;
      }
      else {
        profileRef.current.style.top = `${curNavbarHeight}px`;
        hrRef.current.style.top = `${curNavbarHeight+182.8}px`;
      }
    }
  }, [updateNavbarHeight, windowHeight, windowWidth, hrRef.current !== null, profileRef.current !== null, navbarRef.current !== null]);

  return <>
    <Navbar ref={navbarRef}/>
    <div className='content-container d-grid'>
      <Profile data={data} ref={profileRef}/>
      <hr className='content-hr position-sticky' ref={hrRef} style={{ zIndex: 999 }}/>
      <Description data={data}/>
    </div>
  </>
}

export default App;