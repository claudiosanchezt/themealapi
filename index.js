let buscanombre = document.getElementById('nombreReceta');
let butonBuscar = document.getElementById('buscarReceta');
let miModal = new bootstrap.Modal(document.getElementById('miModal'))
let cuerpo = document.getElementById('cuperpoHtml');
let cuerpoModal =  document.getElementById('cuerpoModal');
let resultado_paises = document.getElementById('resultadopaises');
let resultado_categoria = document.getElementById('resultadocategoria');
let url = `https://themealdb.com/api/json/v1/1/search.php?s=`;
let urlModal = `https://themealdb.com/api/json/v1/1/lookup.php?i=`;

butonBuscar.addEventListener('click', () => {
    let nombre_receta = buscanombre.value;
    let url_receta = `https://themealdb.com/api/json/v1/1/search.php?s=${nombre_receta}`;
  
    fetch(url_receta)
      .then(response => response.json())
      .then(data => {
        cuerpo.innerHTML = '';
        let contador = 1;
        if (data.meals) {
          data.meals.forEach(meal => {
            if (contador <= 8) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${meal.strMealThumb}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${meal.strMeal}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${meal.strMeal}</h5>
                    <p class="card-text">Categoria : ${meal.strCategory}</p>
                    <p class="card-text">Pais      : ${meal.strArea}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${meal.idMeal}')"> Detalle </button>
                  </div>
                </div>
              </div>
            `;
            contador = contador + 1;
            cuerpo.innerHTML += tarjeta;
            }
          });

        } else {
          cuerpo.innerHTML = '<p class="card mb-3 shadow-sm text-center bg-success" style="max-width: 100%;height: auto;">No se encontraron resultados.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        cuerpo.innerHTML = '<p class="card mb-3 shadow-sm text-center bg-warning" style="max-width: 100%;height: auto;">Ocurrió un error al buscar las recetas.</p>';
      });
  });

async function listarRecetas(url) {
    cargando.classList.remove('d-none');
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        cuerpo.innerHTML = '';
        let contador = 1;
        if (data.meals) {
          data.meals.forEach(meal => {
            if (contador <= 8) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${meal.strMealThumb}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${meal.strMeal}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${meal.strMeal}</h5>
                    <p class="card-text">Categoria : ${meal.strCategory}</p>
                    <p class="card-text">Pais      : ${meal.strArea}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${meal.idMeal}')"> Detalle </button>
                  </div>
                </div>
              </div>
            `;
            contador = contador + 1;
            cuerpo.innerHTML += tarjeta;
            }
          });

        } else {
          cuerpo.innerHTML = '<p>No se encontraron resultados.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        cuerpo.innerHTML = '<p>Ocurrió un error al buscar las recetas.</p>';
      });
      cargando.classList.add('d-none')
}

async function DetalleReceta(url) {
    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            //console.log(data)
            return data;
        })
}

async function DetalleCat(nombre_categoria) {
    let url = `https://themealdb.com/api/json/v1/1/filter.php?c=${nombre_categoria}`;

    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            //console.log(data)
            return data;
        })
}

async function abrirCat(url) {
    let detalle = await DetalleCat(url);
    console.log(detalle)
    if (detalle) {
        cuerpo.innerHTML = '';
        let card = '';
        for (let i = 0; i < detalle.meals.length; i++) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${detalle.meals[i].strMealThumb}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${detalle.meals[i].strMeal}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${detalle.meals[i].strMeal}</h5>
                    <p class="card-text">id : ${detalle.meals[i].idMeal}</p>
                    <p class="card-text">Pais      : ${url}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${detalle.meals[i].idMeal}')">Detalle</button>
                    </div>
                </div>
              </div>
            `;
            card += tarjeta;
            //console.log(card); 
        }
        cuerpo.innerHTML = card; 
    }
}

async function DetallePais(nombre_pais) {
    let url = `https://themealdb.com/api/json/v1/1/filter.php?a=${nombre_pais}`;

    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            //console.log(data)
            return data;
        })
}

