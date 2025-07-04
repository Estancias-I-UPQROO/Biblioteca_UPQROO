import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

interface Evento {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string; // Añadimos descripción para el modal
}

export const InicioPage = () => {
  // Imágenes para el hero banner
  const imagenesBiblioteca = [
    'https://preview.redd.it/vo9vm1fcqrp71.jpg?auto=webp&s=cb4016edf50a37cf06dbe9e975ed9410b253bff0',
    'https://www.taisa-designer.com/wp-content/uploads/2019/09/anton-darius-thesollers-xYIuqpHD2oQ-unsplash.jpg',
    'https://cf-assets.www.cloudflare.com/slt3lc6tev37/3HvNfky6HzFsLOx8cz4vdR/1c6801dde97ae3c8685553db5a4fb8ff/example-image-compressed-70-kb.jpeg'
  ];

  // Datos para el carrusel de eventos (como Crunchyroll)
  const eventos: Evento[] = [
    { 
      id: 1, 
      imagen: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 
      titulo: 'Taller de Investigación',
      descripcion: 'Taller práctico sobre metodologías de investigación académica. Duración: 4 semanas.' 
    },
    { 
      id: 2, 
      imagen: 'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg', 
      titulo: 'Feria del Libro',
      descripcion: 'Evento anual donde se presentan las novedades editoriales y se ofrecen descuentos especiales.' 
    },
    { 
      id: 3, 
      imagen: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 
      titulo: 'Conferencia Magistral',
      descripcion: 'El Dr. Juan Pérez presentará su investigación sobre inteligencia artificial en la educación.' 
    },
    { 
      id: 4, 
      imagen: 'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg', 
      titulo: 'Presentación de Libros',
      descripcion: 'Autores locales presentarán sus obras más recientes con firma de ejemplares.' 
    },
    { 
      id: 5, 
      imagen: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 
      titulo: 'Club de Lectura',
      descripcion: 'Reunión mensual para discutir el libro seleccionado. Este mes: "Cien años de soledad".' 
    },
    { 
      id: 6, 
      imagen: 'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg', 
      titulo: 'Exposición Literaria',
      descripcion: 'Exhibición de obras literarias históricas de la colección especial de la biblioteca.' 
    },
    { 
      id: 7, 
      imagen: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 
      titulo: 'Taller de Escritura',
      descripcion: 'Taller intensivo de escritura creativa para principiantes. Impartido por la escritora María Gómez.' 
    },
    { 
      id: 8, 
      imagen: 'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg', 
      titulo: 'Maratón de Lectura',
      descripcion: 'Evento de 12 horas continuas de lectura en voz alta. Participación abierta al público.' 
    }
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuración para el hero banner
  const settingsHero = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    pauseOnHover: false
  };

  // Configuración para el carrusel de eventos
  const settingsJustinMind = {
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth > 768 ? 3 : 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    draggable: windowWidth <= 768,
    swipe: windowWidth <= 768,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          draggable: true,
          swipe: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          draggable: true,
          swipe: true,
        }
      }
    ]
  };

  const abrirModal = (evento: Evento) => {
    setEventoSeleccionado(evento);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEventoSeleccionado(null);
  };

  return (
    <div className="inicio-container">
      {/* Hero Banner */}
      <section className="hero-biblioteca">
        <div className="contenido-hero">
          <h1>BIBLIOTECA VIRTUAL KAXÁANT</h1>
          <h2>UNIVERSIDAD POLITÉCNICA DE QUINTANA ROO</h2>
        </div>
        <Slider {...settingsHero} className="hero-slider">
          {imagenesBiblioteca.map((src, idx) => (
            <div key={idx} className="slide-biblio">
              <img src={src} alt={`Imagen biblioteca ${idx}`} />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Carrusel de Eventos */}
      <section className="slider-jmind">
        <Slider {...settingsJustinMind} className="slider-container">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="slider-card"
              onClick={() => abrirModal(evento)}
            >
              <img src={evento.imagen} alt={evento.titulo} />
              <div className="slider-hover-box">
                <h3>{evento.titulo}</h3>
                <p>Haz clic para más información</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Modal para mostrar detalles del evento */}
      {modalAbierto && eventoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={cerrarModal}>
              &times;
            </button>
            <img 
              src={eventoSeleccionado.imagen} 
              alt={eventoSeleccionado.titulo} 
              className="modal-imagen"
            />
            <div className="modal-texto">
              <h3>{eventoSeleccionado.titulo}</h3>
              <p>{eventoSeleccionado.descripcion}</p>
              <button className="modal-boton">Más información</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};