
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './page/Signup.tsx'
import    Blog from "./page/Blog.tsx"
import Signin from './page/Signin.tsx'
import BlogId from './page/BlogId.tsx'
import PostBlog from './page/PostBlog.tsx'
const route = createBrowserRouter([{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/",
  element:<Signin/>
}
,{
  path:"/blog",
  element:<Blog/>
},{
  path:"/blog/:id",
  element:<BlogId/>

},{
  path:"/post",
  element:<PostBlog/>
}
])



createRoot(document.getElementById('root')!).render(
  <RouterProvider router={route}>

  </RouterProvider>
    

)
