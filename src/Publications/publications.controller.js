import Publications from './publications.model.js';
import comments from '../comments/comment.model.js'
import category from '../Category/category.model.js'



export const createPublication = async (req, res) => {
  try {
    const data = req.body;
    const publication = new Publications({ ...data });
    await publication.save();

    res.status(200).json({
      success: true,
      publication
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Error al crear la publicación',
      error: error.message
    });
  }
};;

export const getPublications = async (req, res) => {
  const query = { status: true };

  try {
    const publications = await Publications.find(query)
      .populate('comments'); // sin limitar campos

    const formatted = publications.map(pub => {
      const { _id, title, description, category, comments, photos } = pub;
      return {
        _id,
        title,
        description,
        category,
        photos,
        comments: comments.map(c => ({
          _id: c._id,
          author: c.author,
          content: c.content,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt
        }))
      };
    });

    res.status(200).json({
      success: true,
      msg: 'Lista de publicaciones',
      publications: formatted
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export const getPublicationsByCat = async (req, res) => {
  const { category } = req.params;

  try {
    const publications = await Publications.find({ category, status: true })
      .populate('comments');

    if (publications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron publicaciones para esta categoría."
      });
    }

    const formatted = publications.map(pub => {
      const { _id, title, description, category, comments, photos } = pub;
      return {
        _id,
        title,
        description,
        category,
        photos,
        comments: comments.map(c => ({
          _id: c._id,
          author: c.author,
          content: c.content,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt
        }))
      };
    });

    res.status(200).json({
      success: true,
      msg: `Publicaciones encontradas en la categoría: ${category}`,
      publications: formatted
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error al buscar publicaciones por categoría.",
      error: error.message
    });
  }
};


export const searchPublication = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Publications.findById(id)
      .populate("category", "name")
      .populate("comments"); // sin limitar campos

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "[controller] Error: No se encontró el post solicitado."
      });
    }

    // Mapear los comentarios si se quiere controlar lo que se envía:
    const formattedPost = {
      ...post._doc,
      comments: post.comments.map(c => ({
        _id: c._id,
        author: c.author,
        content: c.content,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      }))
    };

    res.status(200).json({
      success: true,
      message: "[controller] Éxito: Post encontrado.",
      post: formattedPost
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "[controller] Error: No se pudo buscar el post.",
      error: error.message
    });
  }
};




export const updatePublication = async (req, res) => {
  try {
    const publication = await Publications.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!publication) {
      return res.status(404).json({ error: "[controller] Publicación no encontrada" });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deletePublication = async (req, res) => {
  try {
    const publication = await Publications.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );
    if (!publication) {
      return res.status(404).json({ error: "[controller] Publicación no encontrada" });
    }
    res.json({ message: "[controller] Publicación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
