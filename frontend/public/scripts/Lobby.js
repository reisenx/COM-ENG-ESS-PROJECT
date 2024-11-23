// const roomList = document.querySelector('.room-list');
// const roomDiv = document.createElement('div');
const choices = document.querySelectorAll('.choices');
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const context = choice.getAttribute('id_choice');
        alert(context);
    });
  });

