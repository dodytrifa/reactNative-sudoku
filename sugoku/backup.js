const 

function apiSolve() {
    alert('triggered')
  //   const data = {board:[
  //     [0,0,0,0,0,0,8,0,0],
  //     [0,0,4,0,0,8,0,0,9],
  //     [0,7,0,0,0,0,0,0,5],
  //     [0,1,0,0,7,5,0,0,8],
  //     [0,5,6,0,9,1,3,0,0],
  //     [7,8,0,0,0,0,0,0,0],
  //     [0,2,0,0,0,0,0,0,0],
  //     [0,0,0,9,3,0,0,1,0],
  //     [0,0,5,7,0,0,4,0,3]
  //   ]}

  // fetch('https://sugoku.herokuapp.com/solve', {
  //   method: 'POST',
  //   body: encodeParams(data),
  //   headers: { 'Content-Type': 'application/  x-www-form-urlencoded' }
  // })
  // .then(response => response.json())
  // .then(response => console.log(response.solution))
  // .catch(console.warn)
  }

function validation () {
  fetch('https://sugoku.herokuapp.com/validate', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/  x-www-form-urlencoded' }
  })
  .then(response => {
    console.log(response => response.json());
  })
  .then(data => {
    alert(data.status)
    // console.log();
  })
  .catch(err => {
    console.log(err);
  })
}