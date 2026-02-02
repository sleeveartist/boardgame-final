import {useState} from "react";
import categories from "./assets/tasks/categories";

function GetCategories() {
    const [theCategory, setTheCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    function getRandomCategory() {
        const randomCategoryObject = categories[Math.floor(Math.random() * categories.length)];
        const randomSubCategory = randomCategoryObject.subcategories[Math.floor(Math.random() * randomCategoryObject.subcategories.length)];
        setTheCategory(randomCategoryObject.category);
        setSubCategory(randomSubCategory);
    }

    function handleCategoryClick() {
        getRandomCategory();
        const subcath1 = document.querySelector(".subCategory");
        subcath1.style.visibility = "hidden";
    }

    function handleSubCategoryClick() {
        const subcath1 = document.querySelector(".subCategory");
        subcath1.style.visibility = "visible";
    }

    return (
        <div>
            <h1 className="category">Категория: {theCategory}</h1>
            <button onClick={handleCategoryClick}>Категория</button>
            <button onClick={handleSubCategoryClick}>Подкатегория</button>
            <h1 className="subCategory" style={{visibility: "hidden"}}>Подкатегория: {subCategory}</h1>
        </div>
    );
}

export default GetCategories