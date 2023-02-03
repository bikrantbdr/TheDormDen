import styled from 'styled-components';
 
const PercentBar = styled.div`
    width : 15.139vw;
    height : 2vh;
    background-color : #B5CCD7;
    border-radius : 5px;
`
const YellowLine = styled.div`
    width : calc(0/5*100%);
    height : 2vh;
    background-color : #FFCB47;
    border-radius: 5px;
`
const ReviewContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 6rem;
    padding-top: 0.4rem;
    padding-bottom: 0.5rem;
    text-align: center;
    font-family: Helvetica, Sans-Serif;
`
const ReviewOverallRating = styled.div`
    display : inline-flex;
    align-items: center;
    justify-content: center;
    width: 20vw;
    height: 2vh;
    /* border: 3px solid red; */
    font-family: Helvetica, Sans-Serif;
    gap: 1rem;
    margin: 0.5rem;
    padding: 0.8rem;
    border-radius: 20px;
    background-color: #8F8F8F;
    color: white;
    font-weight: 600;
`

const ReviewComponent = styled.div`
    box-sizing: border-box;
    display : flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 26.736vw;
    /* border: 3px solid red; */
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
    border-radius: 0.5rem;
    padding: 1rem;
`
const StarBar = styled.div`
    display : inline-flex;
    margin : 0.7rem;
    gap: 0.7rem;
`

export {PercentBar, YellowLine, ReviewComponent,ReviewOverallRating,ReviewContainer, StarBar}; 