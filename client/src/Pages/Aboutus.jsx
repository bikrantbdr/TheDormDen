import React from "react";
import NavAndSidebar from "../Components/NavAndSidebar";
import styled from "styled-components";
import Individualcard from "../Components/Individualcard";
import Arahanta_image from "../assets/Arahanta.jpg";
import Sudeep_image from "../assets/Sudeep.jpg";
import Bikrant_image from "../assets/Bikrant.jpg";
import Sameer_image from "../assets/Sameer.jpg";

const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 50%;
  margin: 0 auto;
  margin-top: 2rem;
`;
const Styleddiv = styled.div`
  margin-left: 5rem;
  margin-top: 2rem;
`;
const team = [
  {
    name: "Arahanta Pokhrel",
    qualification: "Computer Engineer",
    otherInfo:
     " he is currently in his 6th semester and has a keen interest in programming. He possesses a strong understanding of coding languages and enjoys exploring new technologies",
    imgSrc: Arahanta_image,
    flink:"https://www.facebook.com/arahanta.pokharel.5",
    glink:"https://github.com/arahanta",
    llink:"https://www.linkedin.com/in/pokhrel-arahanta-686503259/"
  },
  {
    name: "Bikrant Bidari",
    qualification: "Computer Engineer",
    otherInfo:
      "He is currently pursuing his studies and is in his 6th semester. he spends much of his time working with coding language. he enjoys undertaking personal coding projects",
    imgSrc: Bikrant_image,
    glink:'https://github.com/bikrantbdr',
    flink:'https://www.facebook.com/bikrant.bidari',
    llink:'https://www.linkedin.com/in/bikrant-bidari-2276391b4/'
  },
  {
    name: "Sameer Shrestha",
    qualification: "Computer Engineer",
    otherInfo:
      "Currently in his 6th semester, he has developed a profound interest in programming and boasts a comprehensive understanding of various coding languages and enjoys exploring new technologies",
    imgSrc: Sameer_image,
    glink:"https://github.com/SAMEER-SHRESTHA911",
    flink:"https://www.facebook.com/samir.shrestha.404",
    llink:'https://www.linkedin.com/in/sameer-shrestha-6530b2227/'
  },
  {
    name: "Sudep Kaucha",
    qualification: "Computer Engineer",
    otherInfo:
      "He is currently pursuing his studies and is in his 6th semester. he spends much of his time working with coding language. he enjoys undertaking personal coding projects",
    imgSrc: Sudeep_image,
    glink:"https://github.com/Sudeep-K",
    flink:'https://www.facebook.com/sudip.kaucha',
    llink:"https://www.linkedin.com/in/sudeep-kaucha-9a58951a4/"
  },
];

export default function Aboutus() {
  return (
    <>
      <NavAndSidebar />
      <StyledParagraph>
        Welcome to our hostel searching website! We are a team of four
        individuals who have developed this platform to help you find the
        perfect hostel for your needs. Our aim is to provide you with a
        user-friendly and efficient way of searching for hostels, filtering them
        based on your preferences, and making searching hassle-free. Our team has
        worked hard to ensure that our website is easy to navigate and provides
        all the necessary information you need to make an informed decision. We
        are committed to providing you with the best possible experience and
        helping you find the ideal hostel for your stay.
      </StyledParagraph>
      <Styleddiv>
        {team.map((person, index) => (
          <Individualcard key={index} {...person} />
        ))}
      </Styleddiv>
    </>
  );
}
