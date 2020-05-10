import React from 'react';

export default ({l, keyword})=> {
  const star = ()=> {};
  
  return <li key={l.id} className={l.isTop5 ? 'top5' : ''}>
  <div className='title'>
    <img className='avatar' alt='avatar' src="https://eleduck.com/static/favicon.ico" />{l.title}
  </div>
  <a href={l.url} target='_blank'>{l.url}</a>
  <span>
    <span className='plus' onClick={()=> star(keyword, l, '1')}>+</span>
    <button className='star-button'>
      <svg class="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
      <span>{l.star}</span>
    </button>
    <span class='minus' onClick={()=> star(keyword, l, '2')}>-</span>
  </span>
</li>
}