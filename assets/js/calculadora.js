function clear(doomResultado){
  if (doomResultado.hasChildNodes()) {
    while (doomResultado.lastElementChild) {
      doomResultado.removeChild(doomResultado.lastElementChild);
    }
  }
}

function calcular(data) {
  const doomResultado = document.getElementById("resultado");
  clear(doomResultado);
  {
    for (let i = 0; i < data.length; i++) {
      console.log(i);
      if (i == data.length - 1) {
        var pNova = document.createElement("p");
        var conteudoNovo = document.createTextNode(` Resultado = X${i} = ${data[i].solution.x} , ${data[i].solution.y}, ${data[i].solution.z}`);
        pNova.appendChild(conteudoNovo);
        doomResultado.appendChild(pNova);
        return;
      } else {
        var pNova = document.createElement("p");
        var conteudoNovo = document.createTextNode(`X${i} = ${data[i].x} , ${data[i].y}, ${data[i].z}`);
        pNova.appendChild(conteudoNovo);
        doomResultado.appendChild(pNova);


      }
    }
  }
}

function verificar_convergencia_linha_ordem3(a1, b1, c1, a2, b2, c2, a3, b3, c3) {
  let count = 0;
  if (a1 > (Math.abs(b1) + Math.abs(c1))) 
  {
    count++;
  }
  if (b2 > (Math.abs(a2) + Math.abs(c2))) 
  {
    count++;
  }
  if (c3 > (Math.abs(a3) + Math.abs(b3))) 
  {
    count++;
  }

  if(count == 3)
  {
    return true;
  }else
  {
    return false;
  }

}

function verificar_convergencia_coluna_ordem3(a1, b1, c1, a2, b2, c2, a3, b3, c3){
  let count = 0;
  if(a1 > (Math.abs(b1) + Math.abs(c1)))
  {
    count++;
  }
  if(b2 > (Math.abs(a2) + Math.abs(c2)))
  {
    count++;
  }
  if(c3 > (Math.abs(b3) + Math.abs(a3)))
  {
    count++;
  }

  if(count == 3)
  {
    return true;
  }else
  {
    return false;
  }
  
}

function metodo_jacobi_ordem3(a1, b1, c1, B1, a2, b2, c2, B2, a3, b3, c3, B3) {
  let array = [];
  let x0 = 0;
  let y0 = 0;
  let z0 = 0;
  let x1 = 0;
  let y1 = 0;
  let z1 = 0;
  let tolerancia = 0.1;
  let e1;
  let e2;
  let e3;


  function f1(x, y, z) {
    return (B1 - b1 * y - c1 * z) / a1;
  };

  function f2(x, y, z) {
    return (B2 - a2 * x - c2 * z) / b2;
  };

  function f3(x, y, z) {
    return (B3 - b3 * y - a3 * x) / c3;
  };
  do {
    x1 = f1(x0, y0, z0);
    y1 = f2(x0, y0, z0);
    z1 = f3(x0, y0, z0);

    e1 = Math.abs(x0 - x1);
    e1 = parseFloat(e1.toFixed(3));
    e2 = Math.abs(y0 - y1);
    e2 = parseFloat(e2.toFixed(3));
    e3 = Math.abs(z0 - z1);
    e3 = parseFloat(e3.toFixed(3));


    if(e1 < tolerancia && e2 < tolerancia && e3 < tolerancia)
    {
      array.push({solution:{x: parseFloat(x1.toFixed(3)), y: parseFloat(y1.toFixed(3)), z: parseFloat(z1.toFixed(3))}});
      break;
    }
    array.push({x: parseFloat(x1.toFixed(3)), y: parseFloat(y1.toFixed(3)), z: parseFloat(z1.toFixed(3))});
    x0 = x1;
    y0 = y1;
    z0 = z1;

    
  } while (true);

  return array;
}

/*if(ordem == 2)
{
  if(verificar_convergencia_linha_ordem2(a1,b1,a2,b2))
  {

  }
}
*/
function calculate(a1, b1, c1, B1, a2, b2, c2, B2, a3, b3, c3, B3)
{
if(true)
{
  if(verificar_convergencia_linha_ordem3(a1, b1, c1, a2, b2, c2, a3, b3, c3))
  {
    response = metodo_jacobi_ordem3(a1, b1, c1, B1, a2, b2, c2, B2, a3, b3, c3, B3);
    calcular(response);
  }else if(verificar_convergencia_coluna_ordem3(a1, b1, c1, a2, b2, c2, a3, b3, c3)){
    response = metodo_jacobi_ordem3(a1, b1, c1, B1, a2, b2, c2, B2, a3, b3, c3, B3);
    calcular(response);
  }else{
    response = ["O sistema não é convergente"];
    return response;
  }
}
}

