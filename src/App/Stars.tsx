import './stars.css';

const starLeft = 2.3333;
const starWidth = 17.6667;

function Stars(props: { value: number, starHeight: number, includeText?: boolean, gray?: boolean }) {
  return <div className='d-flex align-content-center stars'>
    {[...Array(5).keys()].map(starNum => <svg key={starNum} className='star-svg' version='1.1' xmlns='http://www.w3.org/2000/svg' width={21/20*props.starHeight} height={props.starHeight} viewBox={'0 0 21 20'}>
      <mask id='star-mask'>
        <rect fill='black' width='25px' height='24px' x='-2px' y='-2px'/>
        <path fill='white' d='M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
	    l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z'/>
      </mask>
      <rect className='star-bg' width='19px' height='18px' x='1px' y='1px'/>
      <rect className={`star-fg ${props.gray !== undefined && 'star-gray'}`} width={`${starLeft+starWidth*Math.max(0, Math.min(1, props.value-starNum))-2}px`} height='18px' x='1px' y='1px' />
      <rect mask='url(#star-mask)' width='25px' height='24px' x='-2px' y='-2px'/>
    </svg>)}
    {props.includeText && <div className='star-text fw-bold ms-1 d-flex align-items-end justify-items-end' style={{ fontSize: `${props.starHeight/30}rem` }}><div>{`(${props.value.toFixed(1)}/5)`}</div></div>}
  </div>
}

export default Stars;