async function abrirPais(url) {
    let detalle = await DetallePais(url);
    //console.log(detalle)
    if (detalle) {
        cuerpo.innerHTML = '';
        let card = '';
        for (let i = 0; i < detalle.meals.length; i++) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${detalle.meals[i].strMealThumb}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${detalle.meals[i].strMeal}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${detalle.meals[i].strMeal}</h5>
                    <p class="card-text">id : ${detalle.meals[i].idMeal}</p>
                    <p class="card-text">Pais      : ${url}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${detalle.meals[i].idMeal}')">Detalle</button>
                    </div>
                </div>
              </div>
            `;
            card += tarjeta;
            //console.log(card); 
        }
        cuerpo.innerHTML = card; 
    }
}  

async function abrirModal(url) {
    let detalle = await DetalleReceta(url);
    //console.log(detalle)
    if (detalle.meals) {
        detalle.meals.forEach(meal => {
            contador2=1;
            let strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5
            let strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10
            let strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15
            let strIngredient16, strIngredient17, strIngredient18, strIngredient19, strIngredient20
            let strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5
            let strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10
            let strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15
            let strMeasure16, strMeasure17, strMeasure18, strMeasure19, strMeasure20

            if (meal.strIngredient1) {
             strIngredient1=`${meal.strIngredient1}`
            } else {
                strIngredient1=''
            }
            if (meal.strIngredient2) {
                strIngredient2=`${meal.strIngredient2}`
               } else {
                   strIngredient2=''
            }
            if (meal.strIngredient3) {
                strIngredient3=`${meal.strIngredient3}`
               } else {
                   strIngredient3=''
            }
            if (meal.strIngredient4) {
                strIngredient4=`${meal.strIngredient4}`
               } else {
                   strIngredient4=''
            }
            if (meal.strIngredient5) {
                strIngredient5=`${meal.strIngredient5}`
               } else {
                   strIngredient5=''
            }
            if (meal.strIngredient6) {
                strIngredient6=`${meal.strIngredient6}`
               } else {
                   strIngredient6=''
            }
            if (meal.strIngredient7) {
                strIngredient7=`${meal.strIngredient7}`
               } else {
                   strIngredient7=''
            }
            if (meal.strIngredient8) {
                strIngredient8=`${meal.strIngredient8}`
               } else {
                   strIngredient8=''
            }
            if (meal.strIngredient9) {
                strIngredient9=`${meal.strIngredient9}`
               } else {
                   strIngredient9=''
            }
            if (meal.strIngredient10) {
                strIngredient10=`${meal.strIngredient10}`
               } else {
                   strIngredient10=''
            }
            if (meal.strIngredient11) {
                strIngredient11=`${meal.strIngredient11}`
               } else {
                   strIngredient11=''
            }
            if (meal.strIngredient12) {
                strIngredient12=`${meal.strIngredient12}`
               } else {
                   strIngredient12=''
            }
            if (meal.strIngredient13) {
                strIngredient13=`${meal.strIngredient13}`
               } else {
                   strIngredient13=''
            }
            if (meal.strIngredient14) {
                strIngredient14=`${meal.strIngredient14}`
               } else {
                   strIngredient14=''
            }
            if (meal.strIngredient15) {
                strIngredient15=`${meal.strIngredient15}`
               } else {
                   strIngredient15=''
            }
            if ((meal.strMeasure1) && (meal.strIngredient1) && (meal.strMeasure1 !=" ")) {
                strMeasure1=`<li>${meal.strMeasure1} ${strIngredient1}</li>`
               } else {
                   strMeasure1=''
               }
               if ((meal.strMeasure2) && (meal.strIngredient2) && (meal.strMeasure2 !=" ")) {
                   strMeasure2=`<li>${meal.strMeasure2} ${strIngredient2}</li>`
                  } else {
                      strMeasure2=''
               }
               if ((meal.strMeasure3) && (meal.strIngredient3) && (meal.strMeasure3 !=" ")) {
                   strMeasure3=`<li>${meal.strMeasure3} ${strIngredient3}</li>`
                  } else {
                      strMeasure3=''
               }
               if ((meal.strMeasure4) && (meal.strIngredient4) && (meal.strMeasure4 !=" ")) {
                   strMeasure4=`<li>${meal.strMeasure4} ${strIngredient4}</li>`
                  } else {
                      strMeasure4=''
               }
               if ((meal.strMeasure5) && (meal.strIngredient5) && (meal.strMeasure5 !=" ")) {
                   strMeasure5=`<li>${meal.strMeasure5} ${strIngredient5}</li>`
                  } else {
                      strMeasure5=''
               }
               if ((meal.strMeasure6) && (meal.strIngredient6) && (meal.strMeasure6 !=" ")) {
                   strMeasure6=`<li>${meal.strMeasure6} ${strIngredient6}</li>`
                  } else {
                      strMeasure6=''
               }
               if ((meal.strMeasure7) && (meal.strIngredient7) && (meal.strMeasure7 !=" ")) {
                   strMeasure7=`<li>${meal.strMeasure7} ${strIngredient7}</li>`
                  } else {
                      strMeasure7=''
               }
               if ((meal.strMeasure8) && (meal.strIngredient8) && (meal.strMeasure8 !=" ")) {
                   strMeasure8=`<li>${meal.strMeasure8} ${strIngredient8}</li>`
                  } else {
                      strMeasure8=''
               }
               if ((meal.strMeasure9) && (meal.strIngredient9) && (meal.strMeasure9 !=" ")) {
                   strMeasure9=`<li>${meal.strMeasure9} ${strIngredient9}</li>`
                  } else {
                      strMeasure9=''
               }
               if ((meal.strMeasure10) && (meal.strIngredient10) && (meal.strMeasure10 !=" ")) {
                   strMeasure10=`<li>${meal.strMeasure10} ${strIngredient10}</li>`
                  } else {
                      strMeasure10=''
               }
               if ((meal.strMeasure11) && (meal.strIngredient11) && (meal.strMeasure11 !=" ")) {
                   strMeasure11=`<li>${meal.strMeasure11} ${strIngredient11}</li>`
                  } else {
                      strMeasure11=''
               }
               if ((meal.strMeasure12) && (meal.strIngredient12) && (meal.strMeasure12 !=" ")) {
                   strMeasure12=`<li>${meal.strMeasure12} ${strIngredient12}</li>`
                  } else {
                      strMeasure12=''
               }
               if ((meal.strMeasure13) && (meal.strIngredient13) && (meal.strMeasure13 !=" ")) {
                   strMeasure13=`<li>${meal.strMeasure13} ${strIngredient13}</li>`
                  } else {
                      strMeasure13=''
               }
               if ((meal.strMeasure14) && (meal.strIngredient14) && (meal.strMeasure14 !=" ")) {
                   strMeasure14=`<li>${meal.strMeasure14} ${strIngredient14}</li>`
                  } else {
                      strMeasure14=''
               }
               if ((meal.strMeasure15) && (meal.strIngredient15) && (meal.strMeasure15 !=" ")) {
                   strMeasure15=`<li>${meal.strMeasure15} ${strIngredient15}</li>`
                  } else {
                      strMeasure15=''
               }
    let contenido = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">#${meal.idMeal} - ${meal.strMeal}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row justify-content-center">
                <div class="col-md-10">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                </div>
            </div>
            <div class="row justify-content-center w-90">
                <div class="col-md-10">
                <hr class="mb-10" style="max-width: 100%;height: auto; align-self: center;"/>
                <span class="text-left" style="max-width: 100%;height: auto;">
                    <h3>Measure of Ingredients:</h3>
                    <ul>
                        ${strMeasure2}
                        ${strMeasure2}
                        ${strMeasure3}
                        ${strMeasure4}
                        ${strMeasure5}
                        ${strMeasure6}
                        ${strMeasure7}
                        ${strMeasure8}
                        ${strMeasure9}
                        ${strMeasure10}
                        ${strMeasure11}
                        ${strMeasure12}
                        ${strMeasure13}
                        ${strMeasure14}
                        ${strMeasure15}
                    </ul>
                </span>
                <hr class="mb-10" style="max-width: 100%;height: auto; align-self: center;"/>
                    <h3>Preparation:</h3>
                    <span style="max-width: 100%;height: auto;">
                        ${meal.strInstructions}
                    </span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
        </div>
    `;
    cuerpoModal.innerHTML = contenido;

});
    }
    miModal.show();
}

