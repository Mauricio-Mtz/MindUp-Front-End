import { useState, useEffect } from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SERVER = import.meta.env.VITE_API_URL;

const CommentsSection = ({ courseId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingInfo, setRatingInfo] = useState({ average: 0, total: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${SERVER}/content/courses/${courseId}/comments`);
        const result = await response.json();
        
        if (result.success) {
          setComments(result.data.comments);
          setRatingInfo(result.data.ratingInfo);
        } else {
          toast({
            variant: "destructive",
            description: result.message || "Error al cargar los comentarios."
          });
        }
      } catch (error) {
        console.error("Error al cargar comentarios:", error);
        toast({
          variant: "destructive",
          description: "Error al cargar los comentarios."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [courseId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        description: "Por favor escribe un comentario."
      });
      return;
    }

    if (rating === 0) {
      toast({
        variant: "destructive",
        description: "Por favor selecciona una calificación."
      });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast({
          variant: "destructive",
          description: "Debes iniciar sesión para comentar."
        });
        return;
      }

      const response = await fetch(`${SERVER}/content/courses/${courseId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id,
          userName: user.name,
          comment: newComment,
          rating 
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Actualizar la lista de comentarios
        const newCommentsResponse = await fetch(`${SERVER}/content/courses/${courseId}/comments`);
        const newCommentsResult = await newCommentsResponse.json();
        
        if (newCommentsResult.success) {
          setComments(newCommentsResult.data.comments);
          setRatingInfo(newCommentsResult.data.ratingInfo);
        }
        
        toast({
          description: "¡Gracias por tu comentario!"
        });
        
        // Reset form
        setNewComment('');
        setRating(0);
      } else {
        toast({
          variant: "destructive",
          description: result.message || "Error al enviar el comentario."
        });
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      toast({
        variant: "destructive",
        description: "Error al enviar el comentario."
      });
    }
  };

  const renderStars = (ratingValue) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            {star <= (hoverRating || rating) ? (
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="h-5 w-5 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return <div className="text-center">Cargando comentarios...</div>;
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Comentarios y Calificaciones</h2>
      
      {/* Resumen de calificaciones */}
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
        <div className="text-center">
          <p className="text-4xl font-bold">{ratingInfo.average}</p>
          <p className="text-sm text-gray-500">de 5</p>
        </div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(ratingInfo.average) ? (
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ) : i < ratingInfo.average ? (
                  <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star className="h-5 w-5 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {ratingInfo.total} {ratingInfo.total === 1 ? 'reseña' : 'reseñas'}
          </p>
        </div>
      </div>
      
      {/* Lista de comentarios existentes */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{comment.user_name}</h3>
                  <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < comment.rating ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <Star className="h-4 w-4 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay comentarios aún. Sé el primero en opinar.</p>
        )}
      </div>

      {/* Formulario para nuevo comentario */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Deja tu comentario</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Calificación</label>
            {renderStars(rating)}
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Comentario
            </label>
            <Textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario sobre el curso..."
              rows={4}
            />
          </div>
          
          <Button type="submit">Enviar Comentario</Button>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;