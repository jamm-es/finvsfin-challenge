import { Data, Review } from './types';
import './description.css';
import Stars from "./Stars";
import { useEffect, useRef, useState } from "react";

const CAROUSEL_SCROLL_AMOUNT = 200;
const CAROUSEL_SCROLL_BUFFER = 50;

function Description(props: { data: Data | null }) {
  const [reviewSortMethod, setReviewSortMethod] = useState<string>("Review Date");
  const [showLeftCarouselButton, setShowLeftCarouselButton] = useState<boolean>(false);
  const [showRightCarouselButton, setShowRightCarouselButton] = useState<boolean>(true);
  const [carouselShiftAmount, setCarouselShiftAmount] = useState<number>(0);
  const articleCarouselRef = useRef<HTMLDivElement>(null);
  const articleCarouselViewRef = useRef<HTMLDivElement>(null);

  const handleLeftArticleShift = () => {
    if(articleCarouselRef.current === null) {
      return;
    }

    const scrollLimit = 0;
    const newScroll = carouselShiftAmount-CAROUSEL_SCROLL_AMOUNT < CAROUSEL_SCROLL_BUFFER ? scrollLimit : carouselShiftAmount-CAROUSEL_SCROLL_AMOUNT;
    if(newScroll <= 0) {
      setShowLeftCarouselButton(false);
    }
    if(!showRightCarouselButton) {
      setShowRightCarouselButton(true);
    }
    setCarouselShiftAmount(Math.max(newScroll, scrollLimit));
  }

  const handleRightArticleShift = () => {
    console.log(articleCarouselRef.current === null, articleCarouselViewRef.current === null)
    if(articleCarouselRef.current === null || articleCarouselViewRef.current === null) {
      return;
    }

    const scrollLimit = articleCarouselRef.current.clientWidth-articleCarouselViewRef.current.clientWidth;
    const newScroll = carouselShiftAmount+CAROUSEL_SCROLL_AMOUNT > scrollLimit-CAROUSEL_SCROLL_BUFFER ? scrollLimit : carouselShiftAmount+CAROUSEL_SCROLL_AMOUNT;
    if(newScroll >= scrollLimit) {
      setShowRightCarouselButton(false);
    }
    if(!showLeftCarouselButton) {
      setShowLeftCarouselButton(true);
    }
    setCarouselShiftAmount(Math.min(newScroll, scrollLimit));
  }

  const sortByReviewDate = (a: Review, b: Review) => {
    return - new Date(a.date.year, a.date.month-1, a.date.day).getTime()
      + new Date(b.date.year, b.date.month-1, b.date.day).getTime();
  }

  const sortByOverallRating = (a: Review, b: Review) => {
    return b.rating.overall - a.rating.overall;
  }

  if(props.data === null) {
    return <></>
  }

  return <main className='content content-description mx-auto'>
    <h6>About</h6>
    <p className='lh-1'>{props.data.about}</p>

    <h6>Education & Credentials</h6>
    {props.data!.credentials.map(d => <p className='lh-1' key={d._id}>{d.degreeType} {d.areaOfStudy} - {d.institution}</p>)}

    <h6>Publications</h6>
    {props.data!.publications.map(d => <p className='lh-1' key={d._id}><a href={d.link} className='citation'>{d.citation}</a></p>)}

    <h6>Reviewed Articles</h6>
    <div ref={articleCarouselViewRef} className='content overflow-hidden position-relative'>
      <div ref={articleCarouselRef} className='d-flex article-carousel' style={{ translate: `${-carouselShiftAmount}px 0`, width: 'min-content', gap: '1.5rem' }}>
        {props.data.articles.map((article, index) => <div className='card' key={index}>
          <div className='card-body article'>
            <p className='article-link mb-2'><a href={article.link}>{new URL(article.link).hostname}</a></p>
            <p className='article-pubdate fst-italic mb-2'>Published {article.date.month}/{article.date.day}/{article.date.year}</p>
            <p className='fw-bold lh-1 mb-2'>{article.title}</p>
            <p className='lh-1 mb-2 article-description'>{article.description}</p>
            <img className='rounded' src={article.image}/>
          </div>
        </div>)}
      </div>
      <div className='position-absolute d-flex align-items-center top-0 h-100 start-0'>
        <div onClick={handleLeftArticleShift} className={`article-button rounded-pill opacity-75 d-flex align-items-center justify-content-center ${!showLeftCarouselButton && 'invisible'}`}>
          <span className='carousel-control-prev-icon' />
        </div>
      </div>
      <div className='position-absolute d-flex align-items-center top-0 h-100 end-0'>
        <div onClick={handleRightArticleShift} className={`article-button rounded-pill opacity-75 d-flex align-items-center justify-content-center ${!showRightCarouselButton && 'invisible'}`}>
          <span className='carousel-control-next-icon' />
        </div>
      </div>
    </div>

    <div className='d-flex justify-content-between align-items-start mt-4 mb-2 reviews-header'>
      <div className='d-flex justify-content-center align-items-end'>
        <h6 className='my-0 me-2' style={{ height: 'min-content' }}>Reviews</h6>
        <Stars value={props.data.pubRating} starHeight={24} includeText/>
      </div>
      <div className='sort mb-0 d-flex align-items-center'>
        <p className='mb-0'>
          Sort by:
        </p>
        <div className="dropdown">
          <button className="btn rounded-0 dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {reviewSortMethod}
          </button>
          <ul className="dropdown-menu rounded-0">
            <li className='dropdown-item' onClick={() => setReviewSortMethod('Review Date')}>Review Date</li>
            <li className='dropdown-item' onClick={() => setReviewSortMethod('Overall Rating')}>Overall Rating</li>
          </ul>
        </div>
      </div>
    </div>

    <div className='d-flex review-container flex-column mb-5'>
      {props.data.reviews.sort(reviewSortMethod === 'Review Date' ? sortByReviewDate : sortByOverallRating).map(review => <div className='card' key={review.title}>
        <div className='card-body'>
          <div className='d-flex review-description-container'>
            <div className='d-flex flex-column'>
              <p className='fw-bold mb-2 review-title'>{review.title}</p>
              <p className='mb-2 review-description'>{review.description}</p>
            </div>
            <div className='d-flex flex-column'>
              <div className='d-flex justify-content-between'>
                <p className='fw-bold mb-2 review-title me-3'>Overall</p>
                <Stars value={review.rating.overall} starHeight={24}/>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='fw-bold mb-1 review-subcategory me-3'>Communication</p>
                <Stars value={review.rating.communication} starHeight={16} gray/>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='fw-bold mb-1 review-subcategory me-3'>Timeliness</p>
                <Stars value={review.rating.timeliness} starHeight={16} gray/>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='fw-bold mb-0 review-subcategory me-3'>Value</p>
                <Stars value={review.rating.value} starHeight={16} gray/>
              </div>
            </div>
          </div>
          <p className='lh-1 review-date mb-0'>Review Date: {review.date.month}/{review.date.day}/{review.date.year}</p>
        </div>
      </div>)}
    </div>
  </main>
}

export default Description;