async function listarPaises() {
    let url_paises = `https://themealdb.com/api/json/v1/1/list.php?a=list`;
    resultado_paises.innerHTML = '';
    
    fetch(url_paises)
      .then(response => response.json())
      .then(data => {
        //console.log(data.meals)
        let paises = '';
    for (let i = 0; i < data.meals.length; i++) {
        paises += `<a class="dropdown-item" href="#!" onclick="abrirPais('${data.meals[i].strArea}')">${data.meals[i].strArea}</a></li>
                   <hr class="dropdown-divider">
                `;
    }

        if (data.meals) {
            resultado_paises.innerHTML = paises;
          } else {
            resultado_paises.innerHTML = '<p>No se encontraron resultados.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        resultado_paises.innerHTML = '<p>Ocurrió un error al listar los paises.</p>';
      });
}
async function listarCategorias() {
    let url_cat = `https://themealdb.com/api/json/v1/1/list.php?c=list`;
    resultado_categoria.innerHTML = '';
    
    fetch(url_cat)
      .then(response => response.json())
      .then(data => {
        //console.log(data.meals)
        let categoria = '';
    for (let i = 0; i < data.meals.length; i++) {
        categoria += `<li><a class="dropdown-item" href="#!" onclick="abrirCat('${data.meals[i].strCategory}')">${data.meals[i].strCategory}</a></li>
                   <hr class="dropdown-divider">
                `;
    }

        if (data.meals) {
            resultado_categoria.innerHTML = categoria;
          } else {
            resultado_categoria.innerHTML = '<p>No se encontraron resultados.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        resultado_categoria.innerHTML = '<p>Ocurrió un error al listar los paises.</p>';
      });
}
listarRecetas(url);
listarPaises();
listarCategorias();