let footballTeam = {
  team:"family",
  year: 2000,
  headCoach: "Truong",
  players: [{name:"Phuong",position:"defender",isCaptain:true},
    {name:"Thomas",position:"forward",isCaptain:false},
    {name:"Monica",position:"midfielder",isCaptain:false},
    {name:"Chris",position:"goalkeeper",isCaptain:false}]
}
const headCoach=document.querySelector("#head-coach")
headCoach.innerHTML = footballTeam.headCoach
const team=document.querySelector("#team")
team.innerHTML = footballTeam.team
const year=document.querySelector("#year")
year.innerHTML = footballTeam.year
const playerCards = document.querySelector("#player-cards")

const players = document.querySelector("#players")

function playerCardsE(arr){
   playerCards.innerHTML= ''
   for( let i = 0; i < arr.length; i++){
      let str = ''
      if(arr[i].isCaptain){
         str = `<h2>(Captain) ${arr[i].name}</h2> `
      } else {
         str = `<h2>${arr[i].name}</h2> `
      }
      let str1 = `<p>position: ${arr[i].position}</p>`
      let str3 = `<div class="player-card"> ${str} ${str1}</div>`
      playerCards.innerHTML += str3
   }
}
playerCardsE(footballTeam.players)
players.addEventListener("change", () =>{
   console.log(players.value)
   if(players.value === "all"){
      playerCardsE(footballTeam.players)
   } else {
      let player = footballTeam.players.filter(e => e.position === players.value)
      playerCardsE(player)
   }
})