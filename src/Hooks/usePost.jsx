const usePost = ()=>{
const post = (data,url)=>{
    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log("New wine added:", data);
          // You can update the UI or perform any additional actions here
        })
        .catch(error => {
          console.error("Error adding new wine:", error);
        });
}
    return post;
}
export default usePost;