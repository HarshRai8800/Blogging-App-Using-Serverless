import React from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function PostBlog() {
  const navigate = useNavigate();

  const { register,setValue, handleSubmit, watch } = useForm();

  const postBlog = async (data) => {
    try {
      console.log('Submitting blog data:', data);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://backend.harshrai8800.workers.dev/api/v1/blog',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.data.res.id){
      alert("blog posted successfully")
   
      }
      else{
        alert("blog failed to post")
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4">
        <div className="text-gray-800 font-medium text-lg">Menu</div>
        <div
          onClick={() => navigate('/blog')}
          className="text-white px-4 py-2 rounded-full hover:bg-red-600 border-red-800 border-2 bg-red-500 font-medium cursor-pointer"
        >
          Get Home
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(postBlog)}
        className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-md rounded-lg border border-gray-200 space-y-6"
      >
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your blog title"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 8,
                message: 'Title must be at least 8 characters long',
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
            Blog Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter the subject of your blog"
            {...register('subject', {
              required: 'Subject is required',
              minLength: {
                value: 8,
                message: 'Subject must be at least 8 characters long',
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Description (Rich Text Editor) */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
            Blog Content
          </label>
          <Editor
            apiKey="1dgjf9uj8juvm2c1137474gm50izxl3qwkvmio1xi347q8yk"
        //    {...register("description",{
        //     required:true
        //    })}
        onEditorChange={(content)=>setValue("description",content)}
            init={{
                
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table code help wordcount',
              ],
              toolbar:
                'undo redo | blocks | bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Post Blog
          </button>
        </div>
      </form>
    </>
  );
}

export default PostBlog;
