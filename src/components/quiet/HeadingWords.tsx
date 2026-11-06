import type {CSSProperties} from 'react';
import s from './Quiet.module.css';
export default function HeadingWords({text}:{text:string}){const words=text.split(/\s+/);return <>{words.map((word,i)=><span key={i}><span className={s.headingWord} style={{'--word-delay':`${words.length>1?i*180/(words.length-1):0}ms`} as CSSProperties}>{word}</span>{i<words.length-1?' ':''}</span>)}</>}
