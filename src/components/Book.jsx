import React, { useEffect, useRef, useState } from "react";

const PageFlipBook = () => {
  const book = useRef();
  const [HTMLFlipBook, setHTMLFlipBook] = useState(null);

  // Chapter content stored inside the component
const chapters = [
  {
    title: "Chapter 1: The Boy Who Lived",
    content:
      "We’re introduced to the Dursleys, an ordinary British family. Strange events take place as wizards celebrate Voldemort's downfall. Dumbledore and Hagrid leave baby Harry at the Dursleys' doorstep.",
    footer: "Harry Potter Book 1",
    image: "/images/ch1.jpg",
    video: "https://www.youtube.com/watch?si=gij1cMn1-5kbZ-x5&v=VyHV0BRtdxo&feature=youtu.be",
  },
  {
    title: "Chapter 2: The Vanishing Glass",
    content:
      "Harry grows up neglected by the Dursleys. During a zoo trip, Harry unknowingly talks to a snake and makes the glass disappear. Strange things always happen around Harry.",
    footer: "Harry Potter Book 1",
    image: "/images/ch2.jpg",
    video: "https://www.youtube.com/watch?si=h86b6uDZG7XLT_Vv&v=nE11U5iBnH0&feature=youtu.be",
  },
  {
    title: "Chapter 3: The Letters from No One",
    content:
      "Harry receives mysterious letters, which the Dursleys try to stop him from reading. The family goes into hiding, but the letters keep coming.",
    footer: "Harry Potter Book 1",
    image: "/images/ch3.jpg",
    video: "https://www.youtube.com/watch?si=luMdxRgVJs8IRkB9&v=VwErvYgoH70&feature=youtu.be",
  },
  {
    title: "Chapter 4: The Keeper of the Keys",
    content:
      "Hagrid bursts in on Harry's 11th birthday to bring him his Hogwarts letter. Harry learns he’s a wizard and about his past involving Voldemort.",
    footer: "Harry Potter Book 1",
    image: "/images/ch4.jpg",
    video: "https://www.youtube.com/watch?si=uC-W6IZ4VNFJHNa9&v=80kuiBq95So&feature=youtu.be",
  },
  {
    title: "Chapter 5: Diagon Alley",
    content:
      "Hagrid takes Harry to the magical marketplace, Diagon Alley. Harry buys school supplies and finds out he's famous in the wizarding world. He gets Hedwig the owl and a wand from Ollivanders.",
    footer: "Harry Potter Book 1",
    image: "/images/ch5.jpg",
    video: "https://www.youtube.com/watch?si=_LHwjDa6inkTcj6&v=LLAaW1EgyY8&feature=youtu.be",
  },
  {
    title: "Chapter 6: The Journey from Platform Nine and Three-Quarters",
    content:
      "Harry leaves for Hogwarts. He befriends Ron Weasley on the Hogwarts Express. We meet Hermione, Neville, Draco, and other key characters.",
    footer: "Harry Potter Book 1",
    image: "/images/ch6.jpg",
    video: "https://www.youtube.com/watch?si=LZ554h3SAM9xINN6&v=tAiy66Xrsz4&feature=youtu.be",
  },
  {
    title: "Chapter 7: The Sorting Hat",
    content:
      "Students arrive at Hogwarts and are sorted into houses. Harry is placed in Gryffindor, along with Ron and Hermione. We meet teachers like Snape, McGonagall, and Dumbledore.",
    footer: "Harry Potter Book 1",
    image: "/images/ch7.jpg",
    video: "https://www.youtube.com/watch?si=NxHGb8XQ18gDNqkJ&v=Su1LOpjvdZ4&feature=youtu.be",
  },
  {
    title: "Chapter 8: The Potions Master",
    content:
      "Harry attends his first classes. Snape seems to hate Harry for unknown reasons. Harry starts to suspect that something is being guarded at Hogwarts.",
    footer: "Harry Potter Book 1",
    image: "/images/ch8.jpg",
    video: "https://www.youtube.com/watch?si=QcnTzOoA6upVKK0v&v=mObK5XD8udk&feature=youtu.be",
  },
];


  // Convert various YouTube URLs to embeddable format
  const getEmbedUrl = (url) => {
    try {
      const u = new URL(url);
      let id = "";
      if (u.hostname.includes("youtu.be")) {
        id = u.pathname.replace("/", "");
      } else {
        id = u.searchParams.get("v") || "";
      }
      return id ? `https://www.youtube.com/embed/${id}` : url;
    } catch (e) {
      return url;
    }
  };

  
  useEffect(() => {
    let active = true;
    import("react-pageflip")
      .then((mod) => {
        if (active) setHTMLFlipBook(() => mod.default);
      })
      .catch((err) => {
        console.error("Failed to load react-pageflip:", err);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (book.current) {
      book.current.pageFlip().turnToPage(0);
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center p-10">
      {HTMLFlipBook ? (
        <HTMLFlipBook
          width={500}
          height={700}
          className="flip-book shadow-xl"
          showCover={true}
          ref={book}
        >
          <div className="page bg-[url('/frontpage.jpg')] bg-cover bg-center w-full h-full text-black font-bold text-3xl uppercase flex justify-center items-center">
            
          </div>

          {chapters.map((chapter, idx) => (
            <div
              key={idx}
              className="page bg-gray-200 text-gray-800 p-8 flex flex-col justify-between"
            >
              <h2 className="page-header font-bold text-xl mb-2">
                {chapter.title}
              </h2>
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="flex-1 font-sans">{chapter.content}</p>
              {chapter.video && (
                <div className="mt-4">
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      src={getEmbedUrl(chapter.video)}
                      title={`YouTube video for ${chapter.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-300"
                    />
                  </div>
                </div>
              )}
              <p className="page-footer font-sans text-right text-sm italic mt-4">
                {chapter.footer}
              </p>
            </div>
          ))}

          <div className="page bg-[url('/backpage.jpg')] bg-cover bg-center text-black font-bold text-xl uppercase flex justify-center items-center">
            
          </div>
        </HTMLFlipBook>
      ) : (
        <div className="text-white/80">Loading book...</div>
      )}
    </div>
  );
};

export default PageFlipBook;
