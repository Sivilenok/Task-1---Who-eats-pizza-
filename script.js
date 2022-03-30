
function finalCounting(response) {
  let counter = 0;
  response.party.forEach((element) => {
      if (element.eatsPizza) {
          counter++;
      }
  });

  return {
      pizzaEaters: counter,
      totalGuests: response.party.length,
  };
}

function loadParticipants() {
  const button = document.getElementById('button');
  button.innerText = 'waiting...';
  button.classList.add('loading');

  fetch('https://gp-js-test.herokuapp.com/pizza')
      .then((response) => response.json())
      .then((data) => {
          button.innerText = 'Loaded';
          button.classList.remove('loading');

          return data;
      })
      .then((data) => finalCounting(data))
      .then((result) => {
          document.getElementById('totalGuests').innerText = result.totalGuests;
          document.getElementById('pizzaEaters').innerText = result.pizzaEaters;

          const slices = result.pizzaEaters;
          const degree = 360 / slices;

          const pizza = document.getElementById('pizza');
          for (let i = 0; i < slices / 2; i++) {
              const slice = document.createElement('div');
              // <div></div>
              slice.setAttribute('class', 'slice');
              // <div class="slice"></div>
              slice.setAttribute('style', `transform: rotate(${degree * (i + 1)}deg)`);
              // <div class="slice" style="transform: rotate(Xdeg)"></div>
              pizza.appendChild(slice);
          }
      });
}
