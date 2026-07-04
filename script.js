  function goTo(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const target = document.getElementById('page-'+pageId);
    if(target) target.classList.add('active');
    document.querySelectorAll('.navlink').forEach(b=>{
      b.classList.toggle('active', b.dataset.page===pageId);
    });
    document.getElementById('mainNav').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
    history.replaceState(null,'','#'+pageId);
  }

  document.querySelectorAll('.navlink').forEach(btn=>{
    btn.addEventListener('click', ()=>goTo(btn.dataset.page));
  });

  document.getElementById('burgerBtn').addEventListener('click', ()=>{
    document.getElementById('mainNav').classList.toggle('open');
  });

  // Project tabs
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.tabpanel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  function handleContactSubmit(e){
    e.preventDefault();
    document.getElementById('cf-success').style.display='block';
    e.target.reset();
    return false;
  }
  function handleQuoteSubmit(e){
    e.preventDefault();
    document.getElementById('q-success').style.display='block';
    e.target.reset();
    return false;
  }

  // handle initial hash
  const initial = window.location.hash.replace('#','');
  if(initial) goTo(initial);
