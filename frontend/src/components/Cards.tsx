
interface data{
    name:string,
    description:string,
    title:string
}
function Cards({
name,
description,
title
}:data) {
  return (


  
    
        <div className="max-w-4xl mx-auto p-6 w-3/3 rounded-lg shadow-md ">
          <div className="flex items-center space-x-4 mb-4">
         
            <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {name?  name[0]:"h"}
              </span>
            </div>
           
            <div className="text-lg font-semibold text-black">
            {name?  name:"Author Id"}
            </div>
          </div>
    
          <div className="mb-4">
            <h1 className="text-2xl  font-bold  text-black ">
            {title?  title:"title"}
            </h1>
          </div>
    
        
          <div className="mb-4">
            <p className=" text-black leading-relaxed">
              
            {description?  description:"description"}
            </p>
          </div>
    
          {/* Reading Time */}
          <div className="text-sm text-gray-800 ">
            {description?Math.ceil(description.length/100):"1 "} minutes read
          </div>
        </div>
      );
    
    
    
  
}

export default Cards