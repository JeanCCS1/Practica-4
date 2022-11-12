const fetchPokemon = async () => {
    const pokeNameInput = document.getElementById("input-text");
    let pokeName = pokeNameInput.value;
    if(pokeName != ""){
        pokeName = pokeName.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
        let data = await fetch(url).then((res) => {
            const pantalla = document.getElementById("pantalla");
            pantalla.style.backgroundImage = `url(${"../Imagenes/Fondo-Imagen.jpg"})`;
            if (res.status != "200") {
                console.log(res);
                FuncionError("Pokemon no encontrado","./Imagenes/Error.gif");
            }
            else {
                return res.json();
            }
        })
        if (data) {
            console.log(data);
            const pokeImg = data.sprites.front_default;
            const ti=data.types;
            const fra=data.abilities;
            const pokeName = data.name;
            const pokeid = data.id;
            pokeImage(pokeImg);
            pokeNameF(pokeName);
            PokeId(pokeid);
            pokeData(ti,fra);
            AlturaPeso(data.height,data.weight);
            StatusPone(data.stats);
            move(data.moves);
        }
    }
    else
        FuncionError("Sin nombre","./Imagenes/Blanco.gif");

}


const FuncionError=(Titulo,imagen)=>{
    pokeImage("",true);
    const pantalla = document.getElementById("pantalla");
    pantalla.style.backgroundImage = `url(${imagen})`;
    pokeNameF(Titulo);
    PokeId("");
}

const pokeImage = (url,bandera = false) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.style.display = (bandera) ? 'none':'flex';
    pokePhoto.src = url;
}
const pokeData = (t,f) => {
    let ti="";
    t.forEach(el => {
        ti+='<span class="sp spblue"  style="margin-right: 5px">'+el.type.name+"</span>";
    });
    const pname=document.getElementById("tipo");
    pname.innerHTML=ti;
    let val="";
    let bol=true;
    f.forEach(el => {
        val+='<span class="sp spgreen" style="margin-right: 5px">'+el.ability.name+"</span>";
    });
    const p2name=document.getElementById("fraqueza");
    p2name.innerHTML=val;
}

const pokeNameF = (name)=>{
    const pokeName = document.getElementById("nombre");
    pokeName.innerHTML = name;
}

const PokeId = (id)=>{
    const pokeid = document.getElementById("Id_poke");
    pokeid.innerHTML = "#"+id;
}

const AlturaPeso = (A,P)=>{
    const Altu = document.getElementById("idaltura");
    const Peso = document.getElementById("idpeso");
    Altu.innerHTML = A+"cm";
    Peso.innerHTML = P+"m";
}

const StatusPone = (arr) =>{
    const nombrescontenedores = ["psbars","atkbars","defbars","spatkbars","spdef","speed"];


    for (let index = 0; index < arr.length; index++) {
        let statu = (Math.trunc(arr[index].base_stat/10) > 10) ? 10:Math.trunc(arr[index].base_stat/10);
        const contenedor  = document.getElementById(nombrescontenedores[index]);
        let inputElement = contenedor.getElementsByTagName('div');
        let aux = 0;

        for (let i = inputElement.length-1; i >= 0; i--) {
            aux++;
            inputElement[i].className = (aux<= statu) ? "bar cele":"bar white";
        }

    }
}

const move = (t)=>{
    let ti="";
    for (let index = 0; index < 3; index++) {
        ti+= '<span class="sp spyellow"  style="margin-right: 5px">'+t[index].move.name+"</span>";
    }

    if(t.length > 3){
        ti+= '<span class="sp spyellow"  style="margin-right: 5px">'+"..."+"</span>";
    }
    const movimienta =document.getElementById("movimientos");
    movimienta.innerHTML = ti;
}
