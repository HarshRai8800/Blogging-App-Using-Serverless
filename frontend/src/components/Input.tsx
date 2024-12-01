
interface data{
label:string,
placeholder:string,
func:Function,
type:string
id:number
feildName:string
}
function Input({label,placeholder,type,func,id,feildName}:data) {
    console.log(label)
  return (
    <div key={id} className="w-2/3 flex flex-col items-center justify-center">
    <label 
      className="block mb-2 text-lg capitalize font-medium text-center text-gray-900 dark:text-gray-400"
    >
      {label}
    </label>
    <input 
      type={type} 
      id="input_field" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                 focus:border-blue-500 block w-full p-4 dark:bg-slate-100 dark:border-gray-600 
                 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      placeholder={placeholder} 
      required 
      
      onChange={(e) => func((prev: any) => ({ ...prev, [feildName]: e.target.value }
        
      ))}
    />
  </div>
  )
}

export default Input