function Core() {
  let core = prompt("Яку оцінку має учень?", "");
  let mark =
    core >= 50 && core <= 59
      ? "достатньо"
      : core >= 60 && core <= 69
      ? "задовільно"
      : core >= 70 && core <= 79
      ? "добре"
      : core >= 80 && core <= 89
      ? "дуже добре"
      : core >= 90 && core <= 100
      ? "задовільно"
      : "Невірна оцінка";
  alert(mark);
}
Core();

// part 2

function Season(){
    let season = prompt("Який сезон за місяцем?", "");
    if(season === "грудень" || season === "січень" || season === "лютий"){
        alert("зима");}
        else if (season === "березень" || season === "квітень" || season === "травень"){
            alert("весна");
        }
        else if (season === "червень" || season === "липень" || season === "серпень"){
            alert("літо");
        }
        else if (season === "вересень" || season === "жовтень" || season === "листопад"){
            alert("осінь");
        }
        else{
            alert("Невірний сезон");
        }}
Season();