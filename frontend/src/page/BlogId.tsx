import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function BlogId() {
    const { id } = useParams();
    interface dat{
      title:string,
      description:string,
      subject:string,
      users:{
        name:string,
        email:string
      }
    }
    const [state, setState] = useState<dat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
const navigate = useNavigate()
    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`https://backend.harshrai8800.workers.dev/api/v1/blog/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res && res.data.res) {
                  console.log(res.data.res)
                    setState(res.data.res);
                }
            } catch (err) {
                setError("Failed to fetch blog details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!state || state.length === 0) {
        return <div>No data found.</div>;
    }

    return (

      <>
     <div className="flex justify-between items-center border-b border-gray-300 px-6 py-6">
 
  <div className="text-gray-800 font-medium">Menu</div>

 
  <div onClick={()=>navigate("/post")} className="text-gray-800 p-2 rounded-full hover:bg-red-400 border-red-800 border-2 bg-red-500 font-medium">Get Started</div>
</div>

      <div className="grid grid-cols-4 gap-4 mt-32 max-w-6xl mx-auto">
      
      <div className="col-span-3 w-full p-6 bg-white shadow-md rounded-lg border border-gray-300">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{state[0]?.title || "Untitled"}</h2>
        <p className="text-xl font-semibold text-gray-500 mb-4">Subject: {state[0]?.subject || "No Subject"}</p>
        <p className="text-base font-medium text-gray-700 mb-6">Description: {state[0]?.description || "No description available"}</p>
        <div className="text-sm text-gray-500">
          <p>ID: {id || "N/A"}</p>
          <p>User Email: {state[0]?.users?.email || "No email provided"}</p>
        </div>
      </div>
    
      {/* Avatar Section */}
      <div className="col-span-1 flex flex-col shadow-lg border-gray-100 border-t-2 justify-center rounded-lg items-center space-y-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center dark:bg-gray-700">
          <span className="font-medium text-gray-200 dark:text-gray-300">
            {state[0]?.users?.name?.[0] || "H"}
          </span>
        </div>
        <p className="text-xl border-b-2 border-black font-medium text-gray-900 dark:text-gray-900">
          {state[0]?.users?.name || "Unknown User"}
        </p>
      </div>
    </div></>
      
    
    );
}

export default BlogId;
