const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(objeto) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then( contenido => {
            if (contenido.length) { 
                let long = JSON.parse(contenido).length;
                objeto.id = JSON.parse(contenido)[long - 1].id + 1;
                async function agregar() {
                    try {
                        let contenidoNuevo = JSON.parse(contenido);
                        contenidoNuevo.push(objeto); 
                        await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Producto guardado. Id: ${objeto.id}`);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                agregar(); 
            } else {
                objeto.id = 1;
                async function iniciarJson() {
                    try {
                        let contenidoNuevo = [objeto];
                        await fs.promises.writeFile(`./${archivo}`,  JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Id del producto: ${objeto.id}`);
                    }
                    catch(err) {
                        console.error("Error:", err);
                    }   
                }
                iniciarJson(); 
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }
    
    getById(id) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            const resultado = JSON.parse(contenido).find(element => element.id === id)
            if (resultado) {
                console.log(resultado);
            } else {
                console.log(null);
            }
        })
        .catch(err => {
            console.error("No se pudo encontrar", err)
        })
    }

    getAll() {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            console.log(JSON.parse(contenido))
        })
        .catch(err => {
            console.error("No hay contenido", err)
        })
    }

    deleteById(id) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            let contenidoFiltrado = JSON.parse(contenido).filter(elem => elem.id !== id)
            let existeId = JSON.parse(contenido).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoFiltrado, null, 2))
                    !existeId ? console.log("No se ha encontrado el objeto con la id indicada") : console.log("Objeto borrado");
                }
                catch(err) {
                    console.error("No se pudo eliminar", err)
                }
            }
            eliminar();
        })
        .catch(err => {
            console.error("Error:", err)
        }) 
    }

    deleteAll() {
        let archivo = this.archivo;
        async function borrarTodo() {
            try {
                await fs.promises.writeFile(`./${archivo}`, "");
                console.log("Contenido del archivo borrado");
            }
            catch (err) {
                console.log("No se pudo eliminar el contenido del archivo", err)
            }
        }
        borrarTodo();
    }
}

const newContenedor = new Contenedor("productos.json");

newContenedor.save({ title: "Cuaderno", precio: 456.78, thumbnail: "https://static.vecteezy.com/system/resources/previews/001/204/760/large_2x/notebook-png.png"});

newContenedor.getAll();

newContenedor.getById(1);

newContenedor.deleteById(2);

newContenedor.deleteAll();
