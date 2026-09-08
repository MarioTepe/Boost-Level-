const productos = [

  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    nombre: "Catan",
    precio: 29990,
    imagen: "img/catan.webp",
    descripcion: "Juego de estrategia para competir por recursos, construir caminos y expandirse por la isla de Catan.",
    stock: 15
  },

  {
    codigo: "MO001",
    categoria: "Monitor",
    nombre: "Monitor Lg",
    precio: 279990,
    imagen: "img/monitor.jpeg",
    descripcion: "Monitor para juegos FHD (1920 x 1080) de 27 pulgadas con características de alto rendimiento para llevar su juego al siguiente nivel La frecuencia de actualización de 144 Hz permite a los jugadores ver el siguiente cuadro más rápidamente y hace que la imagen parezca más fluida. Con un tiempo de respuesta de 1 ms .",
    stock: 12
  },

  {
    codigo: "AC001",
    categoria: "Accesorios",
    nombre: "Controlador Inalámbrico Xbox Series X",
    precio: 59990,
    imagen: "img/controlxbox.jpeg",
    descripcion: "Control inalámbrico compatible con Xbox y PC, cómodo para sesiones largas de juego.",
    stock: 20
  },

  {
    codigo: "AC002",
    categoria: "Accesorios",
    nombre: "Auriculares Gaming Inalámbricos Hyperx Cloud Flight 2 Negro",
    precio: 139990,
    imagen: "img/audifonosGaming.webp",
    descripcion: "Auriculares Gaming Inalámbricos Hyperx Cloud Flight 2 Negro .Batería con autonomía de hasta 100 horas con conexión 2.4 GHz, o hasta 150 horas mediante Bluetooth con la iluminación apagada. Duración de hasta 23 horas con brillo RGB total.",
    stock: 8
  },

  {
    codigo: "CO001",
    categoria: "Consolas",
    nombre: "PlayStation 5",
    precio: 549990,
    imagen: "img/ps5.webp",
    descripcion: "Consola de última generación con alto rendimiento, gráficos modernos y tiempos de carga rápidos.",
    stock: 6
  },

  {
    codigo: "CG001",
    categoria: "Computadores Gamers",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    imagen: "img/pcGamer.jpg",
    descripcion: "Computador gamer de alto rendimiento pensado para juegos exigentes y multitarea.",
    stock: 4
  },

  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349990,
    imagen: "img/sillaGaming.jpeg",
    descripcion: "Silla ergonómica ajustable para mantener comodidad durante sesiones prolongadas.",
    stock: 5
  },

  {
    codigo: "MS001",
    categoria: "Mouse",
    nombre: "Mouse Mx Master 4 Blanco Logitech",
    precio: 169990,
    imagen: "img/Mousse.webp",
    descripcion: "MX Master 4 es un mouse de alto rendimiento con respuesta táctil, diseñado para un flujo de trabajo inmersivo y preciso que puedes sentir. Ahorra hasta un 33% de tu tiempo* con los accesos directos de Actions Ring, que permiten acceder a herramientas y acciones directamente con el cursor.",
    stock: 18
  },

  {
    codigo: "MP001",
    categoria: "Mousepad",
    nombre: "Mouse Pad Logitech Xl G840",
    precio: 65990,
    imagen: "img/mousepad.webp",
    descripcion: "Alfombrilla de mouse para juegos de sobremesa completa con espacio para configurar tus ajustes de la forma que desee. La textura de la superficie está adaptada al desempeño del mouse Logitech G. La base de goma se mantiene en su lugar para concentrarse y controlar el juego.",
    stock: 10
  },

  {
    codigo: "PP001",
    categoria: "Poleras Personalizadas",
    nombre: "Polera Gamer Personalizada Level-Up",
    precio: 14990,
    imagen: "img/polera.webp",
    descripcion: "Polera gamer personalizable con nombre, gamer tag o diseño elegido por el cliente.",
    stock: 30
  },

  {
    codigo: "CO002",
    categoria: "Consolas",
    nombre: "Consola Xbox Series X 1TB",
    precio: 679990,
    imagen: "img/xboxX.webp",
    descripcion: "La Xbox Series X es la consola más potente de Microsoft, diseñada para ofrecer juegos en resolución 4K nativa a hasta 120 cuadros por segundo (120FPS).",
    stock: 6
  }

];


function formatearPrecio(valor) {

  return "$" + valor.toLocaleString("es-CL");

}