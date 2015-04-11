var bodyActivate = document.getElementById('body-click'),
confirmDiv = document.getElementById('data-confirm'),
black = document.getElementById('black-fade')

;


bodyActivate.addEventListener('click', function() { 

 confirmDiv.classList.add('confirm-move');

 });


confirmDiv.addEventListener('click', function() { 


 confirmDiv.classList.add('opacity-0');

  black.classList.add('display');
 black.classList.add('opacity-1');

 

 });


