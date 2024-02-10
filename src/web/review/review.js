import { faStar } from "@fortawesome/free-solid-svg-icons";
export const setSolid=()=>{
const star=document.querySelector('.blue-star')
 star.setAttribute("icon", `${faStar}`);
}