import { toast } from "react-toastify";

const usePost = () => {
  const post = async (data, url) => {
    try {
      const response = await toast.promise(
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
        {
          pending: 'Adding wine',
          success: '"Wine added successfully!"',
          error: "Failed to add wine."
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add wine.");
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error adding new wine:", error);
      throw error; // Throw the error to be caught by the caller as a rejected promise
    }
  };
  
  
  return post;
};

export default usePost;
