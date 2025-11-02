const endpoint = "https://gist.githubusercontent.com/RaccoonWithAPeanutButterJar/268e84d35febeb0dec1fc78ef789feb9/raw/07533cd9c416368e6b52b73425700dad94809da7/jasoun.json";

const postsContainer = document.querySelector(".content");

//fetching JSON
fetch(endpoint)
  .then(response => response.json())
  .then(posts => {
    //clear existing posts
    postsContainer.innerHTML = "";

    //looping through each post in the JSON
    posts.forEach(post => {
      //main post container
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      //header
      const header = document.createElement("header");
      header.className = "postheader";

      //container for profile pic + name
      const authorContainer = document.createElement("div");

      //profile pic
      const profileLink = document.createElement("a");
      profileLink.className = "profilepic";

      const profileImg = document.createElement("img");
      profileImg.src = post.profileImage;
      profileImg.alt = `${post.authorName}'s profile picture`;
      profileImg.width = 50;
      profileImg.height = 50;

      profileLink.appendChild(profileImg);
      authorContainer.appendChild(profileLink);

      //author name
      const authorName = document.createElement("p");
      authorName.className = 'authorname';
      authorName.textContent = post.authorName;
      authorName.style.color = "#ff3333";
      authorContainer.appendChild(authorName);

      //the container that contains profile pic and author
      header.appendChild(authorContainer);

      //post time
      const postTime = document.createElement("p");
      postTime.textContent = new Date(post.postTime).toLocaleDateString();
      header.appendChild(postTime);

      //post body
      const body = document.createElement("div");
      body.className = "postbody";

      const content = document.createElement("p");
      content.textContent = post.postContent;
      body.appendChild(content);

      //if post has image
      if (post.postImage) {
        const img = document.createElement("img");
        img.src = post.postImage;
        img.alt = "Post image";
        img.style.maxWidth = "100%";
        img.style.marginTop = "0.5rem";
        body.appendChild(img);
      }

      //footer
      const footer = document.createElement("footer");
      footer.className = "postfooter";

      //assemble post
      postDiv.appendChild(header);
      postDiv.appendChild(body);
      postDiv.appendChild(footer);

      //add the post to the container
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => {
    console.error("Error fetching posts:", error);
    postsContainer.innerHTML = "<p>Failed to load posts.</p>";
  });
