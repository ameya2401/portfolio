import Image from 'next/image';
import s from './Quiet.module.css';
export default function Tool({name,logo}:{name:string;logo?:string}){return <span className={s.tool}>{logo&&!['claude','paper'].includes(logo)&&<Image src={`/logos/${logo}.svg`} width={15} height={15} alt="" unoptimized className={s.toolLogo}/>}{name}</span>}
