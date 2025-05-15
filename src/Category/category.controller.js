export const getCategorias = (req, res) => {
    const categorias = ["Tecnologia", "Taller", "Practica_Supervisada"];
    res.json(categorias);
  };
  