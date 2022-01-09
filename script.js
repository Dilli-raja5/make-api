document.body.innerHTML=`<div class="header">
<h4 id="title">Makeup Brands List</h4>
</div>
<div id="content"></div>`;
const url="https://makeup-api.herokuapp.com/api/v1/products.json";

async function getBrands(){
    try{
        content.innerHTML=`<h2 class="header1">Brands</h2>`;        
        let data=await fetch(url);
        let data1=await data.json();        
        let arr=[];        
        data1.forEach(ele=>{
        arr.push(ele.brand);
        });
        let array=[...new Set(arr)].sort();
        array.forEach(ele=>{if(String(ele).indexOf("'")>0)
        {
            let name=ele.replace("'","%27");           
            content.innerHTML+=`<h2 class="brands" onclick="getData('${name}')">${ele}</h2><br>`;          
        } else{     
            content.innerHTML+=`<h2 class="brands" onclick="getData('${ele}')">${ele}</h2><br>`;}
        })  ;   
    }
    catch(error){
        content.innerHTML+=`<div class="catch">There is some problem in loading the brands...Please try again later<h2>`;
    }
}
getBrands();

async function getData(ele){     
    content.innerHTML=`<button id="btn" onclick="getBrands()">Back</button>`;
    try{              
        let data=await fetch(url+`?brand=${ele}`);
        let data1=await data.json();
        data1.forEach(element=>{
            content.innerHTML+=`            
            <div class="container">
            <h3>Brand :${element.brand}</h3>
            <h3>Name :${element.name}</h3>
            <h3>Price :${element.price}</h3>
            <h3>Image :${element.image_link}</h3>
            <img src="${element.image_link}" alt="image" width="100" heigth="100">
            <a href="${element.product_link}"target="_blank">${element.product_link}</a>
            
            <h3>Description :${element.description}</h3>
            </div>
            `;
        }
        )      
    }
    catch(error){     
    content.innerHTML+=`<div class="catch">Please try again later!!!<h2>`;
    }    
}

