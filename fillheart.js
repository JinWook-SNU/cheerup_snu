const getpercentage = () =>{
    document.getElementById("form").addEventListener("submit", (e)=>{
        let percentinput = document.getElementById("percent");
        e.preventDefault();
        fillheart(percentinput.value);
        printpercent(percentinput.value);
    })
}
const fillheart=(p)=>{
    let height =  (378*p)/100;
    const fill1 = document.getElementById("fill1");
    const fill2 = document.getElementById("fill2");
    const fill3 = document.getElementById("fill3");
    const fill4 = document.getElementById("fill4");
    const fill5 = document.getElementById("fill5");
    const fill6 = document.getElementById("fill6");
    const fill7 = document.getElementById("fill7");
    const fill8 = document.getElementById("fill8");
    const fill9 = document.getElementById("fill9");
    const fill10 = document.getElementById("fill10");
    fill1.style.height = (p<10? height+'px':'38px');
    fill2.style.height = (p<20? height+'px':'76px');
    fill3.style.height = (p<30? height+'px':'114px');
    fill4.style.height = (p<40? height+'px':'152px');
    fill5.style.height = (p<50? height+'px':'190px');
    fill6.style.height = (p<60? height+'px':'228px');
    fill7.style.height = (p<70? height+'px':'266px');
    fill8.style.height = (p<80? height+'px':'304px');
    fill9.style.height = (p<90? height+'px':'342px');
    fill10.style.height = height+'px';
}
const printpercent = (p) => {
    const print = document.getElementById('percentnumber');
    print.textContent = `${p}%`;
}
getpercentage();