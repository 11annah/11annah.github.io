document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("randomButton");
    var image = document.getElementById("randomImage");
  
    button.addEventListener("click", function() {
      fetch("/random_image.json")
        .then(response => response.json())
        .then(data => {
          var randomImage = data.random_image;
          image.src = randomImage;
        })
        .catch(error => console.error('Error fetching random image:', error));
    });
  });
  