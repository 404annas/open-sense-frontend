// Work Data Array
const workData = [
  {
    _id: 1,
    name: "Heart to Heart",
    description: "Heart to Heart approached Oliver Mann as they needed a creative new look and branding. Oliver teamed up with the owner to first know the backstory of the company. With that his ideas and leadership lead to having a new dated website which they have not had in 10 years. We also created warm AI materials with caregivers and seniors to showcase the brand using the newest technology. We also designed the shirts for the caregivers and new logos to implement on the website to have a variance. All following the color scheme and backbone of the company..",
    media: [
      { type: "image", src: "/heartlogo.png", alt: "Heart to Heart branding" },
      { type: "image", src: "/heart1.jpg", alt: "Heart to Heart branding" },
      { type: "image", src: "/heart2.jpg", alt: "Heart to Heart branding" },
      { type: "image", src: "/heart3.jfif", alt: "Heart to Heart branding" },
      { type: "image", src: "/heart4.jfif", alt: "Heart to Heart branding" },
      { type: "image", src: "/heart5.jfif", alt: "Heart to Heart branding" },
    ],
    categories: ["Branding"],
    createdBy: "admin"
  },
  {
    _id: 2,
    name: "Discos el Popular",
    description: "Discos el Popular came to Oliver Mann as a new start up company and entrusted him for a new creative look to brand the company's message. Oliver focused on the uniqueness of the story of the company and created a 60 second vertical spot.",
    media: [
      { type: "image", src: "/card6.jpg", alt: "Discos el Popular branding" },
      {
        type: "iframe",
        src: "https://www.youtube.com/embed/qUFJs9glVoU?si=HXZqEEDZjm5bpUyZ",
        alt: "Discos el Popular Video"
      }
    ],
    categories: ["Branding"],
    createdBy: "admin"
  },
  {
    _id: 3,
    name: "DR Home Finance",
    description: `DR HOME FINANCE is a brand marketplace built for loans for doctors and dentists. They wanted lively video content that pairs up with blogs they have that educate doctors on how the loans work.
    
    Oliver Mann conceptualized an AI commercial for DR HOME FINANCE and executed and delivered the spot with his team as the Creative Director.
    
    He will be the Creative Director for all visual content for DR HOME FINANCE.`,
    media: [
      { type: "image", src: "/card4.jpg", alt: "Logo design" },
      {
        type: "iframe",
        src: "https://www.youtube.com/embed/U9qg-LfHqSQ?si=IL8H0Xv0k_WhMJzE",
        alt: "DR Home Finance Video"
      }
    ],
    categories: ["Branding"],
    createdBy: "admin"
  },
  {
    _id: 4,
    name: "Such a funny life",
    description: `SUCH A FUNNY LIFE is a feature film written, produced and directed by Oliver Mann. It had a theatrical run in NY, DC and LA with rave reviews.
    
    You can now watch the film on various VOD plartforms.
`,
    media: [
      { type: "image", src: "/card5.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/life1.svg", alt: "Dashboard overview" },
      // { type: "image", src: "/life2.png", alt: "Dashboard overview" },
      // { type: "image", src: "/funny1.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny2.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny3.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny4.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny5.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny6.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny7.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny8.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny9.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny10.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny11.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny12.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny13.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny14.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny15.jpg", alt: "Dashboard overview" },
      // { type: "image", src: "/funny16.jpg", alt: "Dashboard overview" },
      {
        type: "iframe",
        src: "https://www.youtube.com/embed/LQjwGVcGnUU?si=YYtohQAHvM-iqQDK",
        alt: "DR Home Finance Video"
      }
    ],
    categories: ["Commercial"],
    createdBy: "admin"
  },
  {
    _id: 5,
    name: "David",
    description: "For the brand DAVID, which is a new protein bar on the market. Oliver Mann and his team created concept OOH mock ups and advertising work for the brand. They also did a jazzy concept spot to go along with it.",
    media: [
      { type: "image", src: "/david.png", alt: "Discos el Popular branding" },
      { type: "image", src: "/david1.jfif", alt: "Discos el Popular branding" },
      { type: "image", src: "/david2.jfif", alt: "Discos el Popular branding" },
      { type: "image", src: "/david3.png", alt: "Discos el Popular branding" },
      { type: "image", src: "/david4.png", alt: "Discos el Popular branding" },
      {
        type: "iframe",
        src: "https://www.youtube.com/embed/k2vR8RFSocU?si=WTsynZo2gcUB2Iqu",
        alt: "David"
      }
    ],
    categories: ["Conceptual Branding"],
    createdBy: "admin"
  },
  // {
  //   _id: 5,
  //   name: "Restaurant Booking System",
  //   description: "Built a comprehensive online reservation system for restaurants with table management, customer profiles, and integration with POS systems. Features include real-time availability, waitlist management, and automated confirmations.",
  //   media: [
  //     { type: "image", src: "/images/work5.jpg", alt: "Reservation interface" },
  //     { type: "image", src: "/images/work5-2.jpg", alt: "Table management" },
  //     { type: "image", src: "/images/work5-3.jpg", alt: "Customer profile" }
  //   ],
  //   categories: ["Web Application", "Hospitality", "Booking System"],
  //   createdBy: "admin"
  // },
  // {
  //   _id: 6,
  //   name: "Educational Platform UI",
  //   description: "Designed the user interface for an online learning platform that connects students with tutors. The platform includes course browsing, video lessons, assignment submission, and progress tracking features.",
  //   media: [
  //     { type: "image", src: "/images/work6.jpg", alt: "Course browsing" },
  //     { type: "image", src: "/images/work6-2.jpg", alt: "Video lesson interface" },
  //     { type: "video", src: "/videos/work6-demo.mp4", alt: "Platform walkthrough" }
  //   ],
  //   categories: ["Education", "UI/UX Design", "E-learning"],
  //   createdBy: "admin"
  // }
];

export default workData;