let demo = document.querySelector(".mainImg");
export const changeImage=(ImgUrl)=>{
    let demo = document.querySelector(".mainImg");
    if (demo.hasAttribute("src")) {      
        demo.setAttribute("src", `${ImgUrl}`);
      }
    
}