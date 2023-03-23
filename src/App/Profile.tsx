import { Data } from './types';
import './profile.css';
import Stars from "./Stars";
import React, { useEffect, useMemo, useState } from "react";

const SCROLL_THRESH = 172.4;

const ProfileWrapped = React.forwardRef<HTMLDivElement, { data: Data | null }>(Profile);

function Profile(props: { data: Data | null }, ref: React.ForwardedRef<HTMLDivElement>) {
  const [scrollY, setScrollY] = useState(0);
  const [collapseAside, setCollapseAside] = useState(false);
  // const [collapseAside, setCollapseAside] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setScrollY(prevState => {
        const newState = window.scrollY;
        if(prevState <= SCROLL_THRESH && newState > SCROLL_THRESH) {
          setCollapseAside(true);
        }
        else if(prevState > SCROLL_THRESH && newState <= SCROLL_THRESH) {
          setCollapseAside(false);
        }
        return newState;
      });
    })
  }, []);

  if(props.data === null) {
    return <></>
  }

  return <div className={`profile-container content-profile mx-auto py-4`} ref={ref}>
    <div className={`profile d-grid`}>
      <img src={props.data.avatar} className='rounded avatar' data-flip-key='avatar'/>

      <div className='bio d-flex flex-column justify-content-center' data-flip-key='bio'>
        <h3 className='fw-bold mb-0'>{props.data.user.firstName} {props.data.user.lastName}</h3>
        <h4>{props.data.credentials[0].degreeType} {props.data.credentials[0].areaOfStudy}</h4>
        <Stars value={4.5} starHeight={30} includeText/>
      </div>

      <hr className='profile-hr'/>

      <div className='hiring text-end d-flex flex-column justify-content-between' data-flip-key='hiring'>
        <div className='rate fw-bold'>
          <span>${props.data.ratePerArticle}</span> / Article
        </div>

        <div className='hire-button'>
          <button className='rounded-pill fw-bold '>Hire</button>
        </div>
      </div>
    </div>

    <div className={`collapse-aside-container ${collapseAside && 'collapse-aside-container-active'} card`}>
      <div className={`profile d-grid collapse-aside card-body`}>
        <img src={props.data.avatar} className='rounded avatar' data-flip-key='avatar'/>
        <div className='bio d-flex flex-column justify-content-center' data-flip-key='bio'>
          <h3 className='fw-bold mb-0'>{props.data.user.firstName} {props.data.user.lastName}</h3>
          <h4>{props.data.credentials[0].degreeType} {props.data.credentials[0].areaOfStudy}</h4>
          <Stars value={4.5} starHeight={24} includeText/>
        </div>

        <hr className='profile-hr'/>

        <div className='hiring text-end d-flex flex-column justify-content-between' data-flip-key='hiring'>
          <div className='rate fw-bold'>
            <span>${props.data.ratePerArticle}</span> / Article
          </div>

          <div className='hire-button'>
            <button className='rounded-pill fw-bold '>Hire</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ProfileWrapped;