let buscanombre = document.getElementById('nombreReceta');
let butonBuscar = document.getElementById('buscarReceta');
let miModal = new bootstrap.Modal(document.getElementById('miModal'))
let cuerpo = document.getElementById('cuperpoHtml');
let cuerpoModal =  document.getElementById('cuerpoModal');
let resultado_paises = document.getElementById('resultadopaises');
let resultado_categoria = document.getElementById('resultadocategoria');
let resultado_carrusel = document.getElementById('resultadocarrusel');
let cargando = document.getElementById('cargando');
let url = `http://localhost:4000/recetas/`;
let urlModal = `http://localhost:4000/recetas/`;

butonBuscar.addEventListener('click', () => {
    let nombre_receta = buscanombre.value;
    let url_receta = `http://localhost:4000/recetas/nombre/${nombre_receta}`;
    cargando.classList.remove('d-none');
    fetch(url_receta)
      .then(response => response.json())
      .then(data => {
        cuerpo.innerHTML = '';
        let contador = 1;
        console.log(data.data);
        if (data.data) {
          data.data.forEach(meal => {
            if (contador <= 8) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${meal.url_imagen}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${meal.nombre}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${meal.nombre}</h5>
                    <p class="card-text">Categoria : ${meal.nombre_cat}</p>
                    <p class="card-text">Pais      : ${meal.nombre_pais}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${meal.id_receta}')"> Detalle </button>
                  </div>
                </div>
              </div>
            `;
            contador = contador + 1;
            cuerpo.innerHTML += tarjeta;
            }
            cargando.classList.add('d-none')
          });

        } else {
          cuerpo.innerHTML = '<p class="card mb-3 shadow-sm text-center bg-warning" style="max-width: 100%;height: auto;">No se encontraron resultados.</p>';
          cargando.classList.add('d-none')
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
        if (data.data) {
          data.data.forEach(meal => {
            if (contador <= 8) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${meal.url_imagen}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${meal.nombre}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${meal.nombre}</h5>
                    <p class="card-text">Categoria : ${meal.nombre_cat}</p>
                    <p class="card-text">Pais      : ${meal.nombre_pais}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${meal.id_receta}')"> Detalle </button>
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
          cargando.classList.add('d-none')
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
    let url = `http://localhost:4000/recetas/categoria/${nombre_categoria}`;
    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            //console.log(data)
            return data;
        })
}

async function abrirCat(url) {
    cargando.classList.remove('d-none');
    let detalle = await DetalleCat(url);
    //console.log(detalle)
    if (detalle) {
        cuerpo.innerHTML = '';
        let card = '';
        for (let i = 0; i < detalle.data.length; i++) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${detalle.data[i].url_imagen}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${detalle.data[i].nombre}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${detalle.data[i].nombre}</h5>
                    <p class="card-text">id : ${detalle.data[i].id_receta}</p>
                    <p class="card-text">Categoria      : ${url}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${detalle.data[i].id_receta}')">Detalle</button>
                    </div>
                </div>
              </div>
            `;
            card += tarjeta;
            //console.log(card); 
        }
        cuerpo.innerHTML = card;
        cargando.classList.add('d-none') 
    }
}

async function DetallePais(nombre_pais) {
    let url = `http://localhost:4000/recetas/pais/${nombre_pais}`;
    return await fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            return data;
        })
}

async function abrirPais(url) {
  //console.log(url);
    cargando.classList.remove('d-none');
    let detalle = await DetallePais(url);
    //console.log(detalle[0].id_pais);
    if (detalle) {
        cuerpo.innerHTML = '';
        let card = '';
        for (let i = 0; i < detalle.data.length; i++) {
            let tarjeta = `
              <div class="col-md-3">
                <div class="card mb-3 shadow-sm text-center" style="max-width: 80%;height: auto;">
                  <img src="${detalle.data[i].url_imagen}" class="card-img-top" style="max-width: 100%;height: auto;" alt="${detalle.data[i].nombre}">
                  <div class="card-body">
                    <h5 class="card-title">Nombre  : ${detalle.data[i].nombre}</h5>
                    <p class="card-text">id : ${detalle.data[i].id_receta}</p>
                    <p class="card-text">Pais      : ${url}</p>
                    <button class="btn btn-primary" onclick="abrirModal('${urlModal}${detalle.data[i].id_pais}')">Detalle</button>
                    </div>
                </div>
              </div>
            `;
            card += tarjeta;
            //console.log(card); 
        }
        cuerpo.innerHTML = card;
        cargando.classList.add('d-none') 
    }
}  

async function abrirModal(url) {
    let detalle = await DetalleReceta(url);
    //console.log(detalle)
    if (detalle.data) {
        detalle.data.forEach(meal => {   
          //console.log(meal);           
      let contenido = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">#${meal.id_receta} - ${meal.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row justify-content-center">
                <div class="col-md-10">
                <img src="${meal.url_imagen}" class="card-img-top" alt="...">
                </div>
            </div>
            <div class="row justify-content-center w-90">
                <div class="col-md-10">
                <hr class="mb-10" style="max-width: 100%;height: auto; align-self: center;"/>
                <span class="text-left" style="max-width: 100%;height: auto;">
                    <h3>Measure of Ingredients:</h3>
                    <span style="max-width: 100%;height: auto;">
                      <ul>
                          <li>${meal.ingrediente}</li>                          
                      </ul>
                    </span>
                </span>
                <hr class="mb-10" style="max-width: 100%;height: auto; align-self: center;"/>
                    <h3>Preparation:</h3>
                    <span style="max-width: 100%;height: auto;">
                        ${meal.preparacion}
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
    let url_paises = `http://localhost:4000/pais/`;
    resultado_paises.innerHTML = '';
    fetch(url_paises)
      .then(response => response.json())
      .then(data => {
        let paises = '';
    for (let i = 0; i < data.data.length; i++) {
        paises += `<a class="dropdown-item" href="#!" onclick="abrirPais('${data.data[i].nombre}')">${data.data[i].nombre}</a></li>
                   <hr class="dropdown-divider">
                `;
    }
        if (data.data) {
            resultado_paises.innerHTML = paises;
          } else {
            resultado_paises.innerHTML = '<p>No se encontraron resultados.</p>';
            cargando.classList.add('d-none')
        }
      })
      .catch(error => {
        console.error(error);
        resultado_paises.innerHTML = '<p>Ocurrió un error al listar los paises.</p>';
      });
}
async function listarCategorias() {
    let url_cat = `http://localhost:4000/categoria`;
    resultado_categoria.innerHTML = '';    
    fetch(url_cat)
      .then(response => response.json())
      .then(data => {
        let categoria = '';
    for (let i = 0; i < data.data.length; i++) {
        categoria += `<li><a class="dropdown-item" href="#!" onclick="abrirCat('${data.data[i].nombre}')">${data.data[i].nombre}</a></li>
                   <hr class="dropdown-divider">
                `;
    }

        if (data.data) {
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
async function listarCarrusel() {
  let url_cat = `http://localhost:4000/carrusel`;
  resultado_carrusel.innerHTML = '';    
  fetch(url_cat)
    .then(response => response.json())
    .then(data => {
      let carrusel = '';
      carrusel += `<!-- Carrusel-->
                    <div class="bg-morado container-fluid w-100">
                        <div id="carouselExampleAutoplaying" class="carousel slide " data-bs-ride="carousel">
                            <div class="carousel-inner">`
  for (let i = 0; i < data.data.length; i++) {
    if (i == 0) {
      estado = 'active';
    } else {
      estado = '';
    }
      carrusel += `
              <div class="carousel-item ${estado}">
                <img src="${data.data[i].url_imagen}" class="d-block w-100" alt="..." style="height: 350px">
              </div>              
              `;
  }
  carrusel += `</div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div><!-- Fin Carrusel--><!-- slider que no es slider -->
                `;
                //console.log(carrusel);
      if (data.data) {
          resultado_carrusel.innerHTML = carrusel;
        } else {
          resultado_carrusel.innerHTML = '<p>No se encontraron resultados.</p>';
      }
    })
    .catch(error => {
      console.error(error);
      resultado_carrusel.innerHTML = '<p>Ocurrió un error al listar los carruseles.</p>';
    });
}
listarRecetas(url);
listarPaises();
listarCategorias();
listarCarrusel();