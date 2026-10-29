import {csvCell} from './production';
export type Module = 'projects'|'scenes'|'shots'|'days'|'crew'|'tasks'|'expenses';
export interface Entity { id:string; projectId?:string; title:string; status:string; description?:string; type?:string; date?:string; location?:string; amount?:string; actual?:string; category?:string; currency?:string; sceneId?:string; dayId?:string; role?:string; email?:string; time?:string; lens?:string; movement?:string; priority?:string; number?:string; lighting?:string; angle?:string; size?:string; duration?:string; notes?:string; }
export type WorkspaceData = Record<Module,Entity[]>;
export const modules:Module[]=['projects','scenes','shots','days','crew','tasks','expenses'];
export function decimalCents(value:string='0'):number { if(!/^\d+(\.\d{1,2})?$/.test(value)) throw new Error('Enter a non-negative amount with up to two decimal places.');const [whole,part='']=value.split('.');const n=Number(whole)*100+Number(part.padEnd(2,'0'));if(!Number.isSafeInteger(n))throw new Error('Amount is too large');return n; }
export function parseFountain(text:string,projectId:string):Entity[]{return text.split(/\r?\n/).filter(line=>/^\s*(INT\.?|EXT\.?|INT\.?\/EXT\.?|I\/E\.?)[ .]/i.test(line)).map((title,index)=>({id:crypto.randomUUID(),projectId,title:title.trim(),number:String(index+1),status:'Planned',description:'Imported scene heading. Review and add breakdown details.'}));}
export function csv(rows:unknown[][]):string{return rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
