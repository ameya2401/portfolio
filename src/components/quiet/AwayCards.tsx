import Image from 'next/image';
import {personalProfiles} from '@/data/quiet';
import h from './Home.module.css';
const away=[{kind:'Music',...personalProfiles[0]},{kind:'Code',...personalProfiles[1]},{kind:'Community',...personalProfiles[2]}];
export default function AwayCards(){return <div className={h.cards}>{away.map(item=><a key={item.name} className={h.card} href={item.href} target="_blank" rel="noreferrer"><span className={`${h.cardImage} ${item.image.startsWith('/brands')?h.contain:''}`}><Image src={item.image} alt="" fill sizes="(max-width:640px) 72vw, 230px"/></span><span className={h.cardMeta}><span className={h.cardKind}>{item.kind}</span><span className={h.cardName}><Image src={item.logo} alt="" width={14} height={14} unoptimized/>{item.name}</span><span className={h.cardNote}>{item.note}</span></span></a>)}</div>}
