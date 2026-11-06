/** Sections below the fold blur in once as they enter; anything already on screen is left alone. */
export function revealOnScroll(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return()=>{};
 const targets=Array.from(document.querySelectorAll<HTMLElement>('[data-frame] main > section, [data-frame] main > div > section, [data-frame] > footer')).filter(el=>el.getBoundingClientRect().top>innerHeight*.9);
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.setAttribute('data-in','');observer.unobserve(entry.target)}}),{rootMargin:'0px 0px -12% 0px'});
 targets.forEach(el=>{el.setAttribute('data-reveal','');observer.observe(el)});
 return()=>{observer.disconnect();targets.forEach(el=>{el.removeAttribute('data-reveal');el.removeAttribute('data-in')})};
}
