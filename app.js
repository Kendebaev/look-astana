export const services = [
  {id:'n1',category:'nails',name:'Маникюр',detail:'Аппаратный / обрезной / комбинированный',min:6000,max:6000},
  {id:'n2',category:'nails',name:'Маникюр с покрытием геля',min:9000,max:9000},
  {id:'n3',category:'nails',name:'Японский маникюр',min:7000,max:7000},
  {id:'n4',category:'nails',name:'Снятие чужого геля',min:1000,max:1000},
  {id:'n5',category:'nails',name:'Снятие геля + опил',min:2000,max:2000},
  {id:'n6',category:'nails',name:'Снятие наращенных ногтей + опил',min:3000,max:3000},
  {id:'n7',category:'nails',name:'Френч',detail:'Дополнение к покрытию',min:1000,max:1000},
  {id:'n8',category:'nails',name:'Втирка',detail:'Дополнение к покрытию',min:1000,max:1000},
  {id:'p1',category:'pedi',name:'Педикюр без покрытия / с обычным лаком',min:9000,max:9000},
  {id:'p2',category:'pedi',name:'Обработка вросших ногтей, мозолей и натоптышей',detail:'Удаление подногтевой / стержневой мозоли',min:1500,max:3000},
  {id:'p3',category:'pedi',name:'Обработка только пальцев ног',min:5000,max:6000},
  {id:'p4',category:'pedi',name:'Обработка пяток',min:5000,max:6000},
  {id:'p5',category:'pedi',name:'Педикюр с гелевым покрытием',min:11000,max:11000},
  {id:'p6',category:'pedi',name:'Снятие чужого геля на ногах',min:1000,max:1000},
  {id:'d1',category:'depil',name:'Бикини',min:7000,max:7000},
  {id:'d2',category:'depil',name:'Ноги до колена / с колен',min:5000,max:5000},
  {id:'d3',category:'depil',name:'Ноги полностью',min:8000,max:8000},
  {id:'d4',category:'depil',name:'Руки до локтей',min:4000,max:4000},
  {id:'d5',category:'depil',name:'Руки полностью',min:6000,max:6000},
  {id:'d6',category:'depil',name:'Подмышечные впадины',min:2000,max:2000},
  {id:'d7',category:'depil',name:'Бакенбарды',min:2000,max:2000},
  {id:'d8',category:'depil',name:'Усики',min:1000,max:1000},
  {id:'d9',category:'depil',name:'Лицо',min:2000,max:4000},
  {id:'d10',category:'depil',name:'Спина полностью',min:5000,max:5000},
  {id:'d11',category:'depil',name:'Поясница',min:3000,max:4000},
  {id:'d12',category:'depil',name:'Ягодицы',min:3000,max:4000},
  {id:'h1',category:'hair',name:'Завивка и кудри',detail:'Консультация и подбор процедуры',min:null,max:null},
  {id:'h2',category:'hair',name:'Окрашивание и осветление',detail:'Консультация по желаемому образу',min:null,max:null},
  {id:'h3',category:'hair',name:'Уход за волосами',detail:'Подбор ухода с мастером',min:null,max:null},
];
export const categories = {nails:'Маникюр',pedi:'Педикюр',depil:'Депиляция',hair:'Волосы'};
const taglines = {nails:'Ухоженные руки. Каждый день.',pedi:'Лёгкость в каждом шаге.',depil:'Гладкость, которую чувствуешь.',hair:'Кудри, цвет и твой характер.'};
const nf = new Intl.NumberFormat('ru-RU');
export function formatPrice(min,max,unit=true){if(min===null)return 'Уточним';return `${nf.format(min)}${min!==max?'–'+nf.format(max):''}${unit?' ₸':''}`;}
export function totalFor(items){const priced=items.filter(s=>s.min!==null);return {min:priced.reduce((v,s)=>v+s.min,0),max:priced.reduce((v,s)=>v+s.max,0),unknown:items.length-priced.length,priced:priced.length};}
export function totalText(items){const t=totalFor(items);if(!items.length)return '—';if(!t.priced)return 'Уточним';return formatPrice(t.min,t.max)+(t.unknown?' + уточним':'');}
export function astanaNow(now=new Date()){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute)};}
export function addDays(date,n){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
export function isValidDate(date,now=astanaNow()){return /^\d{4}-\d{2}-\d{2}$/.test(date)&&date>=now.date&&date<=addDays(now.date,90)&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;}
export function isValidTime(date,time,now=astanaNow()){if(!isValidDate(date,now)||!/^\d{2}:\d{2}$/.test(time||''))return false;const [h,m]=time.split(':').map(Number);const n=h*60+m;return n>=600&&n<1320&&(m===0||m===30)&&(date>now.date||n>now.minutes);}
export function dateLabel(date){return new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric',weekday:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}
export function buildMessage(items,date,time,name='',note=''){
  const t=totalFor(items);
  const lines=['Здравствуйте! Хочу записаться в LOOK Astana.',name.trim()?`Меня зовут ${name.trim()}.`:'','Услуги:',...items.map(s=>`• ${categories[s.category]}: ${s.name} — ${s.min===null?'стоимость уточнить':formatPrice(s.min,s.max)}`),''];
  if(t.priced)lines.push(`${t.min===t.max?'Стоимость по прайсу':'Ориентировочная стоимость по прайсу'}: ${formatPrice(t.min,t.max)}${t.unknown?' (без услуг, стоимость которых нужно уточнить)':''}.`);
  if(t.unknown)lines.push('Пожалуйста, уточните стоимость услуг для волос.');
  lines.push(`Желаемая дата: ${date?dateLabel(date):'не выбрана'}`,`Желаемое время: ${time||'не выбрано'} (Астана).`);
  if(note.trim())lines.push(`Пожелания: ${note.trim()}`);
  lines.push('','Подскажите, пожалуйста, доступно ли это время, и подтвердите актуальную стоимость.');
  return lines.filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n');
}
export function whatsappUrl(message){return 'https://wa.me/77786257868?text='+encodeURIComponent(message);}

export function bookingAction(items,date,time,name='',note='',now=astanaNow()){
  if(!items.length)return {ready:false,label:'Выбрать услугу',href:'#services'};
  if(!isValidDate(date,now))return {ready:false,label:'Выбрать время',href:'#booking'};
  if(!isValidTime(date,time,now))return {ready:false,label:'Выбрать время',href:'#time-options'};
  return {ready:true,label:'Записаться',href:whatsappUrl(buildMessage(items,date,time,name,note))};
}

if(typeof document!=='undefined'){
  const $=s=>document.querySelector(s);
  const state={category:'nails',selected:new Set(),date:'',time:''};
  const chosen=()=>services.filter(s=>state.selected.has(s.id));
  const checkIcon='<svg aria-hidden="true"><use href="#i-check"/></svg>';
  const arrowIcon='<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  function clearError(){$('#form-error').hidden=true;}
  function renderCatalog(){
    $('#category-label').textContent=taglines[state.category];
    $('#service-panel').setAttribute('aria-labelledby','tab-'+state.category);
    $('#service-list').innerHTML=services.filter(s=>s.category===state.category).map(s=>`<button type="button" class="service-row" data-service="${s.id}" aria-pressed="${state.selected.has(s.id)}" aria-label="${s.name}, ${s.min===null?'стоимость уточним':formatPrice(s.min,s.max)}"><span class="service-name">${s.name}${s.detail?`<small>${s.detail}</small>`:''}</span><span class="service-price">${formatPrice(s.min,s.max,false)}</span><span class="service-select" aria-hidden="true">${state.selected.has(s.id)?checkIcon:'+'}</span></button>`).join('');
  }
  function preview(){
    const items=chosen();
    $('#message-preview').textContent=buildMessage(items,state.date,state.time,$('#client-name').value,$('#client-note').value);
    const action=bookingAction(items,state.date,state.time,$('#client-name').value,$('#client-note').value);
    for(const selector of ['#selection-next','#mobile-next','.header-cta']){
      const link=$(selector);link.href=action.href;
      link.innerHTML=action.label+(action.ready?'<svg aria-hidden="true"><use href="#i-wa"/></svg>':arrowIcon);
    }
    $('.whatsapp-submit span').textContent=action.label;
    $('#mobile-count').textContent=items.length?(state.date&&isValidDate(state.date)?new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(state.date+'T12:00:00Z'))+(state.time?' · '+state.time:' · выберите время'):'Выберите день и время'):'Выберите услугу';
  }
  function updateSelection(){
    const items=chosen();
    $('#selection-content').innerHTML=items.length?items.map(s=>`<div class="selected-item"><span>${s.name}</span><strong>${formatPrice(s.min,s.max)}</strong><button type="button" data-remove="${s.id}" aria-label="Убрать: ${s.name}">×</button></div>`).join(''):'<p class="selection-empty">Нажмите на нужную услугу в списке.<br>Здесь появится ваш выбор и стоимость.</p>';
    $('#selection-total').textContent=totalText(items);
    $('#total-label').textContent=totalFor(items).min!==totalFor(items).max?'Ориентировочно':'Стоимость по прайсу';
    $('#booking-summary').innerHTML=items.length?items.map(s=>`<div>${s.name} · <strong>${formatPrice(s.min,s.max)}</strong></div>`).join('')+`<div class="summary-total"><span>По прайсу</span><strong>${totalText(items)}</strong></div><a href="#services">Изменить услуги</a>`:'<a href="#services">Сначала выберите услугу →</a>';
    $('#mobile-total').textContent=items.length?totalText(items):'Услуги и цены';
    preview();
  }
  function setCategory(category,focus=false){state.category=category;document.querySelectorAll('[data-category]').forEach(b=>{const active=b.dataset.category===category;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;if(active&&focus)b.focus();});renderCatalog();}
  $('.category-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b)setCategory(b.dataset.category);});
  $('.category-tabs').addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();const cats=Object.keys(categories);const n=cats.indexOf(state.category);const i=e.key==='Home'?0:e.key==='End'?cats.length-1:(n+(e.key==='ArrowRight'?1:-1)+cats.length)%cats.length;setCategory(cats[i],true);});
  $('#service-list').addEventListener('click',e=>{const b=e.target.closest('[data-service]');if(!b)return;const id=b.dataset.service;const removed=state.selected.has(id);removed?state.selected.delete(id):state.selected.add(id);b.setAttribute('aria-pressed',!removed);b.querySelector('.service-select').innerHTML=removed?'+':checkIcon;clearError();updateSelection();$('#announcement').textContent=`${services.find(s=>s.id===id).name}: ${removed?'убрано':'добавлено'}. Стоимость: ${totalText(chosen())}.`;});
  $('#selection-content').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;state.selected.delete(b.dataset.remove);renderCatalog();updateSelection();$('#selection-next').focus({preventScroll:true});});
  function refreshDates(){
    const now=astanaNow();const first=now.minutes>=1290?addDays(now.date,1):now.date;
    $('#date-input').min=first;$('#date-input').max=addDays(now.date,90);$('#date-input').value=state.date;
    let dates=Array.from({length:7},(_,i)=>addDays(first,i));
    if(state.date&&!dates.includes(state.date)){dates=Array.from({length:7},(_,i)=>addDays(state.date,i)).filter(d=>d<=addDays(now.date,90));}
    $('#date-options').innerHTML=dates.map(d=>{const date=new Date(d+'T12:00:00Z');const day=new Intl.DateTimeFormat('ru-RU',{weekday:'short',timeZone:'UTC'}).format(date);const month=new Intl.DateTimeFormat('ru-RU',{month:'short',timeZone:'UTC'}).format(date).replace('.','');return `<button type="button" class="date-button" data-date="${d}" aria-pressed="${state.date===d}" aria-label="${dateLabel(d)}"><span>${d===now.date?'Сегодня':d===addDays(now.date,1)?'Завтра':day}</span><b>${date.getUTCDate()}</b><span>${month}</span></button>`;}).join('');
  }
  function renderTimes(){
    const now=astanaNow();
    if(state.time&&!isValidTime(state.date,state.time,now))state.time='';
    if(!isValidDate(state.date,now)){
      $('#time-options').innerHTML='<p class="time-hint">Сначала выберите день — здесь появится время.</p>';
      return;
    }
    $('#time-options').innerHTML=Array.from({length:24},(_,i)=>{const m=600+i*30;return `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;}).filter(time=>isValidTime(state.date,time,now)).map(time=>`<button type="button" class="time-button" data-time="${time}" aria-pressed="${state.time===time}">${time}</button>`).join('')||'<p class="time-hint">На сегодня время закончилось. Выберите другой день.</p>';
  }
  $('#date-options').addEventListener('click',e=>{const b=e.target.closest('[data-date]');if(!b)return;state.date=b.dataset.date;refreshDates();renderTimes();clearError();preview();$('#date-options').querySelector(`[data-date="${state.date}"]`)?.focus({preventScroll:true});});
  $('#date-input').addEventListener('change',()=>{const d=$('#date-input').value;if(!isValidDate(d)){showError('Выберите дату в ближайшие 90 дней.','#date-input');state.date='';}else{state.date=d;clearError();}refreshDates();renderTimes();preview();});
  $('#time-options').addEventListener('click',e=>{const b=e.target.closest('[data-time]');if(!b||b.disabled)return;if(!state.date){showError('Сначала выберите желаемую дату.','#date-input');return;}state.time=b.dataset.time;document.querySelectorAll('[data-time]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.time===state.time));clearError();preview();});
  $('#client-name').addEventListener('input',preview);$('#client-note').addEventListener('input',preview);
  function showError(message,target){const error=$('#form-error');error.hidden=false;error.textContent=message;if(target)$(target)?.focus({preventScroll:true});error.scrollIntoView({behavior:'smooth',block:'center'});}
  for(const selector of ['#selection-next','#mobile-next','.header-cta']){
    $(selector).addEventListener('click',e=>{
      const intendedBooking=$(selector).getAttribute('href').startsWith('https://wa.me/');
      renderTimes();preview();
      const action=bookingAction(chosen(),state.date,state.time,$('#client-name').value,$('#client-note').value);
      if(action.ready){e.preventDefault();window.location.assign(action.href);}
      else if(intendedBooking){e.preventDefault();$('#booking-form').requestSubmit();}
    });
  }
  $('#booking-form').addEventListener('submit',e=>{
    e.preventDefault();const items=chosen();
    if(!items.length){showError('Выберите хотя бы одну услугу в прайсе.');$('#services').scrollIntoView({behavior:'smooth',block:'start'});$('#service-list button')?.focus({preventScroll:true});return;}
    if(!isValidDate(state.date)){showError('Выберите желаемый день записи.','#date-input');return;}
    if(!isValidTime(state.date,state.time)){state.time='';renderTimes();preview();showError('Выберите желаемое время. Прошедшее время недоступно.','#time-options button:not(:disabled)');return;}
    clearError();const message=buildMessage(items,state.date,state.time,$('#client-name').value,$('#client-note').value);window.location.assign(whatsappUrl(message));
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){if(state.date&&!isValidDate(state.date))state.date='';refreshDates();renderTimes();preview();}});
  renderCatalog();updateSelection();refreshDates();renderTimes();preview();
}
