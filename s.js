function handleClick(link, frame, title){
  link.classList.add('c-active');
  const href = link.href;
  const hrefToFrame = link.href.split('page')[1];
  const parentTitle = link.closest('.c-sidebar-nav-dropdown').querySelector('.c-sidebar-nav-title').textContent
  frame.setAttribute('src', hrefToFrame);

  title.innerHTML = parentTitle + ' - ' + link.textContent;
  window.history.pushState('', '', href);
}
function clearClassName(links){
  links.forEach(function (link){
    link.classList.remove('c-active');
  });
}
function init() {
  const links = document.querySelectorAll('.c-sidebar-nav-link#button')
  const frame = document.getElementById('main_iframe');
  const title = document.querySelector('.c-body .h4')
  console.log(links)
  console.log(frame)
  links.forEach(function (link){
    link.addEventListener('click', function (e){
      e.preventDefault();
      clearClassName(links);
      handleClick(link, frame, title);
    });
  });
}

window.addEventListener('DOMContentLoaded', function (){
  init()
})
